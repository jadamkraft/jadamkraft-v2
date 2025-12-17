export interface GitHubStats {
  status: "online" | "disconnected";
  totalRepos: number;
  latestCommit: {
    message: string;
    date: string;
    url: string;
  } | null;
}

interface GitHubUser {
  public_repos: number;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: {
    commits?: Array<{
      message: string;
      url: string;
    }>;
  };
  repo?: {
    name: string;
  };
}

const FALLBACK_STATS: GitHubStats = {
  status: "disconnected",
  totalRepos: 0,
  latestCommit: null,
};

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  try {
    // Fetch user data to get total public repos
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!userResponse.ok) {
      console.error(
        `GitHub API error (user): ${userResponse.status} ${userResponse.statusText}`
      );
      return FALLBACK_STATS;
    }

    const userData: GitHubUser = await userResponse.json();
    const totalRepos = userData.public_repos || 0;

    // Fetch latest public events to find the most recent commit
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=10`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    let latestCommit: GitHubStats["latestCommit"] = null;

    if (eventsResponse.ok) {
      const events: GitHubEvent[] = await eventsResponse.json();

      // Find the first PushEvent which contains commits
      const pushEvent = events.find((event) => event.type === "PushEvent");

      if (pushEvent?.payload?.commits && pushEvent.payload.commits.length > 0) {
        const commit = pushEvent.payload.commits[0];
        latestCommit = {
          message: commit.message.split("\n")[0], // Get first line of commit message
          date: pushEvent.created_at,
          url: commit.url,
        };
      }
    } else {
      console.error(
        `GitHub API error (events): ${eventsResponse.status} ${eventsResponse.statusText}`
      );
    }

    return {
      status: "online",
      totalRepos,
      latestCommit,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return FALLBACK_STATS;
  }
}
