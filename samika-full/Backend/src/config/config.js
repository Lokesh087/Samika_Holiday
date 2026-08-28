import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root and backend/src
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

// Validate environment variables
const missingVars = requiredEnvVars.filter(varName => !process.env[varName] || process.env[varName].trim() === '');

if (missingVars.length > 0) {
  console.error(`\n❌ [ENVIRONMENT ERROR]: Missing required environment variable(s): ${missingVars.join(', ')}`);
  console.error(`Please ensure all required variables are set in your .env file.\n`);
  throw new Error(`[ENV VALIDATION FAILED]: Missing required environment variable(s): ${missingVars.join(', ')}`);
}

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;
