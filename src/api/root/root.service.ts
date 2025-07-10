import type { RootResponse } from './root.contract';

export class RootService {
  getWelcomeMessage(): RootResponse {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline Prompt Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #007bff;
            padding-bottom: 0.5rem;
        }
        .api-link {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 0.75rem 1.5rem;
            text-decoration: none;
            border-radius: 5px;
            margin: 1rem 0;
            font-weight: bold;
        }
        .api-link:hover {
            background: #0056b3;
        }
        .info {
            background: #e9ecef;
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to the Offline Prompt Service</h1>
        
        <p>This is a backend Node.js service with AI prompting using offline local models.</p>
        
        <div class="info">
            <h3>🚀 Getting Started</h3>
            <p>Explore our API documentation for manual testing:</p>
            <a href="/api-docs" class="api-link">📖 API Documentation</a>
        </div>
        
        <div class="info">
            <h3>📖 More Information</h3>
            <p>Check the README for more details about setup, configuration, and usage.</p>
        </div>
    </div>
</body>
</html>
    `.trim();
  }
}
