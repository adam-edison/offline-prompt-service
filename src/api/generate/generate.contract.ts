import { z } from 'zod';
import { makeApi } from '@zodios/core';

const generateRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt must not be empty')
});

const generateResponseSchema = z.object({
  response: z.string()
});

const errorResponseSchema = z.object({
  error: z.string()
});

export const generateApi = makeApi([
  {
    method: 'post',
    path: '/generate',
    description: 'Generate static AI response for given prompt',
    summary: 'Generate static AI response for given prompt',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: generateRequestSchema
      }
    ],
    response: generateResponseSchema,
    errors: [
      {
        status: 400,
        description: 'Bad Request - Invalid or missing prompt',
        schema: errorResponseSchema
      }
    ]
  }
]);

export type GenerateRequest = z.infer<typeof generateRequestSchema>;
export type GenerateResponse = z.infer<typeof generateResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
