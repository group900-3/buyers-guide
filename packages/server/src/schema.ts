import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { Category } from "./types";

export const content = sqliteTable("content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data", { mode: "json" }).$type<Category[]>().notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
});
