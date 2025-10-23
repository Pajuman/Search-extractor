import express from "express";
import cors from "cors";
import { getCache, setCache } from "./cache.js";
import path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

// candidate paths to check (ordered)
const candidates = [
  path.join(process.cwd(), "dist/search-extractor/browser"), // common on some builds
  path.join(process.cwd(), "dist/search-extractor"), // some builds omit 'browser'
  path.join(process.cwd(), "backend/dist/search-extractor/browser"),
  path.join(process.cwd(), "backend/dist/search-extractor"),
  path.join(__dirname, "../dist/search-extractor/browser"),
  path.join(__dirname, "../dist/search-extractor"),
];

// find first existing candidate
let angularDistPath = null;
for (const p of candidates) {
  try {
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
      angularDistPath = p;
      break;
    }
  } catch (e) {
    // ignore and continue
  }
}

console.log("process.cwd():", process.cwd());
console.log("__dirname:", __dirname);
console.log("Checked candidate paths:");
candidates.forEach((p) => console.log("  -", p));
console.log("Resolved angularDistPath:", angularDistPath);

if (!angularDistPath) {
  console.error(
    "ERROR: No Angular dist folder found. Make sure `dist/search-extractor` is present in the repository.",
  );
  // exit process so Railway shows failure
  process.exit(1);
}
app.get("/api/search", async (req, res) => {
  const search = req.query.search;
  const source = req.query.source;

  if (!search) {
    return res.status(400).json({ error: "Missing search param ?search=" });
  }

  if (!source) {
    return res.status(400).json({ error: "Missing source param ?source=" });
  }

  let apiUrl = "";

  switch (source) {
    case "Wikipedia":
      apiUrl = `https://en.wikipedia.org/api/rest_v1/page/title/${encodeURIComponent(search)}`;
      break;
    case "HackerNews":
      apiUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(search)}`;
      break;
    case "OpenLibrary":
      apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}&fields=author_name,language,title`;
      break;
    case "GitHub":
      apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(search)}`;
      break;
    default:
      return res.status(400).json({ error: "Unknown source" });
  }

  const cacheKey = source.toLowerCase() + "_" + encodeURIComponent(search);
  const cached = getCache(cacheKey);
  if (cached) {
    console.log("✅ cache hit");
    res.setHeader("X-Cache", "HIT");
    return res.json(cached);
  }

  console.log("🌍 fetching response...");
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    setCache(cacheKey, data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "GitHub API failed" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`),
);
