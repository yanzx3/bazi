// src/index.ts
import app from './api/server';

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`BaZi Calculator API server running on port ${PORT}`);
});

export { app };