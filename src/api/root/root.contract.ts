import { z } from 'zod';
import { makeApi } from '@zodios/core';

const rootResponseSchema = z.string();

export const rootApi = makeApi([
  {
    method: 'get',
    path: '/',
    description: 'Service homepage with links to documentation',
    summary: 'Service homepage with links to documentation',
    response: rootResponseSchema
  }
]);

export type RootResponse = z.infer<typeof rootResponseSchema>;
