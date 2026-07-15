import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get StartHealth contact info",
  description:
    "Get contact and booking details for StartHealth (email, booking URL, website, service area).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      company: "StartHealth",
      website: "https://starthealth.fi",
      email: "jussikurikka@starthealth.fi",
      bookingUrl: "https://asiointi.starthealth.fi/",
      serviceArea: "Helsinki (paikan päällä) ja koko Suomi etävastaanotoin.",
      audience: "1–200 hengen pk-yritykset ja startupit.",
      languages: ["fi", "en"],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
