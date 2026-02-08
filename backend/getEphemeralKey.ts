import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ENV_PATH = path.resolve(__dirname, '../../frontend/.env');

async function getEphemeralKey() {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not found in environment');
  }
  const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session: {
        type: 'realtime',
        model: 'gpt-realtime',
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ephemeral key: ${response.statusText}`);
  }
  const data = await response.json() as { value: string };
  return data.value;
}

async function updateEnvFile(ephemeralKey: string) {
  let envContent = '';
  if (fs.existsSync(ENV_PATH)) {
    envContent = fs.readFileSync(ENV_PATH, 'utf-8');
    envContent = envContent.replace(/VITE_OPENAI_API_KEY=.*/g, '');
    envContent = envContent.trim() + '\n';
  }
  envContent += `VITE_OPENAI_API_KEY=${ephemeralKey}\n`;
  fs.writeFileSync(ENV_PATH, envContent, 'utf-8');
}

(async () => {
  try {
    const ephemeralKey = await getEphemeralKey();
    await updateEnvFile(ephemeralKey);
  console.log('Ephemeral key updated in frontend/.env');
  } catch (err) {
    console.error('Error updating ephemeral key:', err);
  }
})();
