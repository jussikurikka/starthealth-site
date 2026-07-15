import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const packages = [
  {
    id: "minimum",
    name: "Minimum",
    description:
      "Lakisääteinen työterveyshuolto pienille yrityksille. Sisältää lakisääteisen dokumentaation, seurannan ja maksuttoman konsultaation.",
    features: [
      "Lakisääteinen dokumentaatio",
      "Lakisääteinen seuranta",
      "Kysy apua maksutta",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    description:
      "Etäpalveluita alkuvaiheen yrityksen työntekijöille. Sisältää kaikki Minimum-paketin palvelut sekä etävastaanotot.",
    features: [
      "Kaikki Minimum-paketin palvelut",
      "Etäyhteys lääkäriin",
      "Etänä tehtävä sairaanhoito",
    ],
  },
  {
    id: "support",
    name: "Support",
    description:
      "Kokonaisvaltaisempi työterveyden tuki. Sisältää Basic-paketin palvelut sekä lääkärin lähivastaanotot ja tutkimukset.",
    features: [
      "Kaikki Basic-paketin palvelut",
      "Lääkärin vastaanotot",
      "Laboratoriokokeet ja kuvantamistutkimukset",
      "Psykologin ja fysioterapeutin vastaanotot",
    ],
  },
];

export default defineTool({
  name: "list_service_packages",
  title: "List StartHealth service packages",
  description:
    "List StartHealth's occupational health service packages (Minimum, Basic, Support) with features and descriptions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(packages, null, 2) }],
    structuredContent: { packages },
  }),
});
