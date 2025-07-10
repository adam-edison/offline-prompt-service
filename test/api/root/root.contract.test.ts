import request from 'supertest';
import { createApp } from '@src/app';
import { describe, expect, test } from 'vitest';

describe('root endpoint /', () => {
  test('GET / returns 200', async () => {
    const app = createApp();
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Welcome to the Offline Prompt Service!' });
  });
});
