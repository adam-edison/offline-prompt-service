import { z } from 'zod';
import { makeApi } from '@zodios/core';

const rootResponseSchema = z.object({
  message: z.string()
});

export const rootApi = makeApi([
  {
    method: 'get',
    path: '/',
    response: rootResponseSchema
  }
]);

export type RootResponse = z.infer<typeof rootResponseSchema>;
