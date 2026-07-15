import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

// Approximate pricing model for StartHealth occupational health services.
// Intended for low-exposure industries only (matches the on-site calculator).
function estimate(employees: number, founders: number, pkg: "minimum" | "basic" | "support") {
  const total = employees + founders;
  const perPerson = { minimum: 12, basic: 25, support: 45 }[pkg];
  const monthly = Math.round(total * perPerson);
  const netAfterKela = Math.round(monthly * 0.45); // ~55% Kela reimbursement
  return { monthlyEuro: monthly, netAfterKelaEuro: netAfterKela };
}

export default defineTool({
  name: "estimate_price",
  title: "Estimate StartHealth monthly price",
  description:
    "Estimate the monthly occupational health price for a company. Intended for low-exposure industries. Not valid for restaurant, construction, machine shop, or night-shift work.",
  inputSchema: {
    employees: z.number().int().min(0).describe("Number of employees excluding founders."),
    founders: z.number().int().min(0).default(0).describe("Number of founders."),
    package: z.enum(["minimum", "basic", "support"]).describe("Service package."),
    riskIndustry: z
      .boolean()
      .default(false)
      .describe("True if the company has restaurant, construction, machine shop, or night-shift work."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ employees, founders, package: pkg, riskIndustry }) => {
    const total = employees + founders;
    if (riskIndustry) {
      return {
        content: [
          {
            type: "text",
            text: "Hintalaskuri ei anna arviota riskialoille (ravintola, rakennus, konepaja, yötyö). Ota yhteyttä StartHealthiin yksilöllistä tarjousta varten.",
          },
        ],
        structuredContent: { riskIndustry: true },
      };
    }
    if (total < 1 || total > 50) {
      return {
        content: [
          {
            type: "text",
            text: "Hintalaskuri toimii 1–50 työntekijän yrityksille. Muille kokoluokille pyydä tarjous.",
          },
        ],
        structuredContent: { outOfRange: true, total },
      };
    }
    const result = estimate(employees, founders, pkg);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: {
        ...result,
        currency: "EUR",
        vat: 0,
        note: "Suuntaa-antava arvio matala-altisteisille aloille. Kela-korvaus arvioitu 55 %.",
      },
    };
  },
});
