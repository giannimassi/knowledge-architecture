import Link from "next/link";
import { notFound } from "next/navigation";
import { layers, resources, resourcesBySlug } from "../../../lib/resources";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resourcesBySlug[slug];
  if (!resource) return {};
  return {
    title: `${resource.name} review | Knowledge Architecture`,
    description: resource.verdict,
  };
}

export default async function ToolReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resourcesBySlug[slug];
  if (!resource) notFound();

  return (
    <main>
      <nav className="nav" aria-label="Primary">
        <Link className="brand" href="/">Knowledge Architecture</Link>
        <div className="navLinks">
          <Link href="/#model">Model</Link>
          <Link href="/#failures">Failures</Link>
          <Link href="/#map">Tools</Link>
          <Link href="/methodology">Methodology</Link>
        </div>
      </nav>

      <section className="section toolHero">
        <p className="eyebrow">Tool review · {resource.reviewStatus}</p>
        <h1>{resource.name}</h1>
        <p className="lede">{resource.verdict}</p>
        <div className="heroActions">
          <a className="button primary" href={resource.externalUrl} target="_blank" rel="noreferrer">Visit source</a>
          <Link className="button secondary" href="/#map">Back to tool map</Link>
        </div>
      </section>

      <section className="section split toolSummary">
        <div>
          <p className="eyebrow">Verdict</p>
          <h2>{resource.score}/100</h2>
        </div>
        <div className="copyBlock">
          <p><b>Best for:</b> {resource.bestFor}</p>
          <p><b>Avoid if:</b> you need a fully governed, citation-complete knowledge architecture without adding policy, evidence capture, and review workflow around the tool.</p>
          <p><b>Caution:</b> {resource.caution}</p>
          <p><b>Model signature:</b> {resource.primary} primary · {resource.scope} scope · {resource.type}</p>
        </div>
      </section>

      <section className="section review">
        <div className="reviewShell">
          <div>
            <p className="eyebrow">Layer coverage</p>
            <h2>Where this tool fits.</h2>
            <p>
              This is a v0 review from the first evidence pass. It maps public positioning against observed failure modes. It is not a final score: hands-on benchmarks, source snapshots, and citation-bound claims are still required before stronger conclusions.
            </p>
          </div>
          <div className="scorecard">
            {layers.map((layer) => (
              <div className="scoreRow" key={layer}>
                <span>{layer}</span>
                <div className="bar"><i style={{ width: `${resource.layerScores[layer] ?? 0}%` }} /></div>
              </div>
            ))}
            <div className="warning">
              Review rule: a tool does not get credit for a layer unless it exposes inspectable behavior, not just a marketing claim.
            </div>
          </div>
        </div>
      </section>

      <section className="section failureSection">
        <div className="sectionHeader">
          <p className="eyebrow">Evidence notes</p>
          <h2>What the research loop has applied so far.</h2>
        </div>
        <div className="failureGrid evidenceList">
          {resource.evidence.map((item) => (
            <article className="failureCard" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reviewPacket">
        <div className="sectionHeader">
          <p className="eyebrow">Review packet</p>
          <h2>What a complete review must contain.</h2>
          <p className="sectionLead">This page now exposes the intended review structure, even where the current artifact is still v0.</p>
        </div>
        <div className="packetGrid">
          <article className="packetCard">
            <h3>Canonical source</h3>
            <p><a href={resource.externalUrl} target="_blank" rel="noreferrer">{resource.externalUrl}</a></p>
          </article>
          <article className="packetCard">
            <h3>Strengths</h3>
            <p>{resource.bestFor}</p>
          </article>
          <article className="packetCard">
            <h3>Limitations</h3>
            <p>{resource.caution}</p>
          </article>
          <article className="packetCard">
            <h3>Dimension assessment</h3>
            <p>Scope, volatility, authority, lifecycle, resource economics, interoperability, and evidence quality must each get a rationale and citations before final scoring.</p>
          </article>
          <article className="packetCard">
            <h3>Open questions</h3>
            <ul>
              <li>What can be verified from docs, code, issues, benchmarks, and changelogs?</li>
              <li>Where does the tool fail under stale, contradictory, private, or high-cost knowledge?</li>
              <li>Which claims are vendor claims versus independently observed behavior?</li>
            </ul>
          </article>
          <article className="packetCard">
            <h3>Benchmark critique</h3>
            <p>No benchmark number is accepted as architectural evidence unless it says which layer it tests and what it misses: lifecycle, scope boundaries, authority, context cost, and governance.</p>
          </article>
          <article className="packetCard">
            <h3>Related systems</h3>
            <p>Related tools should be connected by evidence-backed edges: competes with, integrates with, implements concept, evaluated by, or has governance gap.</p>
          </article>
          <article className="packetCard">
            <h3>Update history</h3>
            <p>v0 evidence pass. Stale-review detection and changelog watching are planned before reviews are treated as durable rankings.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
