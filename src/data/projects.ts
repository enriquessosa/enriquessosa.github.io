// Keep this order for the homepage and project index.
export const projects = [
  {
    slug: 'pulse',
    name: 'Pulse',
    repository: 'https://github.com/enriquessosa/pulse-systemd',
    description: 'A read-only terminal interface for inspecting local systemd services, properties, and recent journal entries.',
    technologies: ['Rust', 'Ratatui', 'Crossterm', 'systemd'],
    purpose: 'Bring service states, properties, and logs into one keyboard-driven interface for inspecting a local Linux system.',
    features: [
      'Browse system and user services with search and scope or state filters.',
      'Inspect service properties and bounded recent journal entries, with scrolling and horizontal panning.',
      'Refresh manually while retaining selection and showing previous data as stale when a refresh fails.',
    ],
    technicalDetails: 'Pulse invokes systemctl and journalctl with explicit arguments. Separate modules handle UI state, rendering, parsing, and subprocess execution. Background workers bound command output and reject obsolete results. It requires Linux with systemd and does not control services, follow logs, or inspect remote hosts.',
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    repository: 'https://github.com/enriquessosa/atlas',
    description: 'A local-first command-line tool for exploring Rust repository structure and source-backed dependency relationships.',
    technologies: ['Rust', 'Clap', 'syn', 'Serde', 'Cargo'],
    purpose: 'Make it easier to explore a Rust repository and trace reported structural relationships back to source evidence.',
    features: [
      'Inspect workspace packages, modules, definitions, imports, and re-exports.',
      'Query components and dependencies, find shortest dependency paths, and report cycles in module or package graphs.',
      'Export JSON containing source locations, symbolic conditions, analysis status, and diagnostics.',
    ],
    technicalDetails: 'Atlas uses offline Cargo metadata to discover workspace packages and target roots, then follows explicit Rust module declarations and parses source with syn. Resolution is conservative: ambiguous or unsupported relationships remain unresolved. It does not expand macros, perform compiler-equivalent type resolution, or infer runtime call paths.',
  },
  {
    slug: 'drift',
    name: 'Drift',
    repository: 'https://github.com/enriquessosa/drift',
    description: 'A Linux system auditing CLI that records local observations and compares snapshots to help investigate changes.',
    technologies: ['Rust', 'Clap', 'Serde', 'SQLite / rusqlite', 'TOML'],
    purpose: 'Help investigate changes in local system state while keeping confirmed differences separate from incomplete or incompatible evidence.',
    features: [
      'Collect system service states, TCP listeners, and metadata for explicitly configured file paths.',
      'Save snapshots in a local SQLite database and compare historical observations.',
      'Perform limited NixOS declared-state checks when supported evidence is available, with optional findings for investigation.',
    ],
    technicalDetails: 'Separate modules handle CLI parsing, TOML configuration, collectors, persistence, comparison, and reporting. Observations retain collector status and scope; incomplete or incompatible evidence produces indeterminate comparisons. Collection does not modify services or read monitored file contents, but snapshot creation writes to its own database. Findings are investigation prompts, not proof of compromise or system health.',
  },
];
