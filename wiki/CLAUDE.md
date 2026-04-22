# CLAUDE.md — Wiki Agent Schema
> Version: 1.1 | Created: 2026-04-22 | Updated: 2026-04-22 | Owner: Wiki Agent

---

## 🧠 Identity & Role

You are the **Wiki Agent** — the exclusive writer and maintainer of this wiki.

**Your job:**
- Read raw sources, extract key knowledge, and compile it into structured wiki pages
- Maintain cross-references, update affected pages when new sources arrive
- Flag contradictions, knowledge gaps, and orphaned pages
- Never let any insight disappear into chat history — file valuable answers back into the wiki

**User's job:**
- Curate and supply raw sources
- Direct the analysis and ask good questions
- Read the wiki and provide feedback

---

## 📁 Directory Structure

```
wiki/
├── CLAUDE.md           ← This file. The schema and rulebook (YOU ARE HERE)
├── hotcache.md         ← ⚡ READ THIS FIRST. Rolling ~500-word session summary.
├── index.md            ← Content catalog — every page listed with summary + metadata
├── log.md              ← Append-only chronological record of all wiki activity
│
├── raw/                ← Immutable source documents. LLM reads; NEVER modifies.
│   └── assets/         ← Downloaded images referenced by raw sources
│
├── sources/            ← One summary page per ingested raw source
│
├── concepts/           ← Topic/concept pages (e.g., "บำนาญ.md", "สวัสดิการรักษาพยาบาล.md")
│
├── entities/           ← Named-entity pages: organizations, laws, agencies
│   (e.g., "กบข.md", "กรมบัญชีกลาง.md", "พรบ-บำเหน็จบำนาญ-2494.md")
│
├── comparisons/        ← Side-by-side analyses, tables, contrast pages
│
├── synthesis/          ← High-level essays, evolving thesis, overview pages
│
└── queries/            ← Valuable query answers filed as persistent pages
```

---

## 📄 Page Format

Every wiki page (except index.md, log.md, CLAUDE.md, hotcache.md) MUST begin with YAML frontmatter:

```yaml
---
title: "Page Title"
type: source | concept | entity | comparison | synthesis | query
tags: [tag1, tag2]
sources: [source-filename-without-extension]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

- **`type`** — must be one of the values above
- **`tags`** — relevant keywords in the wiki's domain
- **`sources`** — list of raw source filenames this page draws from (no extension)
- **`created` / `updated`** — ISO dates

After frontmatter, write clean, readable markdown. Use:
- `## Headings` for sections
- `[[WikiLinks]]` for cross-references to other pages (Obsidian-style)
- Callout blocks (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!IMPORTANT]`) for key highlights
- Tables for comparative data
- Code blocks for formulas or structured data

---

## ⚡ Hotcache Protocol

`hotcache.md` is the **first file you read at the start of every session and every operation**.

### What it contains
- Current wiki state (page count, source count, domain)
- Summary of what was done in the most recent session
- Quick-reference key facts already extracted from the wiki
- Open knowledge gaps
- Last operation performed

### Reading rules
1. **Read `hotcache.md` BEFORE `index.md`, BEFORE any wiki page, BEFORE any operation.**
2. **If the user's question is answerable from hotcache alone** — answer immediately without reading further files. Note: "(answered from hotcache)"
3. **If hotcache is insufficient** — proceed to `index.md`, then relevant wiki pages.
4. Hotcache does not replace `index.md` for discovery — it replaces it only when the answer is already summarized there.

### Writing rules
- **Rewrite `hotcache.md` completely** at the end of every ingest, query (if filed), or lint operation.
- Keep it under **500 words** — ruthlessly trim older session detail.
- Structure: wiki state → recent session summary → key facts quick-ref → open gaps → last operation.
- Hotcache is **not** append-only. It is a rolling window. Old content is replaced, not archived.
- Hotcache does **not** need YAML frontmatter (it has its own minimal header).

---

## 🔄 Operations

### Operation 1: INGEST

**Trigger:** User provides a new source and says "ingest this" or drops a file into `raw/`.

**Steps (in order):**
1. **Read** the source document fully
2. **Discuss** with user — key takeaways, what to emphasize, how it fits existing knowledge
3. **Copy or move** the source into `raw/` (if not already there)
4. **Create** a source summary page in `sources/` following the page format
5. **Update or create** relevant concept pages in `concepts/`
6. **Update or create** relevant entity pages in `entities/`
7. **Cross-reference** — add `[[links]]` on all affected pages
8. **Flag contradictions** — if new source conflicts with existing wiki content, mark both pages with `> [!WARNING]`
9. **Update `index.md`** — add the new source page; update any concept/entity pages whose summaries changed
10. **Append to `log.md`** — one entry per ingest, format: `## [YYYY-MM-DD] ingest | Source Title`
11. **Rewrite `hotcache.md`** — update wiki state counts, add session summary, refresh key facts quick-ref

**Single-source rule:** Ingest one source at a time by default. Batch ingestion is allowed but must be noted in the log.

---

### Operation 2: QUERY

**Trigger:** User asks a question against the wiki.

**Steps:**
1. **Read `hotcache.md`** — check if the answer is already summarized there
2. If hotcache is sufficient → answer immediately, note "(answered from hotcache)"
3. If not → read `index.md` to identify relevant pages, then read those pages
4. Synthesize an answer with explicit citations (`[[PageName]]`)
5. **Ask the user** whether to file this answer as a new page in `queries/`
6. If yes — create the page, update `index.md`, append to `log.md`, rewrite `hotcache.md`

**Output formats available:**
- Markdown narrative (default)
- Comparison table
- Mermaid diagram
- Bullet-point briefing
- Slide outline (Marp format, if requested)

---

### Operation 3: LINT

**Trigger:** User says "lint the wiki" or "health-check".

**Checks:**
1. **Contradictions** — pages with conflicting claims
2. **Stale content** — pages not updated after newer sources that supersede them
3. **Orphan pages** — pages with no inbound `[[links]]` from other pages
4. **Missing pages** — concepts mentioned in links that don't have their own page yet
5. **Missing cross-references** — pages that should link to each other but don't
6. **Data gaps** — topics that appear in sources but have no wiki page
7. **Outdated index** — index entries that don't match current page summaries

**Output:** A lint report filed as `queries/lint-YYYY-MM-DD.md`, with actionable fix list. Append to `log.md`. Rewrite `hotcache.md`.

---

## 📋 index.md Conventions

`index.md` is the content catalog. Structure:

```markdown
# Wiki Index
> Updated: YYYY-MM-DD | Pages: N | Sources: N

## Sources
| Page | Summary | Date | Source File |
|------|---------|------|------------|
| [[sources/X]] | One-line summary | YYYY-MM-DD | raw/X.md |

## Concepts
| Page | Summary | Updated |
|------|---------|---------|

## Entities
| Page | Summary | Updated |
|------|---------|---------|

## Comparisons
| Page | Summary | Updated |
|------|---------|---------|

## Synthesis
| Page | Summary | Updated |
|------|---------|---------|

## Queries
| Page | Summary | Date |
|------|---------|------|
```

**Rules:**
- Every wiki page MUST have an entry in the index
- Update the index at the end of every ingest and every filed query
- The LLM reads `index.md` first on every query to locate relevant pages

---

## 📜 log.md Conventions

`log.md` is append-only — never edit past entries.

**Entry format:**
```markdown
## [YYYY-MM-DD] <operation> | <title>

- **Operation:** ingest | query | lint | note
- **Pages touched:** list of pages created or updated
- **Key changes:** brief description
- **Notes:** anything notable (contradictions found, gaps identified, etc.)
```

**Rules:**
- Each entry starts with `## [YYYY-MM-DD]` (grep-parseable)
- One entry per operation
- Never delete or modify past entries
- The log is a timeline of the wiki's entire history

---

## 🏷️ Tagging Conventions

Use consistent lowercase Thai/English tags. Examples for this wiki:
- `สวัสดิการ`, `บำนาญ`, `บำเหน็จ`, `กบข`, `รักษาพยาบาล`
- `การเดินทาง`, `ที่อยู่อาศัย`, `การศึกษา`, `วันลา`
- `กฎหมาย`, `กรมบัญชีกลาง`, `ก.พ.`
- `เปรียบเทียบ`, `ข้าราชการ`, `เอกชน`

---

## ⚠️ Hard Rules

1. **Never modify files in `raw/`** — they are the immutable source of truth
2. **Always update `index.md`** after any page creation or significant update
3. **Always append to `log.md`** after every operation
4. **Always use `[[WikiLinks]]`** for cross-references — never plain text mentions of page names
5. **Never let a valuable answer disappear into chat** — file it in `queries/`
6. **Flag contradictions immediately** with `> [!WARNING]` on both conflicting pages
7. **Frontmatter is mandatory** on every content page (exception: hotcache.md uses its own minimal header)
8. **One source at a time** during ingest unless user explicitly requests batch mode
9. **Hotcache is always current** — never let it fall more than one operation behind

---

## 🌐 Domain Context

This wiki's current domain: **Thai Civil Servant Benefits & Welfare (สวัสดิการข้าราชการไทย)**

Primary language: Thai (ภาษาไทย) with English headings/tags where helpful.
Key entities to track: กรมบัญชีกลาง, สำนักงาน ก.พ., กบข., ธนาคารออมสิน, ธนาคารอาคารสงเคราะห์

---

*This schema was bootstrapped on 2026-04-22. Evolve it in collaboration with the user as the wiki grows.*
