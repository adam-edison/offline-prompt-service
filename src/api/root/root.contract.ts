import { z } from 'zod';
import { makeApi } from '@zodios/core';

const rootResponseSchema = z.object({
  message: z.string()
});

export const rootApi = makeApi([
  {
    method: 'get',
    path: '/',
    description: 'Health check endpoint',
    summary: 'Get service health status',
    response: rootResponseSchema
  }
]);

export type RootResponse = z.infer<typeof rootResponseSchema>;
