---
name: GitHub Stats Integration
overview: Replace the mock "fetching..." text in the Stats module with live GitHub data by implementing a server-side data fetcher that retrieves total public repos and latest commit information, with proper caching and fallback handling.
todos:
  - id: create-github-fetcher
    content: "Create `src/lib/github.ts` with `fetchGitHubStats()` function that fetches user data and latest commit event from GitHub API, includes caching (revalidate: 3600), and returns fallback on error"
    status: completed
  - id: update-page-async
    content: Convert `src/app/page.tsx` HomePage to async function and call `fetchGitHubStats('jadamkraft')` at the top
    status: completed
  - id: update-stats-ui
    content: "Replace mock Stats section content in `src/app/page.tsx` with real data: total repos, latest commit message/date, status indicator (green dot), all styled with mono font"
    status: completed
  - id: add-date-formatting
    content: Add date formatting utility to display commit dates in a readable format (e.g., "Jan 15, 2025" or relative time)
    status: completed
---

# GitHub Stats Integration Plan

## Overview

Replace the placeholder Stats module with live GitHub API data. The implementation will fetch total public repositories and the latest commit message/date, display them with mono font styling, and include a status indicator.

## Architecture

### Data Flow

```
page.tsx (Server Component)
  ↓ async fetchGitHubStats()
  ↓ lib/github.ts
  ↓ GitHub API
  ↓ Return data with fallback
  ↓ Render in Stats BentoItem
```

## Implementation Steps

### 1. Create GitHub Data Fetcher (`src/lib/github.ts`)

Create a new utility file that handles GitHub API interactions:

- **Function**: `fetchGitHubStats(username: string)`
- **API Endpoints**:
  - `GET https://api.github.com/users/jadamkraft` - Get user info (includes `public_repos`)
  - `GET https://api.github.com/users/jadamkraft/events/public?per_page=1` - Get latest public event (commit)
- **Caching**: Use Next.js `fetch` with `{ next: { revalidate: 3600 } }` for 1-hour cache
- **Error Handling**: Return a fallback object if any fetch fails:
  ```typescript
  {
    status: 'disconnected',
    totalRepos: 0,
    latestCommit: null
  }
  ```

- **Type Safety**: Define `GitHubStats` interface with:
  - `status: 'online' | 'disconnected'`
  - `totalRepos: number`
  - `latestCommit: { message: string; date: string; url: string } | null`

**Note**: The GitHub Events API returns activity events. We'll extract commit events and get the commit message from the event payload. If no commit events are found, we can fall back to fetching from a specific repository or show "No recent commits".

### 2. Update Home Page (`src/app/page.tsx`)

- Convert `HomePage` to an async function: `export default async function HomePage()`
- Call `fetchGitHubStats('jadamkraft')` at the top of the component
- Pass the data to the Stats section
- Update the Stats BentoItem content to:
  - Display total repos with mono font: `font-mono` class
  - Display latest commit message and formatted date
  - Add a status indicator (green dot when `status === 'online'`)
  - Keep the terminal-style aesthetic with the `$ github contributions --year 2025` prompt

### 3. Status Indicator Component

Add a small visual indicator in the Stats card:

- Green dot (using Tailwind classes like `bg-green-500` or theme color) when online
- Position it near the title or as part of the data display
- Use a small circle: `<span className="inline-block size-2 rounded-full bg-green-500" />`

### 4. Styling Updates

- Ensure all data values use `font-mono` class (already applied to the container)
- Format dates using `Intl.DateTimeFormat` or a simple date formatter
- Maintain the terminal/command-center aesthetic with proper spacing

## Files to Modify

1. **Create**: `src/lib/github.ts` - GitHub API fetcher with caching and error handling
2. **Modify**: `src/app/page.tsx` - Make async, fetch data, update Stats section

## Error Handling Strategy

- If GitHub API is unavailable or rate-limited, return fallback data
- UI should never crash - always show something (even if it's "Status: Disconnected")
- Log errors server-side but don't expose them to the client

## Caching Strategy

- Use Next.js built-in fetch caching with `revalidate: 3600` (1 hour)
- This prevents hitting GitHub rate limits (60 requests/hour for unauthenticated)
- Data will be fresh enough for a portfolio site while being respectful to GitHub's API

## Testing Considerations

- Test with valid GitHub username
- Test with network failure (should show fallback)
- Verify caching works (check Network tab)
- Ensure status indicator shows correctly