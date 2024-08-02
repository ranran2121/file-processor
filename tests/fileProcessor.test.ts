import { SingletonFileProcessor } from "../src/fileProcessor";

describe("SingletonFileProcessor", () => {
  let processor: any;

  beforeEach(() => {
    processor = SingletonFileProcessor.getInstance();
  });

  test("should return the same instance", () => {
    const anotherProcessor = SingletonFileProcessor.getInstance();
    expect(processor).toBe(anotherProcessor);
  });

  test("should count words correctly", () => {
    const content = "hello world hello";
    expect(processor.analyzeContent(content).wordCount).toBe(3);
  });

  test("should count letters correctly", () => {
    const content = "hello world";
    expect(processor.analyzeContent(content).letterCount).toBe(10);
  });

  test("should count spaces correctly", () => {
    const content = "hello world";
    expect(processor.analyzeContent(content).spaceCount).toBe(1);
  });

  test("should find frequent words correctly", () => {
    const content =
      "test test test test test test test test test test test other";
    const frequentWords = processor.analyzeContent(content).frequentWords;
    expect(frequentWords["test"]).toBe(11);
    expect(frequentWords["other"]).toBeUndefined();
  });
});
