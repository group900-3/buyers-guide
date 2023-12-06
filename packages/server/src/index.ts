import { app } from "./app";
import { content } from "./schema";
import { scrape } from "./scrape";
import { Env } from "./types";
import { drizzle } from "drizzle-orm/d1";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return await app.fetch(request, env, ctx);
  },
  async scheduled(_event: ScheduledEvent, env: Env) {
    const db = drizzle(env.DB);
    const data = await scrape();
    await db.insert(content).values({ data });
    await env.DB.exec(
      "DELETE FROM content WHERE id NOT IN (SELECT id FROM content ORDER BY id DESC LIMIT 10)"
    );
  },
};
