import { PDFParse } from "pdf-parse";
import * as mammoth from "mammoth";

export async function extractText(
  buffer: Buffer,
  fileType: string
): Promise<string> {
  if (fileType === "pdf") {
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    const text = result.text || "";
    await parser.destroy();
    if (text.trim().length < 100) {
      throw new Error(
        "This document appears to be a scanned image. Please upload a text-based PDF."
      );
    }
    return text;
  }

  if (fileType === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error(`Unsupported file type: ${fileType}`);
}
