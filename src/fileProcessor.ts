import fs from "fs";
import axios from "axios";
import path from "path";
import mammoth from "mammoth";

class FileProcessor {
  public async readFile(filePathOrUrl: string): Promise<string> {
    if (this.isValidUrl(filePathOrUrl)) {
      return this.readFromUrl(filePathOrUrl);
    } else {
      return this.readFromFile(filePathOrUrl);
    }
  }

  private async readFromUrl(url: string): Promise<string> {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const fileBuffer = Buffer.from(response.data);
      const extension = path.extname(url).toLowerCase();

      return this.processFileBuffer(fileBuffer, extension);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private async readFromFile(filePath: string): Promise<string> {
    try {
      const extension = path.extname(filePath).toLowerCase();
      const fileBuffer = await fs.promises.readFile(filePath);

      return this.processFileBuffer(fileBuffer, extension);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private async processFileBuffer(
    fileBuffer: Buffer,
    extension: string
  ): Promise<string> {
    switch (extension) {
      case ".txt":
        return fileBuffer.toString("utf8");

      case ".docx":
        return this.readDocxFile(fileBuffer);

      default:
        throw new Error("Unsupported file type");
    }
  }

  private async readDocxFile(fileBuffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value.trim();
    } catch (error) {
      throw new Error(`Failed to read DOCX file: ${error.message}`);
    }
  }

  analyzeContent(content: string) {
    const wordCount = this.getWordCount(content);
    const letterCount = this.getLetterCount(content);
    const spaceCount = this.getSpaceCount(content);
    const frequentWords = this.getFrequentWords(content);

    return { wordCount, letterCount, spaceCount, frequentWords };
  }

  private getWordCount(content: string): number {
    return content.split(/\s+/).length;
  }

  private getLetterCount(content: string): number {
    return content.replace(/\s+/g, "").length;
  }

  private getSpaceCount(content: string): number {
    return content.split(" ").length - 1;
  }

  private getFrequentWords(content: string): { [word: string]: number } {
    const words = content.toLowerCase().split(/\s+/);
    const wordMap: { [word: string]: number } = {};

    words.forEach((word) => {
      if (wordMap[word]) {
        wordMap[word]++;
      } else {
        wordMap[word] = 1;
      }
    });

    return Object.fromEntries(
      Object.entries(wordMap).filter(([_, count]) => count > 10)
    );
  }

  private isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}

export class SingletonFileProcessor {
  private static instance: FileProcessor;

  private constructor() {}

  public static getInstance(): FileProcessor {
    if (!SingletonFileProcessor.instance) {
      SingletonFileProcessor.instance = new FileProcessor();
    }
    return SingletonFileProcessor.instance;
  }
}
