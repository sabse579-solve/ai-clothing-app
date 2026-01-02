// backend/ai/aiDeltaSelector.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * AI chooses ONLY from pre-approved PatternDeltas
 * Tailor-safe enforcement layer
 */
async function aiDeltaSelector({ prompt, basePattern, allowedDeltas }) {
  if (!allowedDeltas || !allowedDeltas.length) {
    return {};
  }

  // 🔒 STRICT delta contract sent to AI
  const deltaContract = allowedDeltas.map((d) => ({
    key: d.key,
    type: d.type,
    min: d.min ?? null,
    max: d.max ?? null,
    values: d.values ?? null,
  }));

  const systemPrompt = `
You are a master tailor AI.

STRICT RULES:
- You MUST return JSON only.
- You may ONLY use the provided delta keys.
- You MUST respect min/max or enum values.
- If unsure, choose the safest middle value.
- NEVER invent new keys.
`;

  const userPrompt = `
User request:
"${prompt}"

Base Pattern:
${basePattern.id}

Allowed Pattern Deltas:
${JSON.stringify(deltaContract, null, 2)}

Return EXACT JSON:
{
  "deltas": {
    "<delta_key>": <valid_value>
  }
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1, // 🔒 LOW creativity
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  let parsed;
  try {
    parsed = JSON.parse(completion.choices[0].message.content);
  } catch {
    return {};
  }

  const rawDeltas = parsed.deltas || {};
  const safeDeltas = {};

  // 🔒 FINAL SERVER-SIDE CLAMP (NON-NEGOTIABLE)
  for (const def of allowedDeltas) {
    const value = rawDeltas[def.key];
    if (value === undefined) continue;

    if (def.type === "enum" && def.values.includes(value)) {
      safeDeltas[def.key] = value;
    }

    if (
      (def.type === "numeric" || def.type === "ratio") &&
      typeof value === "number"
    ) {
      safeDeltas[def.key] = Math.min(
        Math.max(value, def.min),
        def.max
      );
    }
  }

  return safeDeltas;
}

module.exports = { aiDeltaSelector };
