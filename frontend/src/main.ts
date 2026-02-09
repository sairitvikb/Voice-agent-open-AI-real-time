import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button">Let's Talk</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

export async function realtimeVoice(element: HTMLButtonElement) {
  // ....
  // for quickly start, you can append the following code to the auto-generated TS code

  const agent = new RealtimeAgent({
    name: 'Assistant',
    instructions: `You are a helpful assistant that ONLY answers questions related to Indian tourism.
      If the question is NOT about Indian tourism, reply with exactly: "I can not reply to this question" and do not say anything else.`,
  });
  const session = new RealtimeSession(agent);
  // Automatically connects your microphone and audio output in the browser via WebRTC.
  try {
    await session.connect({
      // To get this ephemeral key string, you can run the following command or implement the equivalent on the server side:
      // curl -s -X POST https://api.openai.com/v1/realtime/client_secrets -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" -d '{"session": {"type": "realtime", "model": "gpt-realtime"}}' | jq .value
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });
    console.log('You are connected!');
  } catch (e) {
    console.error(e);
  }
}
realtimeVoice(document.querySelector<HTMLButtonElement>('#counter')!)
