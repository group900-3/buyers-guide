import { Hono } from "hono/quick";
import { cors } from "hono/cors";
import { cache } from "hono/cache";
import { Env } from "./types";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { desc } from "drizzle-orm";
import { content } from "./schema";
import { HTTPException } from "hono/http-exception";

export const app = new Hono<{ Bindings: Env }>();
app.use(cors());
app.get("*", cache({ cacheName: "my-app", cacheControl: "max-age=3600" }));

const route = app.get("/data", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  const latest = await db.query.content.findFirst({
    orderBy: [desc(content.id)],
  });
  if (!latest) throw new HTTPException(404);
  return c.jsonT(latest);
});

export type AppType = typeof route;
