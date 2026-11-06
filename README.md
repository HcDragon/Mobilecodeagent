# CodeNomad - Portable Cloud Development Environment

> **Status:** Phase 1 (Cross-Platform UI Foundation) Complete  
> **Platform Targets:** iOS & Android (React Native 0.88 / Expo SDK 58 / Expo Router)

CodeNomad is a cross-platform mobile application that empowers developers to continue working on software projects while away from their laptops. The phone serves as the control surface, while code execution, agent tools, dev servers, and persistent workloads execute in isolated cloud workspaces.

---

## Phase 1 Implementation Summary

Phase 1 provides the initial cross-platform navigation shell, responsive developer-tool UI, and typed mock data layer:

1. **App Navigation (Persistent 5-tab bar):**
   - **Home (`app/(tabs)/index.tsx`)**: Dashboard displaying project KPIs (Running, Starting, Stopped), Recent Projects, Workspace Activity feed, and GitHub connection modal placeholder.
   - **Projects (`app/(tabs)/projects.tsx`)**: Full repository catalog with live search, status filters (All, Running, Stopped, Starting, Error), and direct navigation to project consoles.
   - **Agent (`app/(tabs)/agent.tsx`)**: AI Coding Agent interactive prototype with Claude 3.7 & Gemini 2.0 provider switcher, conversation bubbles, tool call progress badges, and keyboard-safe input dock.
   - **Terminal (`app/(tabs)/terminal.tsx`)**: Mobile terminal console with simulated AWS Fargate PTY logs, command chips, interactive prompt, and keyboard-friendly layout.
   - **Preview (`app/(tabs)/preview.tsx`)**: In-app browser destination with address bar, refresh button, viewport device mode toggle (mobile/desktop), and running dev server canvas.

2. **Detail & Utility Routes:**
   - **Project Console (`app/projects/[projectId].tsx`)**: Displays workspace container status, specifications (branch, port, region), interactive Start/Resume/Stop controls that simulate state transitions locally, tool shortcuts, and project activity feed.
   - **Files & Editor (`app/files/[projectId].tsx`)**: Directory explorer tree with expandable folders, file selection, and syntax-styled code preview panel.
   - **Settings (`app/settings.tsx`)**: Account profile, GitHub App connection status (Phase 3), AI Provider adapters (Phase 5), cloud runtime specs (Phase 4), and version information.
   - **Architecture Modal (`app/modal.tsx`)**: Documents plane separation (Control Plane vs. Workspace Plane).

3. **Data Models & State (`src/`):**
   - Typed data models in `src/types/index.ts` matching PRD section 7.5.
   - Centralized design tokens in `src/theme/index.ts` (colors, typography, spacing, radius).
   - Local state management in `src/hooks/useWorkspaceState.tsx` allowing realistic status toggling without premature backend dependencies.
   - Separate mock modules in `src/data/mock/` for projects, activity logs, agent sessions, terminal history, and file trees.
   - Reusable components in `src/components/common/` (`Badge`, `Button`, `Card`, `DemoBanner`, `EmptyState`, `LoadingState`, `ErrorBanner`, `Header`).

---

## Getting Started

### Prerequisites
- Node.js `v20.x` or higher (verified on Node `v24.21.0`)
- npm `v10.x` or higher (or bun/yarn)
- Expo Go app on iOS/Android or simulator/emulator configured

### Installation
```bash
# Install dependencies
npm install
```

### Running the App
```bash
# Start the Expo interactive development server
npm run start

# Launch directly on iOS Simulator
npm run ios

# Launch directly on Android Emulator
npm run android

# Launch in Web browser for responsive preview
npm run web
```

### Verification & Testing
```bash
# Run TypeScript strict typecheck
npm run typecheck

# Run unit and schema verification tests
npm test

# Run Expo configuration and dependency health check
npm run doctor

# Verify bundle compilation for native platforms
npx expo export --platform ios
npx expo export --platform android
```

---

## What is Implemented vs. What Remains Mocked

| Feature | Phase 1 Status | Next Planned Phase |
| :--- | :--- | :--- |
| **Navigation Shell (5 Tabs + Subroutes)** | ✅ Fully functional (Expo Router) | Complete |
| **Workspace State Simulation** | ✅ Local state via `WorkspaceProvider` | Phase 4 (AWS Fargate) |
| **Mock Projects & Activity Feed** | ✅ Typed modules in `src/data/mock/` | Phase 2 (FastAPI REST) |
| **AI Agent Chat Interface** | ✅ Interactive UI + Tool Badges (Demo) | Phase 5 (Claude/Gemini) |
| **Remote Terminal Layout** | ✅ Interactive Console + Input (Demo) | Phase 4 (PTY WebSockets) |
| **Live App Preview** | ✅ In-app browser canvas & viewport controls | Phase 6 (Signed Gateway) |
| **Files & Code Viewer** | ✅ Interactive file tree + code preview | Phase 7 (Remote Code Editor) |
| **GitHub OAuth / App** | ⚠️ Explicit placeholder dialogs | Phase 3 (GitHub App tokens) |
| **Backend & Cloud Infrastructure** | ⚠️ Not connected (Separation of planes) | Phases 2 & 4 |

---

## Architectural Notes
- Repository code is never executed on the mobile device.
- All secrets and provider API keys remain server-side in later phases.
- Strict TypeScript verification and responsive safe areas ensure cross-platform compatibility across iOS and Android.
