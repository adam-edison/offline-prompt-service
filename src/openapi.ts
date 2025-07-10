import { openApiBuilder } from '@zodios/openapi';
import { rootApi } from '@src/api/root/root.contract';

export function createOpenApiSpec() {
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

  // Fix content type for root endpoint - it returns HTML, not JSON
  if (openApiSpec.paths?.['/']?.get?.responses?.['200']) {
    const response = openApiSpec.paths['/'].get.responses['200'];
    if ('content' in response) {
      response.content = {
        'text/html': {
          schema: { type: 'string' }
        }
      };
    }
  }

  // Add tag definitions to the spec
  openApiSpec.tags = [
    {
      name: 'health',
      description: 'Health check operations'
    }
  ];

  return openApiSpec;
}
