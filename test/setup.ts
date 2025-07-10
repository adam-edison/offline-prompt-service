// Test setup file - runs before all tests
// This ensures environment variables are properly configured for testing

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env') });
