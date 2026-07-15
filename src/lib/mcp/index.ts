import { defineMcp } from "@lovable.dev/mcp-js";
import listServicePackages from "./tools/list-service-packages";
import estimatePrice from "./tools/estimate-price";
import listArticles from "./tools/list-articles";
import getContactInfo from "./tools/get-contact-info";

export default defineMcp({
  name: "starthealth-mcp",
  title: "StartHealth MCP",
  version: "0.1.0",
  instructions:
    "Public tools for StartHealth, a modern occupational health provider for Finnish SMEs and startups. Use `list_service_packages` to see the Minimum/Basic/Support packages, `estimate_price` for a rough monthly price (low-exposure industries only), `list_articles` to browse Finnish occupational-health guides, and `get_contact_info` for contact and booking details.",
  tools: [listServicePackages, estimatePrice, listArticles, getContactInfo],
});
