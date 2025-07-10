import express from 'express';
import { RootController } from '@src/api/root/root.controller';

export function createApp() {
  const app = express();

  app.use(express.json());

  const rootController = new RootController();

  app.get('/', rootController.getRoot);

  return app;
}
