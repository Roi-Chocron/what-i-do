# Repository Review Report

**Scope:** `/home/roi/data_storage/WhatIDo/.review-temp`  
**Date:** 2026-10-29  
**Repositories reviewed:** 18 non-empty repositories  
**Method:** Readable source, configuration, documentation, manifests, SQL, and text data were inspected. Secrets, `.env` files, private keys, credentials, binaries, lockfiles, `node_modules`, generated build output, caches, screenshots, and large media assets were excluded. No files were modified.

## Inventory summary

| Repository | Reviewable text files | LOC |
|---|---:|---:|
| CRM | 24 | 6,533 |
| Gemini-Gui-Agent | 14 | 468 |
| GemmaAgent | 19 | 1,733 |
| Karu-AI | 17 | 3,331 |
| LiveEdits | 25 | 3,538 |
| SalesAI | 2 | 18 |
| Siri2 | 18 | 2,618 |
| agent-foundry | 101 | 8,252 |
| backupmywebsite | 11 | 6,875 |
| booking | 25 | 3,090 |
| cigarete | 17 | 1,813 |
| haredisurvey | 15 | 6,539 |
| localaiagent | 146 | 14,043 |
| minharez-sw | 2 | 43 |
| orchestrator | 23 | 1,102 |
| roi-courses | 97 | 12,931 |
| siri | 6 | 1,729 |
| site-spotlight-48e04e4d | 77 | 6,411 |
| **Total** | **640** | **71,028** |

The repositories also contain excluded lockfiles, generated directories, binaries, databases, archives, media, and/or dependency directories. Those are noted where relevant but were not read.

---

## 1. CRM

**Purpose — fact:** A CRM application with dashboard, clients, calendar, Kanban, login, settings, and layout components.

**Architecture and entry points — fact:** Monorepo structure with `client/` and `server/`. The client is a Vite React application entered through `client/src/main.jsx` and `App.jsx`. The server starts at `server/server.js` and uses `server/database.js`.

**Data and integrations — fact:** The server contains database access code; the exact production database contract is not fully documented. A root `wrangler.toml` indicates Cloudflare deployment intent. Client configuration is separated into `client/src/config.js`.

**Commands — fact:** Root scripts provide separate dependency installation and development commands for client and server, plus a combined development command. Client uses Vite; server has its own package scripts.

**Stage — fact/inference:** The source is a substantial working prototype: 6,533 reviewable LOC and multiple implemented screens. **Inference:** likely development/MVP rather than production-ready, because deployment, authentication, and database operations are not comprehensively documented.

**Gaps — fact:** No clear README-level product specification, deployment procedure, schema documentation, or verified production configuration. The server/client boundary and authentication model require clarification.

**Technologies:** React, Vite, JSX, JavaScript, Node.js, database code, Cloudflare/Wrangler configuration.

---

## 2. Gemini-Gui-Agent

**Purpose — fact:** Autonomous GUI agent that uses Gemini to interpret tasks, inspect the screen, and control mouse/keyboard input.

**Architecture and entry points — fact:** `main.py` is the primary entry point. Components are divided into `llm_communication`, `screen_understanding`, `computer_control`, `agent_management`, and `user_interface`. `ARCHITECTURE.md` documents the intended separation.

**Data and integrations — fact:** Gemini API, PyAutoGUI-style computer control, Pillow/screenshot processing, and Rich terminal output. Configuration is expected through environment variables.

**Commands — fact:** `requirements.txt` defines Python dependencies. The documentation indicates running `python main.py`; no packaging or installer is present.

**Stage — fact/inference:** Early functional prototype. The repository has a clear component plan but only 349 Python LOC. **Inference:** intended OODA/agent-management roadmap is not fully implemented.

**Gaps — fact:** Limited automated tests, no robust permission/sandbox model, no documented recovery policy for unsafe GUI actions, and no production packaging.

**Technologies:** Python, Gemini API, PyAutoGUI, Pillow, Rich.

---

## 3. GemmaAgent

**Purpose — fact:** Desktop GUI and web/API tooling for managing local Gemma models through Ollama, with optional Google Gemini support.

**Architecture and entry points — fact:** Python modules include `gemma_manager.py`, `agent_engine.py`, `agent_tools.py`, `agent_api_server.py`, `voice_manager.py`, GUI code, and database code. The repository also contains dashboard HTML and extensive design/roadmap documents.

**Data and integrations — fact:** Ollama local model discovery, model download and chat APIs, Google AI Studio/Gemini model discovery, FastAPI/WebSocket API, and local SQLite persistence for memory/history/error solutions. The GUI is desktop-oriented.

**Commands — fact:** Documentation requires Ollama to be installed and running. Python dependencies are defined in the project files; the repository does not present a single polished install/build command. The API server and GUI are separate execution paths.

**Stage — fact/inference:** Active development prototype with multiple implemented paths. **Inference:** feature breadth exceeds integration maturity; GUI, API, voice, database, and model-routing behavior need end-to-end verification.

**Gaps — fact:** Installation and startup instructions are fragmented; model names and API behavior may be version-sensitive; deployment/security of the remote API is not clearly specified; tests are limited.

**Technologies:** Python, PyQt/PySide-style GUI code, Ollama, Gemma, Gemini, FastAPI, WebSockets, SQLite, HTML/JavaScript.

**Excluded content:** Generated `build`/`dist` output and binaries were not reviewed.

---

## 4. Karu-AI

**Purpose — fact:** AI-powered Instagram carousel generation platform.

**Architecture and entry points — fact:** JavaScript application with serverless and standalone paths. Source includes Hono/Cloudflare Worker-oriented code, Express/Docker-oriented code, frontend/public assets, SQL migrations, and API routes.

**Data and integrations — fact:** Cloudflare Workers, D1, KV, Workers AI, Llama/FLUX/SDXL-related generation paths, JWT/authentication, Meta/Instagram-related configuration, Polar/payment-related configuration, Playwright, Docker, and Express.

**Commands — fact:** `package.json` provides JavaScript development/build/deployment scripts. Documentation includes a Cloud deployment guide. Wrangler and Docker are both represented in configuration.

**Stage — fact/inference:** Advanced prototype / deployment-ready candidate. **Inference:** it is not yet a single production system because two deployment architectures coexist and configuration choices remain unresolved.

**Gaps — fact:** Need to select and maintain one deployment route, verify migrations, configure secrets, test image-generation quotas, complete authentication/payment configuration, and document operational limits.

**Technologies:** JavaScript, Hono, Cloudflare Workers, D1, KV, Workers AI, Express, Playwright, Docker, SQL.

---

## 5. LiveEdits

**Purpose — fact:** Video clipping and publishing workflow for streamers, involving OBS, Stream Deck, remote editing, compression, and YouTube upload.

**Architecture and entry points — fact:** Contains streamer-side Python code, a Cloudflare Worker/server path, HTML/JavaScript interfaces, upload routes, database helpers, and a `filemap.xml` describing intended modules. Key files include `server.py`, `obs_controller.py`, `database.py`, and streamer client files.

**Data and integrations — fact:** OBS WebSocket, Socket.IO-style communication, YouTube API/uploading, Cloudflare Worker deployment, local recordings/logs, and browser/client interfaces.

**Commands — fact:** Python dependencies are listed in `requirements.txt`; Cloudflare setup documentation and Wrangler configuration exist. The repository includes separate streamer and worker components rather than one command that starts the whole system.

**Stage — fact/inference:** Architecture/prototype stage. **Inference:** implementation and the intended file map are not fully synchronized; the system is not demonstrably production-ready.

**Gaps — fact:** Need a defined MVP, tested end-to-end upload flow, authentication/authorization, durable storage design, deployment instructions, and removal or isolation of prototype artifacts.

**Technologies:** Python, JavaScript, HTML, React-related client code, Socket.IO, OBS WebSocket, YouTube API, Cloudflare Workers.

**Excluded content:** A compiled object file and a ZIP archive were not opened.

---

## 6. SalesAI

**Purpose — fact:** Dataset preparation for model training.

**Architecture and entry points — fact:** `load_dataset.py` is the only implementation file. It streams FineWeb-Edu data, limits the number of examples, extracts text, and writes JSONL.

**Data and integrations — fact:** Hugging Face Datasets and the `HuggingFaceFW/fineweb-edu` dataset. Output is a local JSONL dataset.

**Commands — fact:** Run the Python script after installing the Hugging Face dependency. No formal requirements file, training command, evaluation command, or packaging is present.

**Stage — fact/inference:** Experiment/data-preparation stage. **Inference:** this is not yet a complete model-training project.

**Gaps — fact:** Model objective, dataset filtering rationale, training code, validation/evaluation, reproducibility, storage size, and licensing/data governance are undocumented.

**Technologies:** Python, Hugging Face Datasets, JSONL.

---

## 7. Siri2

**Purpose — fact:** J.A.R.V.I.S.-style voice assistant with speech recognition, text-to-speech, command parsing, application/file actions, and search.

**Architecture and entry points — fact:** `jarvis_assistant/` contains core modules for speech recognition, command parsing, actions, communication, and main orchestration. README files and AGENTS documentation describe the intended structure.

**Data and integrations — fact:** SpeechRecognition/Google speech services, Gemini command interpretation, text-to-speech, operating-system automation, filesystem/application actions, and logging.

**Commands — fact:** Python requirements are defined under `jarvis_assistant`. Documentation indicates running the assistant’s main module/script, but the exact canonical command is not consistently centralized.

**Stage — fact/inference:** Prototype/experimental development. **Fact:** historical logs show model/API compatibility failures. **Inference:** the assistant needs dependency and model-version stabilization before production use.

**Gaps — fact:** Cross-platform setup, current Gemini model configuration, permissions/security around OS actions, test coverage, and command safety are incomplete.

**Technologies:** Python, Gemini, SpeechRecognition, TTS, OS automation, logging.

**Excluded content:** Historical logs were not used as a source of secret values; secret-bearing/config-sensitive content was excluded.

---

## 8. agent-foundry

**Purpose — fact:** Modular AI-agent platform with agent management, computer control, LLM communication, screen understanding, and user interface.

**Architecture and entry points — fact:** Large React/TypeScript application under `src/`, with Supabase configuration and SQL. Components include master-agent chat, tool/live viewers, UI panels, and agent-management views. The browser entry point is the standard React application entry.

**Data and integrations — fact:** Supabase configuration/database artifacts, browser fetch/API communication, LLM chat endpoints, and tool execution concepts including database/file/computer operations.

**Commands — fact:** `package.json` provides frontend development/build/lint commands. Supabase configuration indicates local or hosted Supabase workflows.

**Stage — fact/inference:** Substantial application prototype. **Inference:** the UI and orchestration surface are relatively advanced, but backend/tool execution completeness and production security are uncertain.

**Gaps — fact:** API contract, authentication/authorization, persistence schema, tool permission boundaries, deployment steps, and test coverage need consolidation.

**Technologies:** React, TypeScript, TSX, Vite-style frontend tooling, Supabase, SQL, LLM APIs.

---

## 9. backupmywebsite

**Purpose — fact:** Website backup/archive containing cPanel-related material, HTML site content, SEO/accessibility recommendations, and hosted-site files.

**Architecture and entry points — fact:** Primarily static HTML under `htdocs`, with administrative, guide, privacy, error, and index pages. cPanel metadata/configuration is present.

**Data and integrations — fact:** Static files, cPanel hosting structure, and SQL/text backup artifacts. No clearly active application backend was identified.

**Commands — fact:** No application build or development command is documented. The apparent operational action is restoring/uploading files through cPanel or a web host.

**Stage — fact/inference:** Archive/backup rather than active development. **Inference:** the repository should not be treated as a deployable source project until backup contents are separated from canonical source.

**Gaps — fact:** No clear restore procedure, provenance/version mapping, deployment target, backup integrity process, or distinction between live and obsolete files.

**Technologies:** HTML, PHP fragments, SQL/text backup material, cPanel hosting.

---

## 10. booking

**Purpose — fact:** Appointment-booking system with availability, bookings, Google Calendar conflict checking, notifications, reminders, transcripts, and client-facing flows.

**Architecture and entry points — fact:** Next.js application with React/TypeScript/JavaScript source. Modules under `src/` cover server logic, booking/availability, calendar, notifications, transcripts, database, and worker/server concerns. Next.js entrypoints and route files form the application boundary.

**Data and integrations — fact:** PostgreSQL and PGlite, Google Calendar, Vercel Blob, Anthropic SDK, bcrypt, JWT/Jose, and email/notification-related modules. Local database files exist but were not opened.

**Commands — fact:** `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, and `npm run typecheck` are declared. `vercel.json` and Next configuration indicate Vercel deployment intent.

**Stage — fact/inference:** Active development/MVP. **Inference:** broad functionality exists, but deployment and production configuration remain incomplete.

**Gaps — fact:** Authentication/authorization hardening, secrets/configuration, migration and production database procedure, calendar edge cases, background reminder execution, and end-to-end tests need verification.

**Technologies:** Next.js, React, TypeScript, JavaScript, PostgreSQL, PGlite, Google Calendar, Vercel Blob, Anthropic SDK, bcrypt, JOSE.

**Excluded content:** Local database files and screenshots were not opened.

---

## 11. cigarete

**Purpose — fact:** Expo mobile application named “Smoke” or similar, with local data and device capabilities.

**Architecture and entry points — fact:** Expo/React Native project using app routing, reusable components, hooks, constants, and screen files under `app/`.

**Data and integrations — fact:** SQLite/local persistence, notifications, location, image picking, and other device permissions are represented in the manifest/source.

**Commands — fact:** `package.json` contains Expo development/start/build commands. The expected workflow is Expo CLI on a simulator/device.

**Stage — fact/inference:** Mobile development prototype. **Inference:** the application has meaningful scaffolding but product intent and completion criteria are not documented.

**Gaps — fact:** No substantive README, unclear domain model, permission/privacy explanation, testing strategy, release configuration, or backend contract.

**Technologies:** Expo, React Native, TypeScript, Expo Router, SQLite, notifications, location, image picker.

---

## 12. haredisurvey

**Purpose — fact:** Website for the Haredi Women’s Charter, including charter content and signature collection.

**Architecture and entry points — fact:** Static HTML site with multiple charter/content pages, media assets, sitemap/robots files, Netlify configuration, and a Google Sheets integration script. `index.html` and charter pages are the main browser entrypoints.

**Data and integrations — fact:** Google Sheets signature submission, Netlify Functions/configuration, static hosting, PDFs/documents, and substantial Hebrew content/media.

**Commands — fact:** `package.json` exists, but the site is primarily static and Netlify-oriented. Deployment is likely through Netlify configuration rather than a complex build pipeline.

**Stage — fact/inference:** Active/maintained public-site implementation. **Inference:** it appears operationally closer to a deployed campaign site than a prototype, but the live signature path was not executed.

**Gaps — fact:** Signature endpoint permissions, privacy/data retention, duplicate/abuse handling, accessibility validation, and deployment ownership need documentation.

**Technologies:** HTML, JavaScript, Netlify, Google Sheets, XML sitemap, static media.

**Excluded content:** Images, PDFs, DOCX files, and other media were not read.

---

## 13. localaiagent

**Purpose — fact:** Expo/React Native local-AI application with a broader monorepo/workspace structure.

**Architecture and entry points — fact:** Mobile app code is organized around Expo Router and React Native. Workspace packages include API specification, generated API client/Zod schemas, database package, React API client, API server artifacts, mockup sandbox, and Gemma-agent artifacts.

**Data and integrations — fact:** Express API server, OpenAPI/Orval-generated clients, Zod schemas, database package requiring `DATABASE_URL`, React Native/Expo client, Async Storage/SQLite-related mobile dependencies, and local-AI/Gemma-oriented artifacts.

**Commands — fact:** `replit.md` documents workspace commands such as API code generation and API-server development. The root uses workspace/package-manager scripts rather than a single standalone command.

**Stage — fact/inference:** Large scaffolded multi-package prototype. **Inference:** the repository has significant generated and workspace infrastructure, but the product’s end-to-end mobile-to-API-to-model path is not yet clearly proven.

**Gaps — fact:** Canonical startup order, database provisioning/migrations, API authentication, model runtime, mobile screens/product requirements, and generated-code ownership need clarification.

**Technologies:** Expo, React Native, TypeScript, Expo Router, Express, OpenAPI, Orval, Zod, SQLite/Async Storage-related tooling, PostgreSQL-compatible database configuration.

**Excluded content:** Dependency directories, lockfiles, generated/build artifacts, and secrets were excluded from review.

---

## 14. minharez-sw

**Purpose — fact:** Small static host/service-worker experiment.

**Architecture and entry points — fact:** `index.html` and `sw.js` are the complete reviewable source. The browser loads the HTML and registers or references the service worker.

**Data and integrations — fact:** Browser Service Worker APIs only; no backend or persistent storage was identified.

**Commands — fact:** No build system or documented command. It can be served as static files from a web server.

**Stage — fact/inference:** Completed minimal experiment. **Inference:** likely a support component rather than a standalone product.

**Gaps — fact:** No README, deployment instructions, service-worker scope explanation, cache strategy, or test procedure.

**Technologies:** HTML, JavaScript, Service Worker API.

---

## 15. orchestrator

**Purpose — fact/inference:** Python orchestration system for decomposing, executing, merging, and exposing AI tasks. The repository name and code structure support this purpose; documentation is minimal.

**Architecture and entry points — fact:** Nested Python package includes orchestrator core modules such as decomposition, merging, task execution, and API handling. A FastAPI application is present.

**Data and integrations — fact:** Gemini/Google Generative AI configuration, FastAPI, background tasks, YAML/configuration, and likely subprocess or worker execution.

**Commands — fact:** Python dependency/configuration files exist, but there is no single clear top-level README command. The API module is the likely server entrypoint.

**Stage — fact/inference:** Experimental prototype. **Inference:** core orchestration concepts exist, but packaging, documentation, observability, and production controls are incomplete.

**Gaps — fact:** Missing clear setup/run instructions, API schema, worker lifecycle, persistence model, authentication, retry/idempotency behavior, and test coverage.

**Technologies:** Python, FastAPI, Google Gemini, YAML, background task execution.

---

## 16. roi-courses

**Purpose — fact:** Lovable/Vite course platform or course-content web application.

**Architecture and entry points — fact:** React/TypeScript frontend with Vite, Tailwind, shadcn/Radix-style components, pages, hooks, and Supabase configuration. Browser entry is `src/main`/`App` plus routed pages.

**Data and integrations — fact:** Supabase configuration and client/database-related code are present. The UI contains course-oriented screens/components. Tailwind and component configuration are included.

**Commands — fact:** `npm run dev`, `npm run build`, `npm run build:dev`, `npm run lint`, and `npm run preview` are provided by the Vite package.

**Stage — fact/inference:** Active frontend development. **Inference:** visually substantial and structurally mature, but backend schema, authentication, content management, and production data are not fully documented.

**Gaps — fact:** Course/content data model, Supabase migrations/policies, auth roles, authoring workflow, deployment process, and tests need documentation.

**Technologies:** React, TypeScript, Vite, Tailwind CSS, shadcn/Radix UI, Supabase.

---

## 17. siri

**Purpose — fact:** Small Siri/JARVIS-style assistant experiment with browser UI and Python services.

**Architecture and entry points — fact:** `server.py` serves static content, `communication_server.py` exposes an API on a local port, `actions.py` performs commands, and `gemini_basic.py` handles Gemini interaction. `index.html` provides browser-side voice interaction.

**Data and integrations — fact:** Gemini API, browser Web Speech API, local HTTP servers, subprocess/OS actions, and Google/search URL generation.

**Commands — fact:** `server.py` serves the project on port 8002; the communication service uses a separate local API port. The repository has no consolidated launcher or README.

**Stage — fact/inference:** Small experiment/prototype. **Inference:** useful as a proof of concept but not production-ready.

**Gaps — fact:** No documented setup, authentication, CORS/security model, API contract, test suite, or safe command execution policy.

**Technologies:** Python, HTTP server, HTML, browser Web Speech API, Gemini, JavaScript.

---

## 18. site-spotlight-48e04e4d

**Purpose — fact:** Lovable-generated web application project; exact product purpose is not clearly documented in the source README.

**Architecture and entry points — fact:** Vite React TypeScript frontend with `src/`, routed pages/components, Tailwind, shadcn/Radix UI, and generated UI infrastructure. `src/main` and `App` are the frontend entrypoints.

**Data and integrations — fact:** Frontend-only dependencies and UI libraries are present. No clearly implemented backend or persistent data layer was established from the reviewed source.

**Commands — fact:** `npm run dev`, `npm run build`, `npm run build:dev`, `npm run lint`, and `npm run preview`.

**Stage — fact/inference:** Frontend development scaffold. **Inference:** likely a Lovable-generated or exported product prototype awaiting product-specific implementation and documentation.

**Gaps — fact:** Product purpose, data model, backend/API, authentication, deployment target, and ownership relationship with Lovable are unclear.

**Technologies:** Vite, React, TypeScript, Tailwind CSS, shadcn-ui, Radix UI, ESLint.

---

# Repositories requiring updates to `GITHUB_PROJECTS_REVIEW.md`

**All 18 non-empty repositories require updates.**

The existing document is materially outdated for this local review because:

1. It reports a previous GitHub/API scan rather than local-clone inspection.
2. It lacks file and LOC inventories.
3. Several entries previously described only metadata or partial repository trees; local source is now available for deeper reporting.
4. It does not consistently identify actual entrypoints, commands, data stores, integrations, or implementation gaps.
5. It includes repositories previously described as empty or deleted even though the current review scope contains only the 18 non-empty clones.
6. It does not clearly distinguish source-confirmed facts from inferences.
7. It does not record excluded artifacts such as binaries, archives, generated output, databases, and media.

The most significant updates are needed for **CRM, booking, Karu-AI, LiveEdits, agent-foundry, localaiagent, roi-courses, site-spotlight-48e04e4d, GemmaAgent, and haredisurvey**, because their local source reveals substantially more architecture than the existing summaries.