import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { getCache, setCache } from './cache.js';

const app = express();
app.use(cors());

const PORT = 3000;
const CACHE_TTL = 5 * 60 * 1000; // 5 minut

app.get('/api/github', async (req, res) => {
  const query = req.query.q as string;
  if (!query) return res.status(400).json({ error: 'Missing query param ?q=' });

  const cacheKey = `github_${query}`;
  const cached = getCache(cacheKey);
  if (cached) {
    console.log('✅ cache hit');
    return res.json(cached);
  }

  console.log('🌍 fetching from GitHub...');
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`,
    );
    const data = await response.json();

    setCache(cacheKey, data, CACHE_TTL);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'GitHub API failed' });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`),
);
