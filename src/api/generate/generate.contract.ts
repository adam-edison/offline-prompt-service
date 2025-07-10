import { z } from 'zod';
import { makeApi } from '@zodios/core';

const generateRequestSchema = z.object({
  prompt: z
    .string({
      required_error: 'Prompt is required',
      invalid_type_error: 'Prompt must be a string'
    })
    .trim()
    .min(1, 'Prompt must not be empty'),
  canned: z
    .boolean({
      invalid_type_error: 'Canned must be a boolean'
    })
    .optional()
    .default(false)
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
    description: 'Generate AI response for given prompt (canned or from Ollama)',
    summary: 'Generate AI response for given prompt (canned or from Ollama)',
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

// Export schemas for use in controllers
export { generateRequestSchema, generateResponseSchema, errorResponseSchema };

export type GenerateRequest = z.infer<typeof generateRequestSchema>;
export type GenerateResponse = z.infer<typeof generateResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
