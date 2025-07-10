import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { openApiBuilder } from '@zodios/openapi';
import { RootController } from '@src/api/root/root.controller';
import { rootApi } from '@src/api/root/root.contract';

export function createApp() {
  const app = express();

  app.use(express.json());

  const rootController = new RootController();

  app.get('/', rootController.getRoot);

  // Generate OpenAPI spec from zodios contracts
  const openApiSpec = openApiBuilder({
    title: 'Offline Prompt Service API',
    version: '1.0.0',
    description: 'Backend node.js service with AI prompting using offline local model'
  })
    .addPublicApi(rootApi)
    .setCustomTagsFn((path) => {
      // Custom tag mapping for all paths
      const tagMap: Record<string, string[]> = {
        '/': ['health']
      };
      return tagMap[path] || [];
    })
    .build();

  // Add tag definitions to the spec
  openApiSpec.tags = [
    {
      name: 'health',
      description: 'Health check operations'
    }
  ];

  // Serve OpenAPI spec as JSON (must be before the swagger-ui middleware)
  app.get('/api-docs/openapi.json', (_req, res) => {
    res.json(openApiSpec);
  });

  // Serve API documentation at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

  return app;
}

export const app = createApp();
