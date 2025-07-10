import type { Request, Response } from 'express';
import { GenerateService } from './generate.service';
import type { GenerateRequest } from './generate.contract';

export class GenerateController {
  public generateService: GenerateService;

  constructor() {
    this.generateService = new GenerateService();
  }

  generate = (req: Request, res: Response) => {
    try {
      // Validate request body
      const body = req.body as Partial<GenerateRequest>;

      if (!body.prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (typeof body.prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt must be a string' });
      }

      if (body.prompt.trim().length === 0) {
        return res.status(400).json({ error: 'Prompt must not be empty' });
      }

      const response = this.generateService.generateResponse({ prompt: body.prompt });
      res.json(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in generate endpoint:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
