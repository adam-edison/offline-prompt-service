import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';

describe('API Docs Endpoint', () => {
  it('should return HTML with swagger documentation', async () => {
    const response = await request(app).get('/api-docs/').expect(200);

    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('swagger');
  });

  it('should serve swagger UI elements', async () => {
    const response = await request(app).get('/api-docs/').expect(200);

    // The swagger UI should contain the necessary elements
    expect(response.text).toContain('swagger-ui');
    expect(response.text).toContain('Swagger UI');
  });

  it('should serve OpenAPI spec with health endpoint documentation', async () => {
    const response = await request(app).get('/api-docs/openapi.json').expect(200);

    expect(response.headers['content-type']).toContain('application/json');

    expect(response.body).toMatchObject({
      info: expect.any(Object),
      paths: {
        '/': {
          get: expect.objectContaining({
            summary: 'Health check endpoint'
          })
        }
      }
    });

    // Check that tags are properly set
    expect(response.body.paths['/'].get).toHaveProperty('tags', ['health']);

    // Check that the tags are defined in the spec
    expect(response.body).toHaveProperty('tags');
    expect(response.body.tags).toContainEqual({
      name: 'health',
      description: 'Health check operations'
    });
  });
});
