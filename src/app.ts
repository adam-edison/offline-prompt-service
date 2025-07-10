import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { zodiosApp } from '@zodios/express';
import { RootController } from '@src/api/root/root.controller';
import { GenerateController } from '@src/api/generate/generate.controller';
import { generateApi } from '@src/api/generate/generate.contract';
import { createOpenApiSpec } from '@src/openapi';

export function createApp() {
  const app = express();

  app.use(express.json());

  const rootController = new RootController();
  const generateController = new GenerateController();

  // Use manual routing for root endpoint
  app.get('/', rootController.getRoot);

  // Use Zodios for automatic validation
  const generateApp = zodiosApp(generateApi);
  generateApp.post('/generate', generateController.generate);
  app.use(generateApp);

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
