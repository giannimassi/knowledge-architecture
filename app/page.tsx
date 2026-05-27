"use client";

import { useMemo, useState } from "react";
import { resources, type LayerName } from "../lib/resources";
type Aspect = {
  name: string;
  role: string;
  failure: string;
  tools: string[];
};
type Layer = {
  name: LayerName;
  short: string;
  text: string;
  principle: string;
  example: string;
  aspects: Aspect[];
};
type FailureMode = {
  title: string;
  pain: string;
  text: string;
  example: string;
  layer: LayerName;
};

const layers: Layer[] = [
  {
    name: "Production",
    short: "Capture",
    text: "Where knowledge originates: users, agents, documents, repos, tickets, workflows, sensors and external sources.",
    principle: "A knowledge system starts before storage. It needs to know what produced a claim, under what context, and whether that source is allowed to become durable.",
    example: "How should today's support-ticket triage improve future tickets without turning every throwaway observation into policy?",
    aspects: [
      { name: "Ingestion", role: "Turn raw streams into structured candidates.", failure: "Everything enters as untyped text blobs.", tools: ["LlamaIndex", "LangGraph / LangMem", "Mem0"] },
      { name: "Source type", role: "Separate user preference, observed behavior, document evidence, tool output and agent inference.", failure: "Guesses become indistinguishable from facts.", tools: ["Letta / MemGPT", "MCP memory servers", "OpenMemory MCP"] },
      { name: "Provenance", role: "Attach URL, message, file, commit, author and timestamp metadata to every durable claim.", failure: "The agent remembers but cannot show why it believes something.", tools: ["Zep / Graphiti", "Microsoft GraphRAG", "LlamaIndex"] },
    ],
  },
  {
    name: "Curation",
    short: "Trust",
    text: "Dedupe, classify, compress, cite, normalize, reconcile contradictions and promote durable artifacts.",
    principle: "Curation is the difference between a heap of memories and a maintained collection. It decides what is redundant, stale, contradictory, promoted, or rejected.",
    example: "Should this deployment fix become part of the coding guidelines, an incident note, a test, or nothing durable at all?",
    aspects: [
      { name: "Deduplication", role: "Merge repeated facts, aliases and near-duplicate observations before they fragment context.", failure: "The agent retrieves five versions of the same thing and treats each as independent evidence.", tools: ["Mem0", "Zep / Graphiti", "Microsoft GraphRAG", "Chroma"] },
      { name: "Classification", role: "Place knowledge into the right layer, topic, project, person, policy or artifact type.", failure: "Personal facts, project state and research notes compete in one global bucket.", tools: ["LlamaIndex", "LangGraph / LangMem", "MCP memory servers"] },
      { name: "Compression", role: "Distill transcripts and documents into durable claims without erasing caveats.", failure: "Summaries lose the conditions that made the statement true.", tools: ["Microsoft GraphRAG", "Letta / MemGPT"] },
      { name: "Contradiction handling", role: "Detect conflicts, preserve competing claims and request authority instead of silently overwriting.", failure: "Newest memory wins even when it is weaker evidence.", tools: ["Zep / Graphiti", "Microsoft GraphRAG", "OpenMemory MCP"] },
      { name: "Promotion", role: "Move useful working context into a canonical artifact when it becomes stable.", failure: "A chat summary pretends to be a spec, policy or profile.", tools: ["Cline memory-bank", "MCP memory servers", "Letta / MemGPT"] },
    ],
  },
  {
    name: "Storage",
    short: "Place",
    text: "Files, graphs, vectors, databases, archives, repos, canonical records and snapshots.",
    principle: "Storage is plural. Different knowledge forms want different substrates: append-only logs, canonical files, vector recall, temporal graphs, relational records and human-readable archives.",
    example: "Where should the agent store a repo convention so both humans and future agents can inspect, update and delete it?",
    aspects: [
      { name: "Canonical records", role: "Store stable knowledge where humans and agents can both inspect and edit it.", failure: "Important facts live only in hidden embeddings.", tools: ["Cline memory-bank", "MCP memory servers", "OpenMemory MCP"] },
      { name: "Vector recall", role: "Retrieve semantically related context when wording is uncertain.", failure: "Similarity becomes the only notion of relevance.", tools: ["Chroma", "Mem0", "LlamaIndex"] },
      { name: "Temporal graph", role: "Represent entities, relationships and changes over time.", failure: "The system cannot answer what changed or which fact superseded another.", tools: ["Zep / Graphiti", "Microsoft GraphRAG"] },
      { name: "Snapshots and archives", role: "Preserve old states for audit, reproducibility and rollback.", failure: "The architecture forgets why a belief changed.", tools: ["Cline memory-bank", "Microsoft GraphRAG", "MCP memory servers"] },
    ],
  },
  {
    name: "Activation",
    short: "Use",
    text: "Route the right knowledge into the right context at the right time, within budget and policy.",
    principle: "Knowledge only matters when activated into a task. The hard question is not whether something exists, but whether it should enter this prompt, tool call, job or human message now.",
    example: "Why didn't the agent notice my calendar changed before planning the day?",
    aspects: [
      { name: "Context routing", role: "Select knowledge by task, thread, project, person, account and risk level.", failure: "The agent either misses context or leaks unrelated context into every task.", tools: ["Letta / MemGPT", "LangGraph / LangMem", "MCP memory servers"] },
      { name: "Retrieval policy", role: "Rank candidates by relevance, authority, freshness, privacy and cost.", failure: "Top-k semantic search decides policy by accident.", tools: ["Mem0", "LlamaIndex"] },
      { name: "Context budgeting", role: "Allocate scarce prompt space across instructions, facts, evidence and working memory.", failure: "Useful evidence is crowded out by stale summaries.", tools: ["Letta / MemGPT", "LangGraph / LangMem"] },
      { name: "Tool-mediated recall", role: "Expose memory as inspectable tools rather than invisible model behavior.", failure: "The user cannot tell what knowledge was used or correct it.", tools: ["MCP memory servers", "OpenMemory MCP", "Letta / MemGPT"] },
    ],
  },
  {
    name: "Governance",
    short: "Power",
    text: "Authority, privacy, access, audit, lifecycle, revision rights, deprecation and deletion.",
    principle: "Knowledge architecture assigns write rights, visibility, retention, deletion, correction and cross-boundary movement.",
    example: "Can a memory from one customer, workspace or account ever influence another? Who can prove it did not?",
    aspects: [
      { name: "Authority", role: "Specify who or what is allowed to create, revise, promote or override knowledge.", failure: "Any agent inference can overwrite a durable user preference.", tools: ["MCP memory servers", "OpenMemory MCP", "Letta / MemGPT"] },
      { name: "Privacy boundaries", role: "Prevent personal, work, client and public contexts from bleeding into each other.", failure: "A helpful retrieval becomes an account or confidentiality breach.", tools: ["OpenMemory MCP", "MCP memory servers", "Mem0"] },
      { name: "Auditability", role: "Show what was used, where it came from and why it was activated.", failure: "The agent cannot explain its context trail.", tools: ["Zep / Graphiti", "LangGraph / LangMem", "Microsoft GraphRAG"] },
      { name: "Lifecycle", role: "Expire, deprecate, refresh, archive or delete knowledge deliberately.", failure: "Memory accumulates until it becomes epistemic debt.", tools: ["Mem0", "Zep / Graphiti", "Cline memory-bank"] },
    ],
  },
];

const dimensions = ["Scope", "Volatility", "Authority", "Lifecycle", "Resource cost"];
const filterOptions = ["All", ...layers.map((l) => l.name)];

const failureModes: FailureMode[] = [
  {
    title: "Stale or contradictory memory",
    pain: "Pain signal: very high",
    text: "Append-only memories preserve old truths beside new ones. The agent remembers the change, but not which fact superseded which.",
    example: "The memory says I like coffee and that I stopped liking coffee. Which one wins?",
    layer: "Curation",
  },
  {
    title: "Retrieval mismatch",
    pain: "Pain signal: very high",
    text: "The right knowledge exists, but recall returns zero results, wrong chunks, equal scores, or missing metadata.",
    example: "846 stored messages, but conversation search returns nothing.",
    layer: "Activation",
  },
  {
    title: "Junk memory accumulation",
    pain: "Pain signal: high",
    text: "Automatic memory extraction can fill the system with duplicate, hallucinated, low-salience facts that crowd out useful context.",
    example: "10,134 memories. 224 useful. The rest is a junk drawer with embeddings.",
    layer: "Curation",
  },
  {
    title: "Scope, privacy and poisoning",
    pain: "Pain signal: high severity",
    text: "Persistent memory widens the blast radius. A bad write, wrong tenant boundary, or injected instruction can influence future runs.",
    example: "A bad write today becomes trusted context tomorrow.",
    layer: "Governance",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [activeLayer, setActiveLayer] = useState<LayerName>("Activation");
  const filtered = useMemo(() => resources.filter((r) => filter === "All" || r.primary === filter), [filter]);
  const matrixResources = filtered.slice(0, 6);
  const selectedLayer = layers.find((layer) => layer.name === activeLayer) ?? layers[3];

  return (
    <main>
      <nav className="nav" aria-label="Primary">
        <a className="brand" href="#top">Knowledge Architecture</a>
        <div className="navLinks">
          <a href="#model">Model</a>
          <a href="#failures">Failures</a>
          <a href="#map">Tools</a>
          <a href="/methodology">Methodology</a>
        </div>
      </nav>

      <section id="top" className="hero section">
        <div className="heroCopy">
          <p className="eyebrow">A public map for agent knowledge systems</p>
          <h1>Your agent doesn&apos;t need memory. It needs a knowledge architecture.</h1>
          <p className="lede">
            The AI memory conversation is asking the wrong question. The issue is not whether agents can store more. It is whether they can produce, curate, store, activate and govern knowledge well enough to use it safely.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#model">See the model</a>
            <a className="button secondary" href="#failures">Start with failures</a>
          </div>
        </div>
        <div className="heroPanel" aria-label="Knowledge evolution diagram">
          <div className="timeline compact">
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
          <p className="eyebrow">The diagnosis</p>
          <h2>Recall is not the same as knowing.</h2>
        </div>
        <div className="copyBlock">
          <p>
            A system can store everything and still fail to know what is true, current, private, authoritative, useful, cheap enough to retrieve, or safe to activate.
          </p>
          <p>
            This site reviews tools by the knowledge job they actually perform, not by the word “memory” in a launch post.
          </p>
        </div>
      </section>

      <section id="model" className="section model stackSection">
        <div className="sectionHeader">
          <p className="eyebrow">The knowledge stack</p>
          <h2>Five jobs every agent knowledge system must do.</h2>
          <p className="sectionLead">
            Not five separate taxonomies. One operating model: pick a layer, see what it is responsible for, what can go wrong, and what a review should test.
          </p>
        </div>
        <div className="stackExplorer">
          <div className="stackRail" aria-label="Choose layer">
            {layers.map((layer, i) => (
              <button key={layer.name} className={activeLayer === layer.name ? "active" : ""} onClick={() => setActiveLayer(layer.name)}>
                <span className="number">0{i + 1}</span>
                <b>{layer.name}</b>
                <small>{layer.short}</small>
                <em>{layer.text}</em>
              </button>
            ))}
          </div>
          <article className="stackDetail">
            <span className="levelBadge">{selectedLayer.short}: {selectedLayer.name}</span>
            <h3>{selectedLayer.principle}</h3>
            <div className="practicalExample featuredExample">
              <b>Example question</b>
              <span>{selectedLayer.example}</span>
            </div>
            <div className="checksGrid">
              {selectedLayer.aspects.map((aspect) => (
                <div className="aspectCard" key={aspect.name}>
                  <h4>{aspect.name}</h4>
                  <p>{aspect.role}</p>
                  <small>Failure mode: {aspect.failure}</small>
                </div>
              ))}
            </div>
          </article>
        </div>
        <div className="dimensions">
          <span>Every review also scores:</span>
          {dimensions.map((d) => <b key={d}>{d}</b>)}
        </div>
      </section>

      <section id="failures" className="section failureSection">
        <div className="sectionHeader">
          <p className="eyebrow">Evidence-backed failures</p>
          <h2>The homepage examples should come from real pain.</h2>
          <p className="sectionLead">
            Initial research across GitHub issues, HN, Stack Overflow, forums, vendor docs and papers points to these first clusters. The ranking is provisional and should keep updating.
          </p>
        </div>
        <div className="failureGrid">
          {failureModes.map((mode) => (
            <article className="failureCard" key={mode.title}>
              <div className="failureTop">
                <span>{mode.layer}</span>
                <b>{mode.pain}</b>
              </div>
              <h3>{mode.title}</h3>
              <p>{mode.text}</p>
              <blockquote>{mode.example}</blockquote>
            </article>
          ))}
        </div>
      </section>

      <section id="map" className="section mapSection">
        <div className="sectionHeader horizontal">
          <div>
            <p className="eyebrow">Tool review surface</p>
            <h2>A living map of memory tools and agent knowledge systems.</h2>
          </div>
          <div className="filters" aria-label="Filter resources">
            {filterOptions.map((option) => (
              <button className={filter === option ? "active" : ""} key={option} onClick={() => setFilter(option)}>{option}</button>
            ))}
          </div>
        </div>
        <div className="matrixBlock">
          <div className="matrixIntro">
            <h3>Layer coverage matrix</h3>
            <p>Rows are the knowledge-stack layers. Columns are selected tools. Cells are provisional coverage scores until each review has a full evidence packet.</p>
          </div>
          <div className="coverageMatrix" role="table" aria-label="Tool coverage by knowledge layer">
            <div className="matrixRow matrixHead" role="row">
              <span role="columnheader">Layer</span>
              {matrixResources.map((resource) => <span role="columnheader" key={resource.slug}>{resource.name}</span>)}
            </div>
            {layers.map((layer) => (
              <div className="matrixRow" role="row" key={layer.name}>
                <b role="rowheader">{layer.name}</b>
                {matrixResources.map((resource) => (
                  <a role="cell" href={`/tools/${resource.slug}`} key={resource.slug}>
                    <i style={{ width: `${resource.layerScores[layer.name] ?? 0}%` }} />
                    <span>{resource.layerScores[layer.name] ?? 0}</span>
                  </a>
                ))}
              </div>
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
              <h3><a href={`/tools/${r.slug}`}>{r.name}</a></h3>
              <p>{r.verdict}</p>
              <a className="reviewLink" href={`/tools/${r.slug}`}>Read review →</a>
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
Each tool page should bind claims to evidence, map layer coverage, score layer behavior where justified, show caveats, name failure modes, and keep benchmark numbers separate from architectural evidence. Papers and benchmarks support the review; they are not the first-class map item.
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
        <div className="methodologyCta">
          <span>Missing the review workflow?</span>
          <a className="button secondary" href="/methodology">See the review loop</a>
        </div>
      </section>

      <footer className="footer">
        <span>Knowledge Architecture</span>
        <span>Production · Curation · Storage · Activation · Governance</span>
      </footer>
    </main>
  );
}
