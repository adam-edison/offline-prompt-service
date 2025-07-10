import type { Request, Response } from 'express';
import { RootService } from './root.service';

export class RootController {
  public rootService: RootService;

  constructor() {
    this.rootService = new RootService();
  }

  getRoot = (_req: Request, res: Response) => {
    const response = this.rootService.getWelcomeMessage();
    res.json(response);
  };
}
