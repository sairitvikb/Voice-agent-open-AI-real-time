 Voice-Agent-OpenAI-Realtime

This project implements a seamless audio chat functionality on a web page using the OpenAI Realtime API. Users can interact with an OpenAI-powered bot by pressing a button to start the chat and continue the conversation without needing to press any buttons for follow-up questions.


## Features

- Real-time audio chat with OpenAI's bot.
- Users can ask questions about Indian tourism.
- The bot only responds to questions about Indian tourism. For other topics, it replies:  
  **"I can not reply to this question"**
- Seamless follow-up: users can ask the next question without pressing any buttons.
  ## Setup Instructions

1. **Create `.env` files**  
   Add your `OPENAI_API_KEY` to `.env` files in both the backend and frontend directories.

2. **Install dependencies**  
   Run the following in both backend and frontend directories:
   ```bash
   npm i
   ```

3. **Start the backend**  
   Run the following in the backend directory to generate a new ephemeral key for the Realtime API:
   ```bash
   npm run dev
   ```

4. **Start the frontend**  
   In the frontend directory, run:
   ```bash
   npm run dev
   ```
   Then open the application in your browser.
   ## Usage

- Press the button on the web page to start chatting.
- Ask questions related to Indian tourism.
- For unrelated questions, the bot will respond with a generic message.

---
