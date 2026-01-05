import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const parsePDF = async (buffer) => {
  const uint8Array = new Uint8Array(buffer);

  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const pageText = content.items.map((item) => item.str).join(" ");
    text += pageText + "\n";
  }

  return text;
};
