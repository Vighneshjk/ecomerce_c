import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { createProxyMiddleware } from 'http-proxy-middleware';

async function startServer() {
  const app = express();
  const PORT = 3000;
  const DJANGO_URL = process.env.DJANGO_URL || 'http://localhost:8000';

  app.use(cors());

  // Proxy API requests to Django - Move BEFORE express.json() to avoid body parsing issues
  app.use(createProxyMiddleware({
    target: DJANGO_URL,
    changeOrigin: true,
    ws: true,
    pathFilter: '/api',
  }));

  app.use(express.json());

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Development server running at http://localhost:${PORT}`);
    console.log(`Backend proxy configured for ${DJANGO_URL}`);
  });
}

startServer();
