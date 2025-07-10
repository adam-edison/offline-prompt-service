import type { RootResponse } from './root.contract';

export class RootService {
  getWelcomeMessage(): RootResponse {
    return {
      message: 'Welcome to the Offline Prompt Service!'
    };
  }
}
