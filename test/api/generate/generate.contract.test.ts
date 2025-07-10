import request, { Response } from 'supertest';
import { createApp } from '@src/app';
import { describe, expect, test } from 'vitest';

// Helper to check Zodios validation error format
const expectValidationError = (response: Response, expectedMessage: string) => {
  expect(response.body).toHaveProperty('error');
  expect(Array.isArray(response.body.error)).toBe(true);
  expect(response.body.error[0]).toHaveProperty('message', expectedMessage);
};

describe('POST /generate - Validation Tests', () => {
  test('should return 400 for completely missing body', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').expect(400);

    expectValidationError(response, 'Prompt is required');
  });

  test('should return 400 for empty object body', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({}).expect(400);

    expectValidationError(response, 'Prompt is required');
  });

  test('should return 400 for null prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: null }).expect(400);

    expectValidationError(response, 'Prompt must be a string');
  });

  test('should return 400 for undefined prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: undefined }).expect(400);

    expectValidationError(response, 'Prompt is required');
  });

  test('should return 400 for number prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 123 }).expect(400);

    expectValidationError(response, 'Prompt must be a string');
  });

  test('should return 400 for boolean prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: true }).expect(400);

    expectValidationError(response, 'Prompt must be a string');
  });

  test('should return 400 for array prompt', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/generate')
      .send({ prompt: ['hello'] })
      .expect(400);

    expectValidationError(response, 'Prompt must be a string');
  });

  test('should return 400 for object prompt', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/generate')
      .send({ prompt: { text: 'hello' } })
      .expect(400);

    expectValidationError(response, 'Prompt must be a string');
  });

  test('should return 400 for empty string prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: '' }).expect(400);

    expectValidationError(response, 'Prompt must not be empty');
  });

  test('should return 400 for whitespace-only prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: '   ' }).expect(400);

    expectValidationError(response, 'Prompt must not be empty');
  });

  test('should return 400 for tab-only prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: '\t\t' }).expect(400);

    expectValidationError(response, 'Prompt must not be empty');
  });

  test('should return 400 for newline-only prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: '\n\n' }).expect(400);

    expectValidationError(response, 'Prompt must not be empty');
  });

  test('should return 400 for mixed whitespace prompt', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: ' \t\n ' }).expect(400);

    expectValidationError(response, 'Prompt must not be empty');
  });

  test('should return 400 for string canned value', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 'test', canned: 'true' }).expect(400);

    expectValidationError(response, 'Canned must be a boolean');
  });

  test('should return 400 for number canned value', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 'test', canned: 1 }).expect(400);

    expectValidationError(response, 'Canned must be a boolean');
  });

  test('should return 400 for null canned value', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 'test', canned: null }).expect(400);

    expectValidationError(response, 'Canned must be a boolean');
  });

  test('should return 400 for array canned value', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 'test', canned: [] }).expect(400);

    expectValidationError(response, 'Canned must be a boolean');
  });

  test('should return 400 for object canned value', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/generate')
      .send({ prompt: 'test', canned: { value: true } })
      .expect(400);

    expectValidationError(response, 'Canned must be a boolean');
  });

  test('should accept valid prompt with canned: true', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 'test prompt', canned: true }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  });

  test('should accept valid prompt with canned: false', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 'test prompt', canned: false }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  }, 10000);

  test('should accept valid prompt without canned property', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: 'test prompt' }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  }, 10000);

  test('should accept prompt with leading/trailing whitespace (gets trimmed)', async () => {
    const app = createApp();

    const response = await request(app).post('/generate').send({ prompt: '  valid prompt  ' }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  }, 10000);

  test('should handle very long prompt', async () => {
    const app = createApp();
    const longPrompt = 'a'.repeat(10000);

    const response = await request(app).post('/generate').send({ prompt: longPrompt, canned: true }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  });

  test('should handle special characters in prompt', async () => {
    const app = createApp();
    const specialPrompt = '!@#$%^&*(){}[]|\\:";\'<>?,./ 中文 русский 🎉';

    const response = await request(app).post('/generate').send({ prompt: specialPrompt, canned: true }).expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  });

  test('should ignore extra properties in request body', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/generate')
      .send({
        prompt: 'test prompt',
        canned: true,
        extraProperty: 'should be ignored',
        anotherExtra: 123
      })
      .expect(200);

    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  });
});
