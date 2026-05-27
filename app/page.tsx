"use client";

import { useMemo, useState } from "react";

type LayerName = "Production" | "Curation" | "Storage" | "Activation" | "Governance";
type Resource = {
  name: string;
  type: string;
  primary: LayerName;
  scope: string;
  verdict: string;
  score: number;
  url: string;
};
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
  aspects: Aspect[];
};

const resources: Resource[] = [
  { name: "Letta / MemGPT", type: "Tool", primary: "Activation", scope: "agent", verdict: "Strong agent-state framing. Needs sharper governance and lifecycle comparisons.", score: 76, url: "https://www.letta.com/" },
  { name: "Mem0", type: "Tool", primary: "Storage", scope: "personal/team", verdict: "Practical memory layer. Review should separate recall quality from authority handling.", score: 70, url: "https://mem0.ai/" },
  { name: "Zep / Graphiti", type: "Tool", primary: "Curation", scope: "app", verdict: "Temporal graph direction is relevant. Evaluate contradiction and expiry mechanics.", score: 78, url: "https://github.com/getzep/graphiti" },
  { name: "Microsoft GraphRAG", type: "System", primary: "Curation", scope: "corpus", verdict: "Good corpus structuring. Less focused on persistent agent policy and governance.", score: 74, url: "https://github.com/microsoft/graphrag" },
  { name: "Cline memory-bank", type: "Repo pattern", primary: "Storage", scope: "repo", verdict: "Useful project-scoped convention. Needs activation and freshness discipline.", score: 62, url: "https://github.com/cline/memory-bank" },
  { name: "Memory Palace systems", type: "Concept", primary: "Storage", scope: "personal", verdict: "Powerful metaphor for recall, but risks reinforcing the wrong primitive.", score: 48, url: "https://en.wikipedia.org/wiki/Method_of_loci" },
  { name: "LongMem / long-context evals", type: "Benchmark", primary: "Activation", scope: "task", verdict: "Often tests recall under context pressure, not full knowledge architecture.", score: 55, url: "https://arxiv.org/abs/2306.07174" },
  { name: "MCP memory servers", type: "Protocol/tooling", primary: "Governance", scope: "tool", verdict: "Promising interface layer. Needs policies for who can write and when to activate.", score: 68, url: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory" },
  { name: "Chroma", type: "Vector DB", primary: "Storage", scope: "app", verdict: "Useful embedding store. Architecture still needs source authority, curation and activation policy.", score: 58, url: "https://www.trychroma.com/" },
  { name: "LangGraph", type: "Agent framework", primary: "Activation", scope: "agent", verdict: "Good control plane for stateful workflows. Memory quality depends on the surrounding architecture.", score: 66, url: "https://langchain-ai.github.io/langgraph/" },
  { name: "LlamaIndex", type: "Data framework", primary: "Production", scope: "corpus", verdict: "Strong ingestion and indexing primitives. Needs governance and long-term lifecycle discipline around use.", score: 64, url: "https://www.llamaindex.ai/" },
  { name: "OpenMemory MCP", type: "Tool", primary: "Governance", scope: "personal", verdict: "Helpful direction: memory exposed as a controllable tool surface rather than hidden model behavior.", score: 67, url: "https://github.com/mem0ai/mem0/tree/main/openmemory" },
];

const toolLinks = Object.fromEntries(resources.map((r) => [r.name, r.url]));

const layers: Layer[] = [
  {
    name: "Production",
    short: "Capture",
    text: "Where knowledge originates: users, agents, papers, repos, workflows, sensors, markets.",
    principle: "A knowledge system starts before storage. It needs to know what kind of source produced the claim, under what context, and whether the source is allowed to become durable.",
    aspects: [
      { name: "Ingestion", role: "Turn raw streams into structured candidates.", failure: "Everything enters as untyped text blobs.", tools: ["LlamaIndex", "LangGraph", "Mem0"] },
      { name: "Source contracts", role: "Separate user preference, observed behavior, document evidence, tool output and agent inference.", failure: "Guesses become indistinguishable from facts.", tools: ["Letta / MemGPT", "MCP memory servers", "OpenMemory MCP"] },
      { name: "Provenance", role: "Attach URL, message, file, commit, author and timestamp metadata to every durable claim.", failure: "The agent remembers but cannot show why it believes something.", tools: ["Zep / Graphiti", "Microsoft GraphRAG", "LlamaIndex"] },
    ],
  },
  {
    name: "Curation",
    short: "Trust",
    text: "Dedupe, classify, compress, cite, normalize, reconcile contradictions, promote durable artifacts.",
    principle: "Curation is the difference between a heap of memories and a maintained collection. It decides what is redundant, stale, contradictory, promoted, or rejected.",
    aspects: [
      { name: "Deduplication", role: "Merge repeated facts, aliases and near-duplicate observations before they fragment context.", failure: "The agent retrieves five versions of the same thing and treats each as independent evidence.", tools: ["Mem0", "Zep / Graphiti", "Microsoft GraphRAG", "Chroma"] },
      { name: "Classification", role: "Place knowledge into the right layer, topic, project, person, policy or artifact type.", failure: "Personal facts, project state and research notes compete in one global bucket.", tools: ["LlamaIndex", "LangGraph", "MCP memory servers"] },
      { name: "Compression", role: "Distill transcripts and documents into durable claims without erasing caveats.", failure: "Summaries lose the conditions that made the statement true.", tools: ["Microsoft GraphRAG", "Letta / MemGPT", "LongMem / long-context evals"] },
      { name: "Contradiction handling", role: "Detect conflicts, preserve competing claims and request authority instead of silently overwriting.", failure: "Newest memory wins even when it is weaker evidence.", tools: ["Zep / Graphiti", "Microsoft GraphRAG", "OpenMemory MCP"] },
      { name: "Promotion", role: "Move useful working context into a canonical artifact when it becomes stable.", failure: "A chat summary pretends to be a spec, policy or profile.", tools: ["Cline memory-bank", "MCP memory servers", "Letta / MemGPT"] },
    ],
  },
  {
    name: "Storage",
    short: "Place",
    text: "Files, graphs, vectors, databases, archives, repos, canonical records, snapshots.",
    principle: "Storage is plural. Different knowledge forms want different substrates: append-only logs, canonical files, vector recall, temporal graphs, relational records and human-readable archives.",
    aspects: [
      { name: "Canonical records", role: "Store stable knowledge where humans and agents can both inspect and edit it.", failure: "Important facts live only in hidden embeddings.", tools: ["Cline memory-bank", "MCP memory servers", "OpenMemory MCP"] },
      { name: "Vector recall", role: "Retrieve semantically related context when wording is uncertain.", failure: "Similarity becomes the only notion of relevance.", tools: ["Chroma", "Mem0", "LlamaIndex"] },
      { name: "Temporal graph", role: "Represent entities, relationships and changes over time.", failure: "The system cannot answer what changed or which fact superseded another.", tools: ["Zep / Graphiti", "Microsoft GraphRAG", "Memory Palace systems"] },
      { name: "Snapshots and archives", role: "Preserve old states for audit, reproducibility and rollback.", failure: "The architecture forgets why a belief changed.", tools: ["Cline memory-bank", "Microsoft GraphRAG", "MCP memory servers"] },
    ],
  },
  {
    name: "Activation",
    short: "Use",
    text: "Route the right knowledge into the right context at the right time, within budget and policy.",
    principle: "Knowledge only matters when activated into a task. The hard question is not whether something exists, but whether it should enter this prompt, tool call, job or human message now.",
    aspects: [
      { name: "Context routing", role: "Select knowledge by task, thread, project, person, account and risk level.", failure: "The agent either misses context or leaks unrelated context into every task.", tools: ["Letta / MemGPT", "LangGraph", "MCP memory servers"] },
      { name: "Retrieval policy", role: "Rank candidates by relevance, authority, freshness, privacy and cost.", failure: "Top-k semantic search decides policy by accident.", tools: ["Mem0", "LlamaIndex", "LongMem / long-context evals"] },
      { name: "Context budgeting", role: "Allocate scarce prompt space across instructions, facts, evidence and working memory.", failure: "Useful evidence is crowded out by stale summaries.", tools: ["LongMem / long-context evals", "Letta / MemGPT", "LangGraph"] },
      { name: "Tool-mediated recall", role: "Expose memory as inspectable tools rather than invisible model behavior.", failure: "The user cannot tell what knowledge was used or correct it.", tools: ["MCP memory servers", "OpenMemory MCP", "Letta / MemGPT"] },
    ],
  },
  {
    name: "Governance",
    short: "Power",
    text: "Authority, privacy, access, audit, lifecycle, revision rights, deprecation and deletion.",
    principle: "Knowledge architecture is political. It assigns write rights, visibility, retention, deletion, correction and cross-boundary movement.",
    aspects: [
      { name: "Authority", role: "Specify who or what is allowed to create, revise, promote or override knowledge.", failure: "Any agent inference can overwrite a durable user preference.", tools: ["MCP memory servers", "OpenMemory MCP", "Letta / MemGPT"] },
      { name: "Privacy boundaries", role: "Prevent personal, work, client and public contexts from bleeding into each other.", failure: "A helpful retrieval becomes an account or confidentiality breach.", tools: ["OpenMemory MCP", "MCP memory servers", "Mem0"] },
      { name: "Auditability", role: "Show what was used, where it came from and why it was activated.", failure: "The agent cannot explain its context trail.", tools: ["Zep / Graphiti", "LangGraph", "Microsoft GraphRAG"] },
      { name: "Lifecycle", role: "Expire, deprecate, refresh, archive or delete knowledge deliberately.", failure: "Memory accumulates until it becomes epistemic debt.", tools: ["Mem0", "Zep / Graphiti", "Cline memory-bank"] },
    ],
  },
];

const dimensions = ["Scope", "Volatility", "Authority", "Lifecycle", "Resource cost"];
const filterOptions = ["All", ...layers.map((l) => l.name)];
const readingLevels = [
  { id: 1, label: "L1", title: "Manifesto", helper: "The category error in one read." },
  { id: 2, label: "L2", title: "Layers", helper: "Five functions and their jobs." },
  { id: 3, label: "L3", title: "Aspects", helper: "The operating checklist inside each layer." },
  { id: 4, label: "L4", title: "Tool map", helper: "Aspect-by-aspect links to existing systems." },
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [depth, setDepth] = useState(1);
  const [activeLayer, setActiveLayer] = useState<LayerName>("Curation");
  const filtered = useMemo(() => resources.filter((r) => filter === "All" || r.primary === filter), [filter]);
  const selectedLayer = layers.find((layer) => layer.name === activeLayer) ?? layers[1];

  return (
    <main>
      <nav className="nav" aria-label="Primary">
        <a className="brand" href="#top">Knowledge Architecture</a>
        <div className="navLinks">
          <a href="#model">Model</a>
          <a href="#ladder">Reading levels</a>
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
            <a className="button primary" href="#ladder">Change reading level</a>
            <a className="button secondary" href="#map">Explore the map</a>
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

      <section id="ladder" className="section ladderSection">
        <div className="sectionHeader horizontal">
          <div>
            <p className="eyebrow">Progressive disclosure</p>
            <h2>Same theory, four reading depths.</h2>
          </div>
          <div className="levelSwitch" aria-label="Choose reading depth">
            {readingLevels.map((level) => (
              <button key={level.id} className={depth === level.id ? "active" : ""} onClick={() => setDepth(level.id)}>
                <span>{level.label}</span>
                {level.title}
              </button>
            ))}
          </div>
        </div>
        <div className="readingDeck">
          <aside className="readingRail">
            {readingLevels.map((level) => (
              <button key={level.id} className={depth === level.id ? "selected" : ""} onClick={() => setDepth(level.id)}>
                <b>{level.title}</b>
                <span>{level.helper}</span>
              </button>
            ))}
          </aside>
          <div className="readingPanel">
            {depth >= 1 && (
              <article className="disclosureBlock levelOne">
                <span className="levelBadge">Level 1</span>
                <h3>The public thesis</h3>
                <p>
                  Memory is the wrong primitive. The useful unit is a knowledge architecture: an evolving system for producing, curating, storing, activating and governing knowledge.
                </p>
              </article>
            )}

            {depth >= 2 && (
              <article className="disclosureBlock">
                <span className="levelBadge">Level 2</span>
                <h3>Layer model</h3>
                <div className="miniLayerGrid">
                  {layers.map((layer) => (
                    <button key={layer.name} className={activeLayer === layer.name ? "active" : ""} onClick={() => setActiveLayer(layer.name)}>
                      <span>{layer.short}</span>
                      {layer.name}
                    </button>
                  ))}
                </div>
                <div className="layerExplainer">
                  <b>{selectedLayer.name}: {selectedLayer.short}</b>
                  <p>{selectedLayer.principle}</p>
                </div>
              </article>
            )}

            {depth >= 3 && (
              <article className="disclosureBlock">
                <span className="levelBadge">Level 3</span>
                <h3>{selectedLayer.name} aspects</h3>
                <div className="aspectGrid">
                  {selectedLayer.aspects.map((aspect) => (
                    <div className="aspectCard" key={aspect.name}>
                      <h4>{aspect.name}</h4>
                      <p>{aspect.role}</p>
                      <small>Failure mode: {aspect.failure}</small>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {depth >= 4 && (
              <article className="disclosureBlock toolMatrixBlock">
                <span className="levelBadge">Level 4</span>
                <h3>Aspect-to-tool map</h3>
                <div className="toolMatrix">
                  {selectedLayer.aspects.map((aspect) => (
                    <div className="toolRow" key={aspect.name}>
                      <div>
                        <b>{aspect.name}</b>
                        <span>{aspect.role}</span>
                      </div>
                      <div className="toolLinks">
                        {aspect.tools.map((tool) => (
                          <a key={tool} href={toolLinks[tool] ?? "#map"} target="_blank" rel="noreferrer">
                            {tool}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>
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
              <h3><a href={r.url} target="_blank" rel="noreferrer">{r.name}</a></h3>
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
