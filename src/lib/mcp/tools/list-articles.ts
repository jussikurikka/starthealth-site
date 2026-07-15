import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { articles } from "../articles";

export default defineTool({
  name: "list_articles",
  title: "List StartHealth articles",
  description:
    "List all StartHealth occupational-health guide articles. Optional keyword filter matches against title and description (case-insensitive).",
  inputSchema: {
    query: z.string().optional().describe("Optional keyword filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = (query ?? "").toLowerCase().trim();
    const filtered = q
      ? articles.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.description.toLowerCase().includes(q) ||
            a.url.toLowerCase().includes(q),
        )
      : articles;
    const items = filtered.map((a) => ({
      title: a.title,
      url: `https://starthealth.fi${a.url}`,
      description: a.description,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});
