import { FileNode } from '../../types';

export const MOCK_PROJECT_FILES: FileNode[] = [
  {
    id: 'f-root-src',
    name: 'src',
    path: 'src',
    type: 'directory',
    children: [
      {
        id: 'f-components',
        name: 'components',
        path: 'src/components',
        type: 'directory',
        children: [
          {
            id: 'f-hero',
            name: 'Hero.tsx',
            path: 'src/components/Hero.tsx',
            type: 'file',
            language: 'typescript',
            size: 2420,
            contentSample: `import React from 'react';\n\nexport const Hero: React.FC = () => {\n  return (\n    <section className="py-20 px-4 text-center">\n      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">\n        Portable Cloud Development\n      </h1>\n      <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">\n        Build, test, and ship from anywhere with persistent workspaces.\n      </p>\n      <div className="mt-10 flex items-center justify-center gap-x-6">\n        <button className="w-full sm:w-auto rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">\n          Launch Workspace\n        </button>\n      </div>\n    </section>\n  );\n};`,
          },
          {
            id: 'f-nav',
            name: 'Navbar.tsx',
            path: 'src/components/Navbar.tsx',
            type: 'file',
            language: 'typescript',
            size: 1840,
            contentSample: `import React from 'react';\n\nexport const Navbar: React.FC = () => {\n  return (\n    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800">\n      <span className="font-bold text-white">CodeNomad</span>\n    </header>\n  );\n};`,
          },
        ],
      },
      {
        id: 'f-app-tsx',
        name: 'App.tsx',
        path: 'src/App.tsx',
        type: 'file',
        language: 'typescript',
        size: 960,
        contentSample: `import React from 'react';\nimport { Hero } from './components/Hero';\nimport { Navbar } from './components/Navbar';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-slate-900 text-slate-100">\n      <Navbar />\n      <Hero />\n    </div>\n  );\n}`,
      },
      {
        id: 'f-main-tsx',
        name: 'main.tsx',
        path: 'src/main.tsx',
        type: 'file',
        language: 'typescript',
        size: 450,
      },
    ],
  },
  {
    id: 'f-package-json',
    name: 'package.json',
    path: 'package.json',
    type: 'file',
    language: 'json',
    size: 820,
    contentSample: `{\n  "name": "portfolio-web",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}`,
  },
  {
    id: 'f-tsconfig',
    name: 'tsconfig.json',
    path: 'tsconfig.json',
    type: 'file',
    language: 'json',
    size: 320,
  },
  {
    id: 'f-readme',
    name: 'README.md',
    path: 'README.md',
    type: 'file',
    language: 'markdown',
    size: 1200,
    contentSample: `# Portfolio Web\n\nBuilt with React, Vite, and Tailwind CSS.\nManaged via CodeNomad cloud workspace.`,
  },
];

