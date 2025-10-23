import express from "express";
import cors from "cors";
import { getCache, setCache } from "./cache.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const PORT = 3000;

// Serve Angular build
const angularDistPath = path.resolve(
  __dirname,
  "../dist/search-extractor/browser",
);
app.use(express.static(angularDistPath));

// Fallback for Angular routing
app.get("/", (req, res) => {
  res.sendFile(path.join(angularDistPath, "index.html"));
});

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
