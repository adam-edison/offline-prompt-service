export interface OllamaResponse {
  response: string;
  model?: string;
  created_at?: string;
  done?: boolean;
}

export interface OllamaRequest {
  model: string;
  prompt: string;
  stream?: boolean;
}

export class OllamaService {
  private readonly baseUrl: string;
  private readonly defaultModel: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || '';
    this.defaultModel = process.env.OLLAMA_MODEL || '';

    if (!this.baseUrl) {
      throw new Error('OLLAMA_BASE_URL environment variable is required');
    }

    if (!this.defaultModel) {
      throw new Error('OLLAMA_MODEL environment variable is required');
    }
  }

  async generateResponse(prompt: string, model?: string): Promise<string> {
    const requestBody: OllamaRequest = {
      model: model || this.defaultModel,
      prompt,
      stream: false
    };

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as OllamaResponse;

      if (!data.response) {
        throw new Error('No response received from Ollama');
      }

      return data.response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate response from Ollama: ${error.message}`);
      }
      throw new Error('Failed to generate response from Ollama: Unknown error');
    }
  }
}
