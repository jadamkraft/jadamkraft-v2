import { FilteredBentoGrid } from "@/components/filtered-bento-grid";
import { fetchGitHubStats } from "@/lib/github";

export default async function HomePage() {
  const githubStats = await fetchGitHubStats("jadamkraft");
  return (
    <main className="mx-auto min-h-dvh w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <FilteredBentoGrid githubStats={githubStats} />
    </main>
  );
}
