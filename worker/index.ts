interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Serve static SPA assets (Vite build output)
    return env.ASSETS.fetch(request);
  },
};
