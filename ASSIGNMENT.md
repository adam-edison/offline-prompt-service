# ModelVault Take-Home Project: “MiniVault API”

### 🧠 Project Overview

Build a lightweight local REST API that simulates a core feature of ModelVault’s product: receiving a prompt and returning a generated response.

You can return either:

- A **stubbed** (hardcoded or dummy) response
- Or (optional bonus) a real response from a **local LLM** using tools like Hugging Face Transformers or Ollama

<aside>
💡

This task is offline — no cloud APIs allowed (e.g., no OpenAI, no Anthropic).

</aside>

---

### ✅ Goals

Your API should support:

markup
POST /generate

**Input:**

json
{ "prompt": "..." }

**Output:**

json
{ "response": "..." }

And additionally:

- Log all input/output interactions to a local file: logs/log.jsonl
- Include a clear and concise README.md with:
  - Setup instructions
  - (Optional) Notes on your implementation or tradeoffs

---

### 🔧 Tech Guidelines

- **Languages**: Python, Node.js, Go preferred (but others OK)
- **Frameworks**: FastAPI, Flask, Express, etc.
- **No cloud-based LLMs**
- **File logging required**

**Optional Bonus Features (for extra signal):**

- Stream output token-by-token
- Use a local model via Hugging Face or Ollama
- Add a CLI or Postman collection to make testing easier

---

### 🗂️ Suggested Project Structure

bash
minivault-api/
├── app.py / main.js # API code
├── logs/log.jsonl # Logs of prompt/response
├── requirements.txt / package.json
└── README.md

---

### 🧪 What We’re Looking For

- ✅ A working, minimal local REST API
- 🧼 Clean, modular, well-structured code
- 📚 Clear README and setup instructions
- 🧠 Thoughtful tradeoffs or ideas for improvements
- ⚙️ Bonus points for streaming/model integration/testing tools

---

### ⏳ Time Expectation

- **Expected:** ~1 hour (stubbed version)
- **Max:** 2 hours (with optional bonuses)

---

### 📤 How to Submit

Please send us either:

- A GitHub repo link, **or**
- A zipped folder containing your project

Include a README.md with:

- Setup steps
- (Optional) 1–2 lines on design choices, tradeoffs, or future improvements

---

### 🙌 Thanks!

We really appreciate the time and thought you put into this.

Looking forward to seeing what you build!
