import { SingletonFileProcessor } from "./fileProcessor";
import { input } from "@inquirer/prompts";

const processor = SingletonFileProcessor.getInstance();

const path = await input({
  message:
    "Enter the local path or the public url of the file to analyze (only .txt and .docx supported): ",
});

if (!path) {
  console.error("No file path provided.");
  process.exit(1);
}

try {
  const content = await processor.readFile(path);
  const analysis = processor.analyzeContent(content);
  console.log("Analysis:", analysis);
} catch (err) {
  console.error("Error reading file:", err.message);
  process.exit(1);
}
