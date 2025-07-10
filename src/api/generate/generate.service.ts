import type { GenerateRequest, GenerateResponse } from './generate.contract';
import fs from 'fs';
import path from 'path';

export class GenerateService {
  private readonly logsDir = path.join(process.cwd(), process.env.LOGS_DIR || 'logs');

  constructor() {
    // Ensure logs directory exists
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  generateResponse(request: GenerateRequest): GenerateResponse {
    const staticResponse =
      'This is a static response from the offline prompt service. The request was processed successfully, but this is a canned response for testing purposes.';

    // Log the interaction
    this.logInteraction(request.prompt, staticResponse);

    return {
      response: staticResponse
    };
  }

  private getLogFile(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');

    const filename = `log-${year}-${month}-${day}-${hour}.jsonl`;
    return path.join(this.logsDir, filename);
  }

  private logInteraction(input: string, output: string): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      input,
      output
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    const logFile = this.getLogFile();
    fs.appendFileSync(logFile, logLine);
  }
}
