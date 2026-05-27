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
          <p><b>Caution:</b> {resource.caution}</p>
          <p><b>Primary layer:</b> {resource.primary} · <b>Scope:</b> {resource.scope} · <b>Type:</b> {resource.type}</p>
        </div>
      </section>

      <section className="section review">
        <div className="reviewShell">
          <div>
            <p className="eyebrow">Layer coverage</p>
            <h2>Where this tool fits.</h2>
            <p>
              This is a v0 review from the first evidence pass. It maps public positioning against observed failure modes. Hands-on benchmarks and deeper source citations should come next.
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
    </main>
  );
}
