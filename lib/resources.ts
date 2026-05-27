export type LayerName = "Production" | "Curation" | "Storage" | "Context Assembly" | "Governance";

export type Resource = {
  name: string;
  slug: string;
  type: string;
  primary: LayerName;
  scope: string;
  verdict: string;
  score: number;
  externalUrl: string;
  reviewStatus: "provisional profile" | "stub";
  bestFor: string;
  caution: string;
  evidence: string[];
  layerScores: Partial<Record<LayerName, number>>;
};

export const resources: Resource[] = [
  {
    name: "Letta / MemGPT",
    slug: "letta-memgpt",
    type: "Tool",
    primary: "Context Assembly",
    scope: "agent",
    verdict: "Strong agent-state framing. Good fit when you need explicit agent memory blocks, persona/state management and inspectable long-running agents.",
    score: 76,
    externalUrl: "https://www.letta.com/",
    reviewStatus: "provisional profile",
    bestFor: "Agent-state experiments where memory must be visible and editable rather than implicit in prompts.",
    caution: "Still needs external discipline for provenance, deletion, lifecycle and cross-user governance.",
    evidence: [
      "The research pass mapped Letta primarily to context assembly: what gets assembled into the working context, when, and as what kind of state.",
      "Failure modes to test: hidden stale state, unclear memory authority, and weak audit trail from source event to assembled context.",
      "Profile depth is provisional: based on public positioning/docs and known memory-failure clusters, not a hands-on benchmark or citation-bound review yet."
    ],
    layerScores: { Production: 46, Curation: 52, Storage: 68, "Context Assembly": 86, Governance: 58 }
  },
  {
    name: "Mem0",
    slug: "mem0",
    type: "Tool",
    primary: "Storage",
    scope: "personal/team",
    verdict: "Practical memory layer with strong adoption signal. The core review question is whether it avoids junk accumulation, stale facts and weak overwrite semantics.",
    score: 70,
    externalUrl: "https://mem0.ai/",
    reviewStatus: "provisional profile",
    bestFor: "Apps that want a packaged user/team memory layer faster than building extraction, storage and retrieval from scratch.",
    caution: "Automatic extraction can create epistemic debt unless writes, corrections, deletions and confidence are governed explicitly.",
    evidence: [
      "Research loop flagged junk memory accumulation and stale/contradictory memory as recurring pain around auto-memory systems.",
      "Mem0 is included because it is one of the most visible production-oriented memory products and has an OpenMemory/MCP surface.",
      "Needs hands-on testing for dedupe, contradiction handling, delete behavior, source metadata and retrieval precision."
    ],
    layerScores: { Production: 58, Curation: 62, Storage: 82, "Context Assembly": 70, Governance: 56 }
  },
  {
    name: "Zep / Graphiti",
    slug: "zep-graphiti",
    type: "Tool",
    primary: "Curation",
    scope: "app",
    verdict: "Temporal graph direction is highly relevant for memory that changes. Strong candidate for contradiction, entity and lifecycle-heavy applications.",
    score: 78,
    externalUrl: "https://github.com/getzep/graphiti",
    reviewStatus: "provisional profile",
    bestFor: "Applications where entity relationships and time matter more than flat semantic recall.",
    caution: "Graph structure helps, but does not automatically solve write authority, bad extraction, privacy boundaries or review workflows.",
    evidence: [
      "Research pass identified temporal conflict, supersession and provenance as central failures in agent memory.",
      "Graphiti is mapped to curation because temporal/entity modeling can represent evolving facts better than append-only memories.",
      "Needs hands-on tests for deletion, conflict reconciliation, provenance visibility and graph drift."
    ],
    layerScores: { Production: 55, Curation: 86, Storage: 80, "Context Assembly": 68, Governance: 60 }
  },
  {
    name: "Microsoft GraphRAG",
    slug: "microsoft-graphrag",
    type: "System",
    primary: "Curation",
    scope: "corpus",
    verdict: "Useful corpus structuring for large bodies of text. Best viewed as a curation/indexing architecture, not an agent memory product by itself.",
    score: 74,
    externalUrl: "https://github.com/microsoft/graphrag",
    reviewStatus: "provisional profile",
    bestFor: "Teams building corpus-level knowledge maps where relationship extraction and global summaries matter.",
    caution: "Graph rebuild cost, update/delete lifecycle, source authority and retrieval mismatch remain open architecture questions.",
    evidence: [
      "Research pass included GraphRAG-style retrieval mismatch: correct knowledge exists, but retrieval returns wrong chunks or unverifiable summaries.",
      "Mapped to curation because it transforms corpus material into graph/community summaries rather than managing live agent memory.",
      "Needs evaluation on incremental updates, provenance, stale summaries and operational cost."
    ],
    layerScores: { Production: 64, Curation: 84, Storage: 72, "Context Assembly": 62, Governance: 54 }
  },
  {
    name: "LangGraph / LangMem",
    slug: "langgraph-langmem",
    type: "Framework",
    primary: "Context Assembly",
    scope: "agent",
    verdict: "Useful control plane for stateful workflows. Memory quality depends on the surrounding curation and governance policy.",
    score: 66,
    externalUrl: "https://langchain-ai.github.io/langgraph/",
    reviewStatus: "provisional profile",
    bestFor: "Builders who already want graph-shaped agent control flow and need memory hooks inside repeatable workflows.",
    caution: "Framework control does not equal knowledge architecture. You still need source typing, promotion rules and deletion semantics.",
    evidence: [
      "Research pass treats LangGraph/LangMem as context assembly infrastructure: when and how state enters the working context.",
      "Failure modes to test include state leakage across threads, accidental context assembly and weak observability of retrieved memory.",
      "Needs hands-on review against multi-session, multi-user and privacy-boundary scenarios."
    ],
    layerScores: { Production: 58, Curation: 54, Storage: 60, "Context Assembly": 82, Governance: 50 }
  },
  {
    name: "LlamaIndex",
    slug: "llamaindex",
    type: "Data framework",
    primary: "Production",
    scope: "corpus",
    verdict: "Strong ingestion and indexing primitives. It helps produce retrievable knowledge objects, but governance and context assembly remain system responsibilities.",
    score: 64,
    externalUrl: "https://www.llamaindex.ai/",
    reviewStatus: "provisional profile",
    bestFor: "Document/corpus pipelines where connectors, parsing, indexing and query abstractions matter.",
    caution: "Chunking and retrieval are not enough. Source authority, freshness, privacy and lifecycle need explicit design.",
    evidence: [
      "Research pass mapped retrieval mismatch and missing metadata as major failures for RAG-style systems.",
      "LlamaIndex is mapped to production because ingestion, parsing and indexing shape what can later be known.",
      "Needs review for chunk provenance, metadata discipline, update/delete workflows and ranking policy."
    ],
    layerScores: { Production: 82, Curation: 58, Storage: 70, "Context Assembly": 62, Governance: 44 }
  },
  {
    name: "OpenMemory MCP",
    slug: "openmemory-mcp",
    type: "Tool",
    primary: "Governance",
    scope: "personal",
    verdict: "Helpful direction: expose memory through a controllable tool surface rather than hiding it inside model behavior.",
    score: 67,
    externalUrl: "https://github.com/mem0ai/mem0/tree/main/openmemory",
    reviewStatus: "provisional profile",
    bestFor: "Personal/workspace memory where users need to see and manage what the agent can remember.",
    caution: "A tool surface is only the start. Authority, review, deletion, cross-app boundaries and audit must be explicit.",
    evidence: [
      "Research pass highlighted governance failures: bad writes, poisoning and privacy boundary leaks become persistent risks.",
      "OpenMemory MCP is mapped to governance because MCP makes memory an inspectable capability with explicit tool calls.",
      "Needs hands-on testing for permission boundaries, deletion behavior, source metadata and UX for correction."
    ],
    layerScores: { Production: 48, Curation: 56, Storage: 72, "Context Assembly": 66, Governance: 78 }
  },
  {
    name: "MCP memory servers",
    slug: "mcp-memory-servers",
    type: "Protocol/tooling",
    primary: "Governance",
    scope: "tool",
    verdict: "Promising interface layer. The core question is who can write, what gets stored, and when memory enters the working context.",
    score: 68,
    externalUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
    reviewStatus: "provisional profile",
    bestFor: "Teams standardizing memory access as a tool rather than as hidden model-side state.",
    caution: "Protocol shape does not solve memory quality. Server policy must handle source, scope, freshness and deletion.",
    evidence: [
      "Research pass included MCP because agent builders are converging on tool-mediated memory and context access.",
      "Mapped to governance because MCP creates explicit capability boundaries and auditable calls.",
      "Needs comparison across server implementations: write policy, storage substrate, correction UX and context assembly rules."
    ],
    layerScores: { Production: 44, Curation: 50, Storage: 64, "Context Assembly": 72, Governance: 80 }
  },
  {
    name: "Cline memory-bank",
    slug: "cline-memory-bank",
    type: "Repo pattern",
    primary: "Storage",
    scope: "repo",
    verdict: "Useful project-scoped convention. Strong because it is human-readable, weak if it becomes stale project lore without promotion discipline.",
    score: 62,
    externalUrl: "https://github.com/cline/memory-bank",
    reviewStatus: "provisional profile",
    bestFor: "Coding-agent projects where repo-local context should be inspectable and versioned with the work.",
    caution: "Files are easy to inspect but easy to rot. Context assembly and freshness checks need process support.",
    evidence: [
      "Research pass treats file-based memory as useful for auditability and human correction.",
      "Mapped to storage because the central move is canonical, readable project records rather than embeddings or hidden state.",
      "Needs tests for update discipline, stale instruction detection, promotion from chat to files and conflict handling."
    ],
    layerScores: { Production: 52, Curation: 48, Storage: 82, "Context Assembly": 54, Governance: 64 }
  },
  {
    name: "Chroma",
    slug: "chroma",
    type: "Vector DB",
    primary: "Storage",
    scope: "app",
    verdict: "Useful embedding store. It is infrastructure for recall, not a complete memory architecture.",
    score: 58,
    externalUrl: "https://www.trychroma.com/",
    reviewStatus: "provisional profile",
    bestFor: "Builders who need a straightforward vector substrate and will build source, curation and governance around it.",
    caution: "Similarity search can accidentally become policy. Authority, freshness, privacy and deletion must live above the vector DB.",
    evidence: [
      "Research pass flagged retrieval mismatch as a recurring vector/RAG failure: similar is not always relevant, true or authorized.",
      "Mapped to storage because Chroma provides substrate, not end-to-end knowledge lifecycle.",
      "Needs review for metadata filtering, delete/update behavior, multi-tenant isolation and observability."
    ],
    layerScores: { Production: 46, Curation: 42, Storage: 78, "Context Assembly": 54, Governance: 38 }
  }
];

export const layers: LayerName[] = ["Production", "Curation", "Storage", "Context Assembly", "Governance"];
export const resourcesBySlug = Object.fromEntries(resources.map((resource) => [resource.slug, resource]));
