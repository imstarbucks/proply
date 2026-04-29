# Widget — Agent Notes

## Preact, not React
This app uses Preact. The API is compatible but imports differ:
- `import { render } from "preact"` not `react-dom`
- `import { useState, useEffect } from "preact/hooks"` not `react`
- `import { h } from "preact"` if JSX transform is not configured

The `@preact/preset-vite` plugin handles the JSX transform automatically.

## Shadow DOM
The widget mounts inside a Shadow DOM, not directly on `document.body`.
All DOM queries and style injections must target the shadow root, not `document`.

## No index.html
This is a library build — there is no HTML entry point.
The entry is `src/index.ts`, which self-initializes on script load.
