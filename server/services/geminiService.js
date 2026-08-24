import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getMimeType = (mimeType, fileName) => {
  // If Multer gives us a proper MIME type, use it
  if (
    mimeType === "image/jpeg" ||
    mimeType === "image/jpg" ||
    mimeType === "image/png" ||
    mimeType === "application/pdf"
  ) {
    return mimeType;
  }

  // Otherwise determine it from the file extension
  const extension = fileName
    .split(".")
    .pop()
    .toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";

    case "png":
      return "image/png";

    case "pdf":
      return "application/pdf";

    default:
      throw new Error("Unsupported document format.");
  }
};

export const extractDocumentInfo = async (
  fileBuffer,
  mimeType,
  fileName
) => {
  try {
    console.log("Starting Gemini document analysis...");
    console.log("Original MIME type:", mimeType);
    console.log("File name:", fileName);
    console.log("File size:", fileBuffer.length);

    const actualMimeType = getMimeType(
      mimeType,
      fileName
    );

    console.log("MIME type sent to Gemini:", actualMimeType);

    const base64File = fileBuffer.toString("base64");

    const prompt = `
You are an AI document information extraction assistant for MemoryVault.

Analyze this document and extract the information visible in it.

Return ONLY valid JSON.

Use exactly this structure:

{
  "documentType": null,
  "name": null,
  "documentNumber": null,
  "issueDate": null,
  "expiryDate": null,
  "description": null,
  "additionalInformation": {}
}

Rules:

- Extract only information visible in the document.
- Do not guess.
- If information is missing, use null.
- Use YYYY-MM-DD for dates.
- Put document-specific fields inside additionalInformation.
- Return JSON only.
`;

    console.log("Sending document to Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          inlineData: {
            mimeType: actualMimeType,
            data: base64File,
          },
        },
        {
          text: prompt,
        },
      ],

      config: {
        responseMimeType: "application/json",
      },
    });

    console.log("Gemini response received.");

    const text = response.text;

    console.log("Gemini Raw Response:");
    console.log(text);

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    const extractedData = JSON.parse(text);

    console.log("Parsed Gemini Data:");
    console.log(extractedData);

    return extractedData;

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("===================================");

    throw error;
  }
};