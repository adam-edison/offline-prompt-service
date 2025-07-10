import type { GenerateRequest, GenerateResponse } from './generate.contract';
import { OllamaService } from '@src/ai-models/ollama.service';
import fs from 'fs';
import path from 'path';

export class GenerateService {
  private readonly logsDir = path.join(process.cwd(), process.env.LOGS_DIR || 'logs');
  private readonly ollamaService: OllamaService;

  constructor() {
    // Ensure logs directory exists
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }

    this.ollamaService = new OllamaService();
  }

  async generateResponse(request: GenerateRequest): Promise<GenerateResponse> {
    let response: string;

    if (request.canned) {
      // Return canned response
      response = 'This is a canned response for testing purposes.';
    } else {
      // Use Ollama service to generate real response
      try {
        response = await this.ollamaService.generateResponse(request.prompt);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error generating response from Ollama:', error);
        // Fallback to canned response if Ollama fails
        response = 'This is a canned response for testing purposes.';
      }
    }

    // Log the interaction
    this.logInteraction(request.prompt, response);

    return {
      response
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
