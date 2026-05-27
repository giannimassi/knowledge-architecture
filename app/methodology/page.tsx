import Link from "next/link";

const workflow = [
  "Detect source: GitHub, RSS/newsletter, arXiv, Semantic Scholar, HN/social, or manual submission.",
  "Canonicalize identity and dedupe aliases, forks, papers, launch posts, and product pages.",
  "Snapshot evidence with source URL, fetched date, content hash, trust level, and quote/span where public.",
  "Extract claims, features, benchmark numbers, relationships, caveats, and failure reports.",
  "Classify against the knowledge stack: Production, Curation, Storage, Activation, Governance.",
  "Draft the review with citations, confidence, model signature, strengths, limitations, best-for, avoid-if, and open questions.",
  "Human approves final scores, rankings, superiority claims, public criticism, and publication.",
  "Publish page, matrix cells, graph edges, changelog, and stale-review watch state."
];

const reviewFields = [
  "Summary and verdict",
  "Canonical URL and source links",
  "Model signature",
  "Layer coverage scorecard",
  "Dimension assessment",
  "Evidence packet",
  "Strengths and limitations",
  "Best for / avoid if",
  "Open questions",
  "Related tools, papers, benchmarks",
  "Benchmark numbers plus benchmark critique",
  "Update history"
];

const failureSources = [
  "GitHub issues and discussions across agent memory, RAG, MCP, coding-agent, and graph-memory repos",
  "Reddit, Hacker News, blogs, launch posts, changelogs, and vendor troubleshooting docs",
  "arXiv / Semantic Scholar limitation sections and benchmark critiques",
  "Stack Overflow / StackExchange questions",
  "Public support and community threads where quoting is allowed",
  "Private/internal patterns only as calibration, never as public evidence"
];

export const metadata = {
  title: "Review methodology | Knowledge Architecture",
  description: "How Knowledge Architecture reviews tools, gathers evidence, scores layers, and keeps reviews fresh.",
};

export default function MethodologyPage() {
  return (
    <main>
      <nav className="nav" aria-label="Primary">
        <Link className="brand" href="/">Knowledge Architecture</Link>
        <div className="navLinks">
          <Link href="/#model">Model</Link>
          <Link href="/#failures">Failures</Link>
          <Link href="/#map">Tools</Link>
        </div>
      </nav>

      <section className="section toolHero">
        <p className="eyebrow">Review methodology</p>
        <h1>The review loop is the product.</h1>
        <p className="lede">
          The site should not become a link directory. Every public review needs evidence, model mapping, explicit confidence, benchmark critique, and an update path.
        </p>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Review loop</p>
          <h2>From source signal to published verdict.</h2>
        </div>
        <div className="methodSteps">
          {workflow.map((step, i) => (
            <article className="methodStep" key={step}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section failureSection">
        <div className="sectionHeader">
          <p className="eyebrow">Review page contract</p>
          <h2>Every tool page should carry the same packet.</h2>
        </div>
        <div className="packetGrid">
          {reviewFields.map((field) => <article className="packetCard" key={field}><h3>{field}</h3></article>)}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Failure research branch</p>
          <h2>Homepage failures must come from public pain.</h2>
        </div>
        <div className="copyBlock">
          <p>The failure section should be driven by a recurring evidence ledger, not plausible examples. The watcher should emit only meaningful changes: new high-signal clusters, ranking changes, fresh examples, or reviews needing editorial attention.</p>
          <ul className="sourceList">
            {failureSources.map((source) => <li key={source}>{source}</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
