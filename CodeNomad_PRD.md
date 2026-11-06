# Product Requirements Document (PRD)

# CodeNomad --- Portable Cloud Development Environment

**Document status:** Initial development specification\
**Version:** 0.1\
**Date:** 7 November 2026\
**Product name:** CodeNomad (working title; configurable)\
**Target platforms:** iOS and Android\
**Primary instruction:** Build the cross-platform mobile application
foundation and a basic, navigable UI first. Do not make detailed
visual-design assumptions beyond this document. The product owner will
provide more specific UI direction after reviewing the initial build.

------------------------------------------------------------------------

## 1. Instructions to the Coding Agent

You are the lead engineer responsible for implementing this product in
small, reviewable phases.

### 1.1 First task

**Your first deliverable is a working React Native application that runs
on both iOS and Android and contains a basic, coherent UI scaffold.**

Do not begin by implementing the full cloud IDE, AI agent execution
system, AWS infrastructure, billing, or production GitHub workflows.
Those are later phases.

For the first implementation:

1.  Inspect the existing repository and its current state before
    changing files.
2.  If the repository is empty, initialize the application using the
    stack in this PRD.
3.  If an application already exists, preserve working conventions and
    dependencies where reasonable. Do not replace the project structure
    without explaining why.
4.  Create the navigation shell and the initial screens described in
    Phase 1.
5.  Use clearly identified mock data for repositories, workspaces,
    activity, and status.
6.  Make every visible navigation control work. Do not create buttons
    that appear functional but do nothing; for actions not yet
    implemented, show a clear "Coming in a later phase" state or a
    lightweight placeholder interaction.
7.  Verify the app on both iOS and Android targets. If the environment
    cannot run one target, document the exact limitation and still
    validate the platform build/configuration as far as possible.
8.  Run linting, type-checking, and available tests. Fix errors before
    reporting completion.
9.  Provide a concise implementation report: files created/changed,
    commands run, validation results, known limitations, and the
    recommended next step.

### 1.2 Working rules

-   Implement one phase at a time. Do not silently skip ahead.
-   Do not invent product requirements or make irreversible architecture
    decisions without documenting them.
-   Prefer simple, maintainable, typed code over premature abstractions.
-   Keep platform-specific behavior isolated when needed.
-   Do not hardcode credentials, API keys, tokens, or secrets.
-   Never execute untrusted repository code on the mobile device.
-   Do not expose a cloud workspace, terminal, development server, or
    preview port directly to the public internet.
-   Do not claim that an integration works until it has been implemented
    and tested.
-   Keep mock data separate from production service code so it can be
    replaced cleanly.
-   Before adding a dependency, check whether the existing stack already
    provides the capability.
-   Keep the UI deliberately basic in this phase. The product owner will
    provide detailed screen designs and visual direction later.

------------------------------------------------------------------------

## 2. Product Summary

CodeNomad is a cross-platform mobile application that allows developers
to continue working on software projects while away from their laptops.

A user connects a GitHub account, selects a repository, and opens a
cloud development workspace. The workspace will eventually provide:

-   A project file explorer and code editor.
-   An AI coding agent, initially supporting Claude and Gemini through
    provider adapters.
-   An interactive terminal connected to the cloud workspace.
-   A live application preview displayed inside the mobile app or opened
    in an external browser.
-   Git operations such as branch selection, diff review, commits,
    pushes, and pull requests.
-   Persistent project files and the ability to resume work later.

The phone is the control surface. Code execution, dependency
installation, AI agent tools, development servers, and project workloads
run in isolated cloud workspaces rather than directly on the phone.

### 2.1 Product positioning

This is not merely an AI chat application and not simply a mobile text
editor.

It is a **portable development environment** that enables a developer to
continue a real software project from anywhere.

### 2.2 Core product promise

A developer should be able to:

1.  Open the app.
2.  Select a project.
3.  Resume or start its cloud workspace.
4.  inspect and edit files manually or ask an AI agent to make changes.
5.  Run commands in a remote terminal.
6.  See the running application through a live preview.
7.  Review and save changes to GitHub.
8.  Return to the same project later and continue working.

------------------------------------------------------------------------

## 3. Goals and Non-Goals

### 3.1 Product goals

-   Provide a polished, usable mobile-first development experience on
    iOS and Android.
-   Make project and workspace access straightforward.
-   Support both manual coding and AI-assisted development.
-   Keep development environments independent from the phone's local
    compute limitations.
-   Support secure, persistent cloud workspaces.
-   Support live preview of websites and other web-based UI projects.
-   Allow users to move between mobile and desktop development without
    losing project continuity.
-   Keep the AI provider layer extensible so Claude, Gemini, or future
    providers can be integrated without redesigning the app.

### 3.2 Initial release goals

The first development milestone is intentionally smaller:

-   Cross-platform application setup.
-   Basic app navigation.
-   Basic Home/Dashboard screen.
-   Projects/Repositories screen with mock repository data.
-   Workspace screen with mock status and placeholder actions.
-   Agent screen with a basic chat layout and non-functional/mock
    interaction clearly labelled as demo.
-   Terminal screen with a terminal-style placeholder and clear future
    integration status.
-   Preview screen with a browser-style placeholder and clear future
    integration status.
-   Shared design tokens and reusable UI components.
-   Basic loading, empty, and error states where relevant.

### 3.3 Non-goals for Phase 1

Do not implement these in the first UI milestone:

-   Real GitHub OAuth or GitHub App installation.
-   Repository cloning or Git operations.
-   Real AWS provisioning or cloud infrastructure.
-   Real Docker containers or remote shell execution.
-   Claude API or Gemini API integration.
-   Agent tool execution or autonomous code changes.
-   A production code editor.
-   A production terminal emulator.
-   A production embedded browser or preview gateway.
-   Billing, subscriptions, teams, collaboration, or enterprise
    administration.
-   Production push notifications.
-   Production analytics or telemetry.

These are future capabilities and must not be simulated in a way that
could mislead users into thinking they are already connected.

------------------------------------------------------------------------

## 4. Target Users and Main Use Cases

### 4.1 Primary user

A software developer who already works with Git repositories and wants
to make progress while travelling, commuting, waiting, or otherwise away
from a laptop.

### 4.2 Secondary user

A developer who wants to delegate small tasks to an AI coding agent,
monitor execution, inspect changes, and check a running preview from a
phone.

### 4.3 Main use cases

**UC-01: Resume a project** - User opens the app. - User sees recent
projects. - User selects a project. - App displays its workspace
state. - In a later phase, the user resumes the cloud workspace.

**UC-02: Ask an AI agent to make a change** - User opens the Agent
section for a project. - User enters a task. - Agent receives project
context and performs approved tools. - User sees progress and proposed
changes. - User reviews the diff before accepting or committing changes.

**UC-03: Manually edit a file** - User opens the file explorer. - User
selects a file. - Editor displays syntax-highlighted content. - User
edits and saves the file to the cloud workspace.

**UC-04: Run a command** - User opens Terminal. - User enters a
command. - Command executes in the selected isolated cloud workspace. -
Output streams back to the app.

**UC-05: View a live preview** - User starts a development server. - The
cloud platform exposes it through an authenticated preview gateway. -
User views the application inside the app or opens a secure URL
externally.

**UC-06: Save progress** - User reviews changed files. - User creates a
commit and pushes to a selected branch. - User can later resume the
project from another device.

------------------------------------------------------------------------

## 5. Platform and Technology Decisions

The following is the intended baseline. The coding agent should inspect
the repository before applying it and document any justified deviation.

### 5.1 Mobile application

  -----------------------------------------------------------------------
  Area                                Baseline
  ----------------------------------- -----------------------------------
  Framework                           React Native

  Development tooling                 Expo

  Language                            TypeScript with strict type
                                      checking

  Navigation                          Expo Router

  Platform targets                    iOS and Android

  UI                                  React Native components with a
                                      small shared design system

  State                               React hooks initially; introduce a
                                      state library only when complexity
                                      warrants it

  API client                          Typed service layer, added when
                                      backend integration begins

  Realtime communication              WebSockets in later phases
  -----------------------------------------------------------------------

Use Expo-compatible packages and avoid web-only dependencies in native
screens unless intentionally hosted in a WebView.

### 5.2 Future backend

  -----------------------------------------------------------------------
  Area                                Intended technology
  ----------------------------------- -----------------------------------
  Backend API                         Python FastAPI

  API style                           REST for normal operations;
                                      WebSockets for streaming

  Database                            PostgreSQL

  Cache/session coordination          Redis, when required

  Authentication                      AWS Cognito or a reviewed
                                      equivalent

  Source control integration          GitHub App

  Secrets                             AWS Secrets Manager or an
                                      equivalent secure secrets service
  -----------------------------------------------------------------------

### 5.3 Future cloud execution

  -----------------------------------------------------------------------
  Area                                Candidate technology
  ----------------------------------- -----------------------------------
  Cloud provider                      AWS

  Container orchestration             Amazon ECS

  Initial container runtime           AWS Fargate, subject to workload
                                      and cost validation

  Persistent workspace storage        Amazon EFS or another evaluated
                                      persistent-volume design

  Object storage                      Amazon S3

  Logs and metrics                    Amazon CloudWatch; OpenTelemetry
                                      where useful

  Preview routing                     Authenticated reverse proxy/gateway

  Container image registry            Amazon ECR
  -----------------------------------------------------------------------

The architecture must allow the workspace runtime to evolve. Do not
couple mobile screens directly to AWS-specific APIs.

### 5.4 AI provider integration

The application should eventually support:

-   Anthropic Claude through an appropriate supported agent SDK/API.
-   Google Gemini through an appropriate supported agent SDK/API.

Create a provider-neutral interface in the backend when AI integration
begins. Do not put provider API keys in the mobile app. Do not assume
both providers have identical tool, session, streaming, or permission
semantics.

------------------------------------------------------------------------

## 6. High-Level System Architecture

The intended production architecture has four main layers.

``` text
┌──────────────────────────────────────────────┐
│              iOS / Android App               │
│                                              │
│ Home | Projects | Workspace | Agent          │
│ Files | Editor | Terminal | Preview | Git    │
└──────────────────────┬───────────────────────┘
                       │ HTTPS / WebSocket
                       ▼
┌──────────────────────────────────────────────┐
│                Backend Control Plane         │
│                                              │
│ Auth | User/Project API | Workspace Manager  │
│ GitHub Integration | Agent Orchestrator      │
│ Session Routing | Usage & Audit              │
└─────────────┬──────────────────┬─────────────┘
              │                  │
              ▼                  ▼
┌────────────────────────┐  ┌──────────────────┐
│ AI Provider Adapters   │  │ Workspace Manager│
│ Claude / Gemini        │  │ Provision/Resume │
│ Tool policy and events │  │ Stop/Destroy     │
└────────────┬───────────┘  └────────┬─────────┘
             │                       │
             │                       ▼
             │             ┌──────────────────────┐
             └────────────►│ Isolated Cloud       │
                           │ Development Workspace│
                           │                      │
                           │ Git | Files | Shell   │
                           │ Runtime | Dev Server │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           ┌──────────────────────┐
                           │ Secure Preview       │
                           │ Gateway              │
                           └──────────┬───────────┘
                                      │
                                      ▼
                           Mobile in-app browser /
                           external browser
```

### 6.1 Control plane versus workspace plane

Keep these concerns separate:

**Control plane** - Authenticates users. - Stores project and workspace
metadata. - Creates, resumes, stops, and monitors workspaces. - Routes
requests to the correct workspace. - Manages GitHub connections. -
Coordinates AI provider sessions. - Enforces authorization, quotas, and
audit logging.

**Workspace plane** - Contains the checked-out repository. - Runs shells
and development tools. - Runs AI tools under controlled permissions. -
Runs project development servers. - Stores project files on persistent
storage.

A user's repository code must never execute inside the main backend API
process.

------------------------------------------------------------------------

## 7. Phase 1 --- Cross-Platform UI Foundation

**Priority: Immediate. This is the only phase to implement now.**

### 7.1 Objective

Create a basic but well-structured mobile UI that demonstrates the
product's navigation and primary development areas.

The UI should be clean, professional, readable, and mobile-first. Do not
spend time trying to finalize branding or detailed styling. The product
owner will review the first build and provide more specific UI
instructions.

### 7.2 App navigation

Use a persistent bottom navigation with five primary destinations:

1.  Home
2.  Projects
3.  Agent
4.  Terminal
5.  Preview

The selected project/workspace context should be visible where
appropriate. Files and workspace details can be accessed from a
project/workspace detail screen rather than adding too many bottom tabs.

Navigation must work on both iOS and Android, including back navigation.

### 7.3 Screen requirements

#### Screen A --- Home / Dashboard

Purpose: Give the user a quick overview and a fast way to resume work.

Include: - Product name or temporary wordmark: CodeNomad. - Greeting or
neutral welcome header. - A "Recent Projects" section. - A "Workspaces"
or "Workspace Status" section. - Recent activity list. - Quick action to
connect GitHub (placeholder only in Phase 1). - A clear empty state if
there are no projects. - A profile/settings entry point.

Use mock data, but label it as sample/demo data in development builds or
through a subtle UI indicator.

Example project data: - `portfolio-web` --- React / TypeScript --- last
opened recently. - `smart-soc-dashboard` --- React / FastAPI ---
workspace stopped. - `api-service` --- Python --- workspace running.

Do not imply these repositories have actually been fetched from GitHub.

#### Screen B --- Projects

Purpose: Display the user's repositories/projects.

Include: - Screen title. - Search field. - Repository/project list. -
Project name. - Technology tags. - Branch label. - Last activity
label. - Workspace state indicator. - Tap a project to open its
project/workspace detail screen. - Empty state and loading state
components, even if mock data is used.

Include a "Connect GitHub" call to action. It must clearly be a
placeholder until GitHub authentication is implemented.

#### Screen C --- Project / Workspace Details

Purpose: Display the selected project's context and available tools.

Include: - Project/repository name. - Selected branch. - Workspace
status: Not started, Starting, Running, Stopped, or Error. - Last active
information. - Primary "Start Workspace" or "Resume Workspace" action
(mock interaction only). - Shortcuts to Files, Agent, Terminal, Preview,
and Git. - A small activity/events section.

For Phase 1, clicking Start/Resume may update local demo state only.
Make it obvious that no real cloud environment is being provisioned.

#### Screen D --- Agent

Purpose: Establish the basic layout for future AI coding interaction.

Include: - Agent conversation area. - Distinct user and assistant
message styles. - Message input. - Send action. - Provider selector with
Claude and Gemini options, visually marked as demo/not connected. - New
conversation action or placeholder. - Agent activity/status area that
can later show tool execution. - Clear demo label or explanatory text
that no real AI provider is connected yet.

For Phase 1, do not call an AI API. A local mock response is acceptable
only if clearly identified as a demo. Alternatively, show a
non-functional integration placeholder.

Future-ready message/event types should be considered, but do not
over-engineer the UI.

#### Screen E --- Terminal

Purpose: Establish a mobile-friendly remote terminal destination.

Include: - Terminal title. - Selected project/workspace label. -
Connection status placeholder. - Terminal-like output panel. - Command
input area. - Keyboard-friendly layout. - Clear "Remote terminal
integration is not connected yet" state.

Do not execute commands locally or remotely in Phase 1. Do not use an
ordinary text input to imply a working shell without an explicit demo
label.

#### Screen F --- Preview

Purpose: Establish the in-app live-preview destination.

Include: - Browser-style top bar. - URL/address display placeholder. -
Refresh control placeholder. - Open externally control placeholder. -
Main preview canvas with a useful empty state. - Text explaining that a
running cloud development server will appear here in a later phase.

Do not load arbitrary URLs or create public preview links in Phase 1.

#### Screen G --- Files / Editor placeholder

Purpose: Show how users will reach project files and code editing.

Include: - File tree/list placeholder. - File/folder icons. - Selected
file area or editor placeholder. - Project and branch context. - Clear
indication that cloud file access and editing are not connected yet.

Do not build a full editor in this phase.

#### Screen H --- Settings

Include: - Account/profile placeholder. - GitHub connection status
placeholder. - AI provider connection status placeholder. - Appearance
preference placeholder if easy to implement. - About/version
information. - Sign out only if authentication exists; otherwise do not
show a misleading sign-out action.

### 7.4 Basic design guidance

Until the product owner provides detailed UI direction:

-   Use a restrained, professional developer-tool visual language.
-   Prefer neutral backgrounds and readable contrast.
-   Avoid flashy gradients, excessive neon, and unnecessary decoration.
-   Use consistent spacing, typography, icon sizing, and corner radii.
-   Support small and large phone screens.
-   Respect safe areas, notches, and system navigation.
-   Make touch targets comfortable for mobile use.
-   Ensure keyboard appearance does not hide chat or command inputs.
-   Support light/dark mode only if it can be done cleanly without
    delaying the basic UI.
-   Use reusable components rather than styling every screen
    independently.

Do not treat screenshots or visual examples from this PRD as final
design specifications. The product owner will supply detailed UI
direction after reviewing the initial build.

### 7.5 Phase 1 data model

Use local typed mock data. Keep it separate from screen components.

Suggested TypeScript types:

``` ts
export type WorkspaceStatus =
  | "not_started"
  | "starting"
  | "running"
  | "stopped"
  | "error";

export type AIProvider = "claude" | "gemini";

export interface Project {
  id: string;
  name: string;
  description?: string;
  repositoryFullName?: string;
  primaryLanguage?: string;
  technologies: string[];
  branch: string;
  lastActivityAt?: string;
  workspaceStatus: WorkspaceStatus;
}

export interface ActivityItem {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
}
```

Use ISO 8601 strings for dates. Do not put mock records directly into UI
components.

### 7.6 Phase 1 acceptance criteria

Phase 1 is complete only when:

-   [ ] The app launches successfully on iOS.
-   [ ] The app launches successfully on Android.
-   [ ] TypeScript strict checks pass.
-   [ ] The five primary navigation destinations work.
-   [ ] Project list is populated from a separate mock-data module.
-   [ ] A project can be selected and its detail screen opened.
-   [ ] Workspace demo status can be changed locally without claiming a
    real cloud workspace exists.
-   [ ] Agent, Terminal, Preview, Files, and Settings screens have
    useful placeholder states.
-   [ ] Back navigation works.
-   [ ] Inputs remain usable when the mobile keyboard is open.
-   [ ] Loading, empty, and error UI patterns are available.
-   [ ] No API keys or secrets are committed.
-   [ ] Linting and available tests pass.
-   [ ] A README explains setup and how to run the app on iOS and
    Android.
-   [ ] The coding agent reports what is implemented and what remains
    mocked.

### 7.7 Phase 1 deliverables

-   Working Expo/React Native TypeScript application.
-   Navigation structure.
-   Basic screens listed above.
-   Shared UI components and design tokens.
-   Typed mock data.
-   README with setup/run instructions.
-   Validation report.
-   Screenshots or a short screen recording from iOS and Android
    simulators/emulators, if available.

------------------------------------------------------------------------

## 8. Phase 2 --- Backend and Authentication

**Do not implement until Phase 1 is reviewed and approved.**

Objectives: - Create FastAPI backend. - Establish environment
configuration and API versioning. - Implement user authentication. - Add
user, project, repository connection, and workspace metadata models. -
Establish PostgreSQL migrations. - Add request validation and consistent
error responses. - Add authorization checks for every user-owned
resource. - Create typed API contracts for the mobile app.

Initial API groups (names are provisional):

``` text
/api/v1/auth/*
/api/v1/users/me
/api/v1/projects
/api/v1/github/*
/api/v1/workspaces
/api/v1/activity
```

Acceptance criteria: - Authenticated user can access only their own
resources. - API secrets are stored server-side. - Database migrations
are reproducible. - API documentation is available in development. -
Mobile app can replace mock project data with backend data behind a
service/repository layer.

------------------------------------------------------------------------

## 9. Phase 3 --- GitHub Integration

Objectives: - Register and configure a GitHub App. - Implement the
authorization/install flow. - Request minimum necessary repository
permissions. - List repositories accessible to the user. - Select
repository and branch. - Clone repository into a workspace. - Show
branch and repository metadata. - Later support branch creation, status,
diff, commit, push, and pull request creation.

Requirements: - Prefer GitHub App installation tokens over long-lived
personal access tokens. - Keep tokens on the backend. - Never log access
tokens. - Handle revoked permissions and disconnected accounts. -
Respect repository-level access restrictions.

Acceptance criteria: - User can connect GitHub securely. - Only
authorized repositories are visible. - Selected repository and branch
are persisted. - Git operations return clear success/error states. -
Changed files can be reviewed before commit.

------------------------------------------------------------------------

## 10. Phase 4 --- Cloud Workspace Runtime

Objectives: - Design a workspace manager independent of the mobile
app. - Provision isolated development environments. - Support workspace
start, stop, resume, and destroy. - Clone selected repositories. -
Persist project files across compute restarts. - Provide a controlled
remote terminal service. - Stream terminal output to the mobile app over
authenticated WebSockets. - Track workspace status and resource usage.

Potential workspace lifecycle:

``` text
NOT_STARTED
    |
    v
PROVISIONING
    |
    v
STARTING
    |
    v
RUNNING
    |
    +------> IDLE / SUSPENDING
    |              |
    |              v
    |           STOPPED
    |              |
    +--------------+----> RESUMING
                           |
                           v
                         RUNNING

Any active state may transition to ERROR.
```

Requirements: - Each workspace must have a unique owner and
authorization boundary. - Workspace filesystem and process execution
must be isolated. - Apply CPU, memory, storage, process, and runtime
limits. - Do not mount the Docker host socket into untrusted
workspaces. - Do not run untrusted project code in the backend
control-plane container. - Define idle shutdown and retention
policies. - Persist data before stopping compute. - Record lifecycle
events for debugging and audit.

Acceptance criteria: - A user can start a workspace for an authorized
repository. - A user can stop and resume it without losing persisted
project files. - Terminal output streams reliably. - A user cannot
access another user's workspace. - Workspace resource limits and cleanup
behavior are tested.

------------------------------------------------------------------------

## 11. Phase 5 --- AI Coding Agent

Objectives: - Add provider-neutral AI orchestration in the backend. -
Integrate Claude first, then Gemini, or support both through adapters. -
Maintain project/workspace-specific agent sessions. - Stream assistant
responses and tool events to the mobile app. - Provide controlled file
and terminal tools. - Show tool execution progress and approval
requests. - Show changed files and diffs. - Allow users to accept,
reject, or revert proposed changes.

### 11.1 Suggested tool categories

The agent may eventually use tools such as:

-   `list_files`
-   `read_file`
-   `search_files`
-   `write_file`
-   `apply_patch`
-   `run_command`
-   `get_git_status`
-   `get_diff`
-   `start_dev_server`
-   `get_preview_status`

These are conceptual tool names, not permission to expose unrestricted
shell access.

### 11.2 Permission model

-   Read-only actions may be allowed according to workspace policy.
-   File modifications should be visible and attributable to the agent.
-   Commands should run in the isolated workspace.
-   Potentially destructive commands require explicit approval.
-   Network access should be restricted or policy-controlled.
-   Secrets must not be included in agent context unless explicitly
    required and safely mediated.
-   Agent tool calls must be logged with actor, workspace, tool,
    timestamp, result, and approval state.
-   The user must be able to stop/cancel an agent run.

### 11.3 Provider abstraction

Create a common internal interface for: - Starting/resuming a session. -
Sending a user task. - Streaming text and structured events. -
Requesting tool execution through the controlled tool layer. -
Cancelling a run. - Returning usage and error metadata where available.

Do not assume Claude and Gemini use the same event format or tool
semantics. Normalize them inside the backend adapter layer.

Acceptance criteria: - User can select a configured provider. - Agent
can read project files within its authorization scope. - Agent can
propose and apply a change through controlled tools. - User sees
progress and tool events. - User can inspect a diff. - User can cancel a
running task. - Provider failures are handled without corrupting the
workspace. - No provider API key is shipped in the mobile app.

------------------------------------------------------------------------

## 12. Phase 6 --- Live Preview and Browser

Objectives: - Detect or configure the development server port. - Start
the server inside the workspace. - Route traffic through an
authenticated preview gateway. - Support HTTP and WebSocket traffic. -
Display the preview in an in-app browser/WebView. - Offer an option to
open the preview in the device's external browser. - Support refresh and
basic viewport controls. - Expire or revoke preview access when
appropriate.

Security requirements: - Never expose arbitrary workspace ports
directly. - Bind preview access to the correct user and workspace. - Use
short-lived signed access or authenticated sessions. - Prevent one user
from accessing another user's preview. - Validate routing and prevent
path/host confusion. - Do not expose internal AWS addresses or workspace
credentials.

Acceptance criteria: - User can start a supported web development
server. - App displays its running preview. - Hot reload works where
supported by the framework. - Preview WebSockets work through the
gateway. - Unauthorized users cannot access private previews. - User can
open a preview externally using a secure URL.

------------------------------------------------------------------------

## 13. Phase 7 --- Editor and Git Workflow

Objectives: - Add file browsing and editing against the remote
workspace. - Support syntax highlighting for common languages. - Add
search within files and project. - Support save state and unsaved-change
indicators. - Add diff viewer. - Add branch selection and Git status. -
Add commit and push flows. - Add pull request creation and status.

Editor technology must be evaluated specifically for React Native
compatibility, performance, mobile keyboard behavior, selection, paste,
and large files. CodeMirror hosted in a carefully designed WebView is
one candidate; do not assume desktop Monaco is automatically suitable
for a native mobile app.

Acceptance criteria: - User can open and edit a remote project file. -
Save operation updates the cloud workspace. - Unsaved changes are
clearly indicated. - Git diff accurately represents the user's
changes. - User must confirm before committing/pushing.

------------------------------------------------------------------------

## 14. Phase 8 --- Production Readiness

Objectives: - Observability and alerting. - Usage limits and cost
controls. - Workspace quotas. - Secure secret handling. - Backup and
retention policies. - Reliability and recovery. - Privacy and data
deletion workflows. - Rate limiting and abuse prevention. -
Accessibility and device testing. - App Store and Play Store release
preparation. - Billing only after product usage and cost model are
understood.

Do not introduce billing prematurely. First measure the actual cost of
workspace compute, persistent storage, AI usage, and network traffic.

------------------------------------------------------------------------

## 15. Security, Privacy, and Reliability Requirements

These requirements apply across all phases.

### 15.1 Authentication and authorization

-   Use secure authentication flows.
-   Store session credentials using platform-appropriate secure storage.
-   Enforce authorization on the backend, not only in the UI.
-   Scope all project and workspace queries to the authenticated user.
-   Revoke sessions and connected integrations when access is removed.

### 15.2 Workspace isolation

-   Treat repository contents and dependencies as untrusted.
-   Isolate each user's processes and filesystem.
-   Restrict CPU, memory, storage, process count, runtime, and network
    access.
-   Do not expose host-level privileges.
-   Keep the control plane separate from execution environments.

### 15.3 Secrets

-   Never hardcode API keys or credentials.
-   Never ship Claude, Gemini, AWS, database, or GitHub secrets in the
    mobile bundle.
-   Use a server-side secrets manager.
-   Redact secrets from logs and agent output.
-   Avoid passing secrets into model context.

### 15.4 Network security

-   Use TLS for all external traffic.
-   Authenticate WebSocket connections.
-   Validate workspace and preview routing.
-   Apply rate limits.
-   Do not expose internal services directly.

### 15.5 Data safety

-   Persist project data before compute shutdown.
-   Provide recovery/checkpoint strategy before destructive workspace
    operations.
-   Clearly communicate when data may expire.
-   Make deletion behavior explicit.

------------------------------------------------------------------------

## 16. Quality Attributes

-   **Cross-platform:** Core workflows must behave consistently on iOS
    and Android.
-   **Responsive UI:** The app must remain usable on common phone sizes.
-   **Maintainability:** Use modular screens, services, types, and
    shared components.
-   **Reliability:** Workspace state must be explicit; do not infer it
    from a single network request.
-   **Security:** Authorization and isolation must be enforced
    server-side.
-   **Observability:** Backend and workspace events must be diagnosable.
-   **Extensibility:** New AI providers and workspace runtimes should be
    addable without rewriting the mobile UI.
-   **Network resilience:** Mobile connections can drop while
    travelling. Later phases must support reconnecting, session
    recovery, and clear connection state.
-   **Accessibility:** Use readable contrast, accessible labels, and
    reasonable touch targets.

------------------------------------------------------------------------

## 17. Suggested Repository Structure

The coding agent may adapt this to the existing repository. Do not
create every future directory in Phase 1 if it would result in empty or
misleading scaffolding.

### Initial mobile structure

``` text
/
├── app/                       # Expo Router routes
│   ├── (tabs)/
│   │   ├── index.tsx          # Home
│   │   ├── projects.tsx
│   │   ├── agent.tsx
│   │   ├── terminal.tsx
│   │   └── preview.tsx
│   ├── projects/
│   │   └── [projectId].tsx
│   ├── files/
│   │   └── [projectId].tsx
│   └── settings.tsx
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── projects/
│   │   └── workspace/
│   ├── features/
│   │   ├── home/
│   │   ├── projects/
│   │   ├── agent/
│   │   ├── terminal/
│   │   └── preview/
│   ├── data/
│   │   └── mock/
│   ├── hooks/
│   ├── theme/
│   ├── types/
│   └── utils/
├── assets/
├── docs/
├── tests/
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

### Future monorepo direction (not required in Phase 1)

``` text
/
├── apps/
│   └── mobile/
├── services/
│   ├── api/
│   ├── workspace-manager/
│   ├── agent-orchestrator/
│   └── preview-gateway/
├── packages/
│   ├── contracts/
│   └── shared-types/
├── infrastructure/
│   └── aws/
└── docs/
```

Do not migrate to a monorepo just for the sake of matching this example.
Revisit the structure when backend services are introduced.

------------------------------------------------------------------------

## 18. Testing Strategy

### Phase 1

-   TypeScript type checking.
-   Linting and formatting checks.
-   Component tests for shared UI components where useful.
-   Navigation tests for core routes where practical.
-   Manual launch and interaction checks on iOS and Android.
-   Check keyboard behavior and safe-area layout.
-   Check small-screen layout and long project names.

### Later phases

-   Backend unit and integration tests.
-   API authorization tests.
-   Workspace isolation tests.
-   GitHub integration tests.
-   AI tool permission and cancellation tests.
-   WebSocket reconnect tests.
-   Preview access-control tests.
-   End-to-end tests for the main project lifecycle.
-   Load and cost tests for workspace provisioning.

------------------------------------------------------------------------

## 19. Definition of Done

A phase is not complete merely because the code has been written.

For each phase, the coding agent must:

1.  Implement the agreed scope.
2.  Run relevant formatting, linting, type checks, and tests.
3.  Validate the feature in the target environment.
4.  Update the README and technical documentation.
5.  Document configuration variables without committing secrets.
6.  List known limitations and unimplemented behavior.
7.  Report any architecture decisions or deviations.
8.  Provide reproducible commands for the product owner to run.
9.  Stop and request review before beginning the next phase.

------------------------------------------------------------------------

## 20. Immediate Execution Checklist for the Coding Agent

**Start here. Do not implement later phases yet.**

1.  Inspect the repository and report its current structure.
2.  Confirm the available Node.js, package manager, Expo tooling, and
    simulator/emulator setup.
3.  Initialize or adapt the Expo React Native TypeScript project.
4.  Configure iOS and Android targets.
5.  Set up Expo Router and the five primary navigation destinations.
6.  Add the basic screens and project detail route.
7.  Add typed mock data in a separate module.
8.  Add reusable UI components and minimal design tokens.
9.  Add clearly labelled placeholders for GitHub, AI, cloud workspace,
    terminal, editor, and preview integrations.
10. Add README setup instructions.
11. Run lint, type-check, and tests.
12. Validate iOS and Android launch/build as far as the environment
    allows.
13. Report results and stop for product-owner UI review.

### Final instruction

**Do not proceed to Phase 2 until the product owner has reviewed the
Phase 1 UI and explicitly approved the next step.**

The product owner intends to provide detailed UI requirements after
seeing the basic app. Keep the initial UI easy to modify: use reusable
components, centralized theme tokens, and clean screen separation. The
initial UI is a functional scaffold, not the final visual design.
