"use client";

import { useMemo, useState } from "react";

const layers = [
  { name: "Production", short: "Capture", text: "Where knowledge originates: users, agents, papers, repos, workflows, sensors, markets." },
  { name: "Curation", short: "Trust", text: "Dedupe, classify, compress, cite, normalize, reconcile contradictions, promote durable artifacts." },
  { name: "Storage", short: "Place", text: "Files, graphs, vectors, databases, archives, repos, canonical records, snapshots." },
  { name: "Activation", short: "Use", text: "Route the right knowledge into the right context at the right time, within budget and policy." },
  { name: "Governance", short: "Power", text: "Authority, privacy, access, audit, lifecycle, revision rights, deprecation and deletion." },
];

const resources = [
  { name: "Letta / MemGPT", type: "Tool", primary: "Activation", scope: "agent", verdict: "Strong agent-state framing. Needs sharper governance and lifecycle comparisons.", score: 76 },
  { name: "Mem0", type: "Tool", primary: "Storage", scope: "personal/team", verdict: "Practical memory layer. Review should separate recall quality from authority handling.", score: 70 },
  { name: "Zep / Graphiti", type: "Tool", primary: "Curation", scope: "app", verdict: "Temporal graph direction is relevant. Evaluate contradiction and expiry mechanics.", score: 78 },
  { name: "Microsoft GraphRAG", type: "System", primary: "Curation", scope: "corpus", verdict: "Good corpus structuring. Less focused on persistent agent policy and governance.", score: 74 },
  { name: "Cline memory-bank", type: "Repo pattern", primary: "Storage", scope: "repo", verdict: "Useful project-scoped convention. Needs activation and freshness discipline.", score: 62 },
  { name: "Memory Palace systems", type: "Concept", primary: "Storage", scope: "personal", verdict: "Powerful metaphor for recall, but risks reinforcing the wrong primitive.", score: 48 },
  { name: "LongMem / long-context evals", type: "Benchmark", primary: "Activation", scope: "task", verdict: "Often tests recall under context pressure, not full knowledge architecture.", score: 55 },
  { name: "MCP memory servers", type: "Protocol/tooling", primary: "Governance", scope: "tool", verdict: "Promising interface layer. Needs policies for who can write and when to activate.", score: 68 },
];

const dimensions = ["Scope", "Volatility", "Authority", "Lifecycle", "Resource cost"];
const filterOptions = ["All", ...layers.map((l) => l.name)];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => resources.filter((r) => filter === "All" || r.primary === filter), [filter]);

  return (
    <main>
      <nav className="nav" aria-label="Primary">
        <a className="brand" href="#top">Knowledge Architecture</a>
        <div className="navLinks">
          <a href="#model">Model</a>
          <a href="#map">Map</a>
          <a href="#review">Review</a>
          <a href="#submit">Submit</a>
        </div>
      </nav>

      <section id="top" className="hero section">
        <div className="heroCopy">
          <p className="eyebrow">A public map for agent knowledge systems</p>
          <h1>Your agent doesn&apos;t need memory. It needs a knowledge architecture.</h1>
          <p className="lede">
            The AI memory conversation is asking the wrong question. Humans did not compound knowledge by remembering more. We built documents, libraries, indexes, journals, archives, standards and institutions that made knowledge durable, scoped, governed and useful.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#map">Explore the map</a>
            <a className="button secondary" href="#model">See the model</a>
          </div>
        </div>
        <div className="heroPanel" aria-label="Knowledge evolution diagram">
          <div className="timeline">
            <span>oral memory</span>
            <span>writing</span>
            <span>libraries</span>
            <span>science</span>
            <span>search</span>
            <strong>agent knowledge architecture</strong>
          </div>
          <div className="misframe">
            <span className="label">Misframe</span>
            <b>How do we make agents remember more?</b>
            <span className="arrow">↓</span>
            <span className="label">Better question</span>
            <b>What knowledge infrastructure should agents live inside?</b>
          </div>
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">The category error</p>
          <h2>Memory collapses too many jobs into recall.</h2>
        </div>
        <div className="copyBlock">
          <p>
            A system can store everything and still fail to know what is true, current, private, authoritative, useful, cheap enough to retrieve, or safe to activate. That is not a memory problem. It is an architecture problem.
          </p>
          <p>
            The site reviews tools by the knowledge job they actually perform, not by the label they use in a launch post.
          </p>
        </div>
      </section>

      <section id="model" className="section model">
        <div className="sectionHeader">
          <p className="eyebrow">The model</p>
          <h2>Five functions, not one bucket.</h2>
        </div>
        <div className="layerGrid">
          {layers.map((layer, i) => (
            <article className="layerCard" key={layer.name}>
              <span className="number">0{i + 1}</span>
              <h3>{layer.name}</h3>
              <p className="short">{layer.short}</p>
              <p>{layer.text}</p>
            </article>
          ))}
        </div>
        <div className="dimensions">
          <span>Every review also scores:</span>
          {dimensions.map((d) => <b key={d}>{d}</b>)}
        </div>
      </section>

      <section id="map" className="section mapSection">
        <div className="sectionHeader horizontal">
          <div>
            <p className="eyebrow">Review surface</p>
            <h2>A living map of memory tools, papers and benchmarks.</h2>
          </div>
          <div className="filters" aria-label="Filter resources">
            {filterOptions.map((option) => (
              <button className={filter === option ? "active" : ""} key={option} onClick={() => setFilter(option)}>{option}</button>
            ))}
          </div>
        </div>
        <div className="resourceGrid">
          {filtered.map((r) => (
            <article className="resourceCard" key={r.name}>
              <div className="resourceTop">
                <span>{r.type}</span>
                <b>{r.score}</b>
              </div>
              <h3>{r.name}</h3>
              <p>{r.verdict}</p>
              <div className="chips">
                <span>{r.primary}</span>
                <span>{r.scope}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="review" className="section review">
        <div className="reviewShell">
          <div>
            <p className="eyebrow">Exemplar review</p>
            <h2>Reviews should expose fit, not declare a universal winner.</h2>
            <p>
              Each page binds claims to evidence, maps layer coverage, shows benchmark caveats and names failure modes. Rankings are by use case: personal agents, research agents, code/project agents, team knowledge and governance-heavy environments.
            </p>
          </div>
          <div className="scorecard">
            {layers.map((l, i) => (
              <div className="scoreRow" key={l.name}>
                <span>{l.name}</span>
                <div className="bar"><i style={{ width: `${[62, 74, 88, 70, 38][i]}%` }} /></div>
              </div>
            ))}
            <div className="warning">
              Benchmark note: reported recall numbers are not proof of governance, lifecycle, authority or domain-policy handling.
            </div>
          </div>
        </div>
      </section>

      <section id="submit" className="section submit">
        <div>
          <p className="eyebrow">Builder loop</p>
          <h2>Submit a system. Get it mapped.</h2>
          <p>
            Builders can submit a URL. The pipeline canonicalizes it, collects evidence, drafts a model-bound review, suggests graph relationships and queues the result for editorial approval.
          </p>
        </div>
        <form className="submitBox" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="url">Tool, paper, benchmark or repo URL</label>
          <input id="url" placeholder="https://github.com/example/memory-system" />
          <button type="submit">Request review</button>
          <small>Prototype form. Public submissions will be citation-bound and reviewed before publishing.</small>
        </form>
      </section>

      <footer className="footer">
        <span>Knowledge Architecture</span>
        <span>Production · Curation · Storage · Activation · Governance</span>
      </footer>
    </main>
  );
}
