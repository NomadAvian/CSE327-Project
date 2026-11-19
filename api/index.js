import 'dotenv/config';
import express from 'express';
import { pool } from './db.js';

// express setyp and api mount points
// singleton

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', async (_request, response) => {
  try {
    await pool.query('SELECT 1');
    response.json({ api: 'ok', database: 'connected' });
  } catch {
    response.status(503).json({ api: 'ok', database: 'unavailable' });
  }
});

app.listen(port, () => {
  console.log(`Andesite API listening on http://localhost:${port}`);
});
