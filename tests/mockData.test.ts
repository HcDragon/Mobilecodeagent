import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { MOCK_PROJECTS } from '../src/data/mock/projects';
import { MOCK_ACTIVITIES } from '../src/data/mock/activity';
import { MOCK_AGENT_CONVERSATIONS } from '../src/data/mock/agent';
import { MOCK_PROJECT_FILES } from '../src/data/mock/files';
import { colors, radius, spacing, typography } from '../src/theme';

describe('CodeNomad Phase 1 - Mock Data Integrity', () => {
  test('Projects contain valid schemas and required properties', () => {
    assert.ok(MOCK_PROJECTS.length >= 3, 'Should have at least 3 mock projects');
    const validStatuses = new Set(['not_started', 'starting', 'running', 'stopped', 'error']);

    for (const project of MOCK_PROJECTS) {
      assert.ok(project.id, 'Project must have an id');
      assert.ok(project.name, 'Project must have a name');
      assert.ok(project.branch, 'Project must have a branch');
      assert.ok(Array.isArray(project.technologies), 'Project must have technologies list');
      assert.ok(validStatuses.has(project.workspaceStatus), `Invalid status: ${project.workspaceStatus}`);
      if (project.lastActivityAt) {
        assert.ok(!isNaN(Date.parse(project.lastActivityAt)), 'Invalid ISO date string');
      }
    }
  });

  test('Activities match known projects and valid timestamps', () => {
    const projectIds = new Set(MOCK_PROJECTS.map((p) => p.id));
    for (const act of MOCK_ACTIVITIES) {
      assert.ok(act.id, 'Activity must have an id');
      assert.ok(projectIds.has(act.projectId), `Unknown project id in activity: ${act.projectId}`);
      assert.ok(!isNaN(Date.parse(act.createdAt)), 'Invalid createdAt ISO date');
    }
  });

  test('AI Conversations contain valid user & assistant roles', () => {
    assert.ok(MOCK_AGENT_CONVERSATIONS['proj-1'], 'Default project conversation exists');
    assert.ok(MOCK_AGENT_CONVERSATIONS['default'], 'Fallback demo conversation exists');

    for (const [key, msgs] of Object.entries(MOCK_AGENT_CONVERSATIONS)) {
      for (const msg of msgs) {
        assert.ok(['user', 'assistant', 'system'].includes(msg.role));
        assert.ok(msg.content.length > 0, 'Message content must not be empty');
      }
    }
  });

  test('Project Files tree is well-formed with valid hierarchy', () => {
    assert.ok(MOCK_PROJECT_FILES.length > 0, 'File tree must not be empty');
    const rootSrc = MOCK_PROJECT_FILES.find((f) => f.name === 'src');
    assert.ok(rootSrc && rootSrc.type === 'directory', 'src directory must exist');
    if (rootSrc) {
      assert.ok(rootSrc.children && rootSrc.children.length > 0, 'src must have children');
    }
  });

  test('Theme tokens are defined and properly structured', () => {
    assert.ok(colors.dark.background, 'Dark background defined');
    assert.ok(colors.dark.surface, 'Dark surface defined');
    assert.ok(colors.dark.tint, 'Dark tint defined');
    assert.ok(colors.dark.status.running, 'Running status color defined');
    assert.ok(colors.dark.status.stopped, 'Stopped status color defined');
    assert.ok(spacing.md, 'Spacing defined');
    assert.ok(radius.md, 'Radius defined');
    assert.ok(typography.size.md, 'Typography defined');
  });
});
