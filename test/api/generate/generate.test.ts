import request from 'supertest';
import { createApp } from '@src/app';
import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('POST /generate', () => {
  const logsDir = path.join(process.cwd(), 'logs');

  const getLogFile = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');

    const filename = `log-${year}-${month}-${day}-${hour}.jsonl`;
    return path.join(logsDir, filename);
  };

  beforeEach(() => {
    // Clean up logs before each test
    if (fs.existsSync(logsDir)) {
      const files = fs.readdirSync(logsDir);
      files.forEach((file) => {
        if (file.endsWith('.jsonl')) {
          fs.unlinkSync(path.join(logsDir, file));
        }
      });
    }
  });

  afterEach(() => {
    // Clean up logs after each test
    if (fs.existsSync(logsDir)) {
      const files = fs.readdirSync(logsDir);
      files.forEach((file) => {
        if (file.endsWith('.jsonl')) {
          fs.unlinkSync(path.join(logsDir, file));
        }
      });
    }
  });

  test('should accept valid prompt and return response', async () => {
    const app = createApp();
    const prompt = 'What is the capital of France?';

    const response = await request(app).post('/generate').send({ prompt }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
    expect(response.body.response.length).toBeGreaterThan(0);
  });

  test('should return 400 for missing prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({}).expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 for empty prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: '' }).expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 for non-string prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 123 }).expect(400);

    expect(response.body).toHaveProperty('error');
  });

  test('should log interaction to jsonl file', async () => {
    const app = createApp();
    const prompt = 'Test prompt for logging';

    await request(app).post('/generate').send({ prompt, canned: true }).expect(200);

    // Check that logs directory exists
    expect(fs.existsSync(logsDir)).toBe(true);

    // Get current hour's log file
    const logFile = getLogFile();
    expect(fs.existsSync(logFile)).toBe(true);

    // Read and verify log content
    const logContent = fs.readFileSync(logFile, 'utf-8');
    const logLines = logContent.trim().split('\n');
    expect(logLines.length).toBe(1);

    const logEntry = JSON.parse(logLines[0]);
    expect(logEntry).toHaveProperty('timestamp');
    expect(logEntry).toHaveProperty('input');
    expect(logEntry).toHaveProperty('output');
    expect(logEntry.input).toBe(prompt);
    expect(typeof logEntry.output).toBe('string');
    expect(typeof logEntry.timestamp).toBe('string');

    // Verify timestamp is valid ISO date
    expect(new Date(logEntry.timestamp).toISOString()).toBe(logEntry.timestamp);
  });

  test('should use static response for generation', async () => {
    const app = createApp();
    const prompt = 'Say hello in one word';

    const response = await request(app).post('/generate').send({ prompt, canned: true }).expect(200);

    // The response should be a static string
    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');

    // Response should not be empty and should be reasonable length
    expect(response.body.response.trim().length).toBeGreaterThan(0);
    expect(response.body.response.length).toBeLessThan(1000); // Reasonable upper bound
  });

  test('should handle multiple concurrent requests', async () => {
    const app = createApp();
    const prompts = ['What is 2+2?', 'Name a color', 'Say yes or no'];

    const promises = prompts.map((prompt) => request(app).post('/generate').send({ prompt, canned: true }).expect(200));

    const responses = await Promise.all(promises);

    // All responses should have valid structure
    responses.forEach((response) => {
      expect(response.body).toHaveProperty('response');
      expect(typeof response.body.response).toBe('string');
      expect(response.body.response.length).toBeGreaterThan(0);
    });

    // Check that all interactions were logged to current hour's file
    const logFile = getLogFile();
    const logContent = fs.readFileSync(logFile, 'utf-8');
    const logLines = logContent.trim().split('\n');
    expect(logLines.length).toBe(3);
  });

  test('should return canned response when canned is true', async () => {
    const app = createApp();
    const prompt = 'What is the capital of France?';

    const response = await request(app).post('/generate').send({ prompt, canned: true }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
    expect(response.body.response.length).toBeGreaterThan(0);

    // Should be a predictable canned response
    expect(response.body.response).toBe('This is a canned response for testing purposes.');
  });

  test('should use real Ollama model when canned is false', async () => {
    const app = createApp();
    const prompt = 'Say hi';

    const response = await request(app).post('/generate').send({ prompt, canned: false }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
    expect(response.body.response.length).toBeGreaterThan(0);

    // Should not be the canned response (real Ollama response)
    expect(response.body.response).not.toBe('This is a canned response for testing purposes.');

    // Should be a real response from Ollama (likely contains greeting)
    expect(response.body.response.toLowerCase()).toMatch(/hi|hello|greetings|assist/);
  }, 15000);

  test('should default to real Ollama model when canned is not provided', async () => {
    const app = createApp();
    const prompt = 'Say hi';

    const response = await request(app).post('/generate').send({ prompt }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
    expect(response.body.response.length).toBeGreaterThan(0);

    // Should not be the canned response (defaults to false, uses real Ollama)
    expect(response.body.response).not.toBe('This is a canned response for testing purposes.');

    // Should be a real response from Ollama
    expect(response.body.response.toLowerCase()).toMatch(/hi|hello|greetings|assist/);
  }, 15000);
});
