import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { RootController } from '@src/api/root/root.controller';
import { createOpenApiSpec } from '@src/openapi';

export function createApp() {
  const app = express();

  app.use(express.json());

  const rootController = new RootController();

  app.get('/', rootController.getRoot);

  const openApiSpec = createOpenApiSpec();

  // Serve OpenAPI spec as JSON (must be before the swagger-ui middleware)
  app.get('/api-docs/openapi.json', (_req, res) => {
    res.json(openApiSpec);
  });

  // Serve API documentation at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

  return app;
}

export const app = createApp();
