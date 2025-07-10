import type { Request, Response } from 'express';
import { GenerateService } from './generate.service';
import type { GenerateRequest } from './generate.contract';

export class GenerateController {
  public generateService: GenerateService;

  constructor() {
    this.generateService = new GenerateService();
  }

  generate = async (req: Request, res: Response) => {
    try {
      // req.body is already validated by Zodios middleware
      const validatedBody = req.body as GenerateRequest;
      const response = await this.generateService.generateResponse(validatedBody);
      res.json(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in generate endpoint:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
