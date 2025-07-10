import request from 'supertest';
import { createApp } from '@src/app';
import { describe, expect, test } from 'vitest';

describe('root endpoint /', () => {
  test('GET / returns HTML with service info and links', async () => {
    const app = createApp();
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/html');

    // Check for welcome message
    expect(res.text).toContain('Welcome to the Offline Prompt Service');

    // Check for API docs link
    expect(res.text).toContain('/api-docs');
    expect(res.text).toContain('API Documentation');

    // Check for manual testing mention
    expect(res.text).toContain('manual testing');

    // Check for README reference
    expect(res.text).toContain('README');
    expect(res.text).toContain('more details');
  });
});
