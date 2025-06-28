import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function analyzeMedicalImage(base64: string, mimeType: string) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
      {
        text: `You are a medical assistant. A patient has uploaded a prescription or lab report.

First, provide a layman's summary of the document. Explain the medical terms, test results, and treatment suggestions in simple language the patient can understand.

Then, check if the document suggests any of the following:
- Alzheimer's → Route: /smritiyaan
- Brain Tumor → Route: /neuro-setu
- Pneumonia → Route: /shwaas-veda

Respond in **this exact format**:

## Summary
[Layman explanation of the document]

## Condition
<Alzheimer's / Brain Tumor / Pneumonia / None>

## Confidence
<0–100>%

## Reason
<why you think this condition is present>

## Next Steps
<what the patient should do next>

## Redirect
</smritiyaan / /neuro-setu / /shwaas-veda / appointment / no redirect>
`,
      },
    ],
  });

  return result.text;
}
