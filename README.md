# Offline Prompt Service

A modern Node.js REST API template with TypeScript, automatic documentation, and comprehensive tooling setup.

## 🛠 Technology Choices & Architecture

### Core Stack
- **Node.js + TypeScript**: Chosen for rapid development, strong typing, and excellent ecosystem
- **Express.js**: Lightweight, battle-tested web framework with minimal overhead
- **Zodios**: Type-safe API contracts with automatic OpenAPI generation - eliminates manual documentation
- **Vitest**: Fast, modern testing framework with excellent TypeScript support

### Architecture Decisions
- **Contract-first API design**: Using Zodios for type-safe endpoints and automatic documentation
- **Layered architecture**: Controller → Service pattern for clean separation of concerns
- **OpenAPI integration**: Auto-generated documentation at `/api-docs` with custom content-type handling
- **Path aliases**: TypeScript path mapping for clean imports (`@src/`)

### Development Tooling
- **ESLint + Prettier**: Code quality and consistent formatting
- **TypeScript strict mode**: Maximum type safety
- **ts-node**: Direct TypeScript execution for development
- **tsc-alias**: Resolves TypeScript path aliases in compiled output

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Server starts at `http://localhost:3000`

### Testing & Quality
```bash
# Run all tests
npm test

# Manual API testing
# Visit http://localhost:3000/api-docs for interactive documentation

# Code quality
npm run lint
npm run format

# Production build
npm run build && npm start
```

## 📚 API Documentation

Once running, visit:
- **Homepage**: `http://localhost:3000` - Service overview with links
- **API Docs**: `http://localhost:3000/api-docs` - Interactive Swagger UI
- **OpenAPI Spec**: `http://localhost:3000/api-docs/openapi.json` - Raw specification

## 🧪 Testing

The project includes comprehensive testing setup:
- Unit tests for services and controllers
- API contract validation
- Documentation generation tests

Run with: `npm test`

## 📁 Project Structure

```
src/
├── api/                  # API modules organized by feature
│   └── root/            # Homepage/health check endpoint
│       ├── root.contract.ts    # Zodios API contract
│       ├── root.controller.ts  # Request handlers
│       └── root.service.ts     # Business logic
├── app.ts               # Express app configuration
├── openapi.ts           # OpenAPI spec generation
└── index.ts             # Server entry point
test/                    # Test files mirroring src structure
tsconfig.json           # TypeScript configuration
vitest.config.ts        # Test configuration
```

## 🔧 Available Scripts

See `package.json` for complete list. Key commands:
- `npm run dev` - Development server with TypeScript
- `npm test` - Run test suite
- `npm run build` - Production build
- `npm start` - Run production build
- `npm run lint` - Code linting
- `npm run format` - Code formatting

## 🧪 Testing Strategy

The project uses Vitest for testing with:
- Unit tests for services and controllers
- API contract validation
- Type-safe test utilities

## 🎯 Template Features

✅ **What's Included**:
- REST API foundation with Express + TypeScript
- Type-safe contracts with automatic documentation
- Clean, modular architecture
- Comprehensive testing setup
- Interactive API documentation
- Development tooling (linting, formatting, building)
- Path aliases for clean imports

## 🚀 Getting Started with This Template

1. Clone or fork this repository
2. Update `package.json` with your project details
3. Modify the root endpoint in `src/api/root/` or create new API modules
4. Add your business logic in the service layer
5. Write tests in the `test/` directory
6. Build and deploy

This template provides a solid foundation for building modern, type-safe REST APIs with excellent developer experience.
