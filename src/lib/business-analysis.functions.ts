import { createServerFn } from "@tanstack/react-start";
import { businessAnalysisInput, businessAnalysisOutput, analysisInstructions, analysisError, type BusinessAnalysis } from "./business-analysis";

type AnalysisResult = { ok: true; analysis: BusinessAnalysis } | { ok: false; error: string };

export const analyzeBusiness = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => businessAnalysisInput.parse(input))
  .handler(async ({ data }): Promise<AnalysisResult> => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const response = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: analysisInstructions,
        input: JSON.stringify(data),
        reasoning: { effort: "low" },
        max_output_tokens: 4000,
        text: { format: { type: "json_schema", name: "business_analysis", strict: true, schema: {
          type: "object", additionalProperties: false,
          properties: {
            summary: { type: "string" },
            opportunities: { type: "array", items: { type: "object", additionalProperties: false, properties: { title: { type: "string" }, benefit: { type: "string" }, basis: { type: "string" } }, required: ["title", "benefit", "basis"] } },
            sections: { type: "array", items: { type: "string" } },
            approach: { type: "string" }, questions: { type: "array", items: { type: "string" } }, opening: { type: "string" },
          }, required: ["summary", "opportunities", "sections", "approach", "questions", "opening"],
        } } },
      });
      if (response.status !== "completed" || response.error) return { ok: false, error: "A IA não concluiu a análise. Seus dados foram preservados." };
      let text = "";
      for (const item of response.output) {
        if (item.type !== "message") continue;
        for (const content of item.content) {
          if (content.type === "refusal") return { ok: false, error: "A IA não pôde analisar essas informações. Nenhuma nova tentativa será feita automaticamente." };
          if (content.type === "output_text") text += content.text;
        }
      }
      return { ok: true, analysis: businessAnalysisOutput.parse(JSON.parse(text)) };
    } catch (error) {
      if (error instanceof GatewayError) {
        console.error("Business analysis failed", { code: error.code, ids: error.ids, outcome: error.outcome });
        return { ok: false, error: analysisError(error.code) };
      }
      console.error("Business analysis response could not be validated");
      return { ok: false, error: analysisError("invalid_response") };
    }
  });