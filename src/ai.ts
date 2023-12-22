import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { ImageAI } from "./imageai";
import { dalleImagePrompt } from "./prompt";

export interface ImageResult {
  image: Buffer;
  prompt: string;
}

export class AI {
  private promptModel: ChatOpenAI;
  private imageModel: ImageAI;
  constructor() {
    this.promptModel = new ChatOpenAI({
      openAIApiKey: AI.getApiKey(),
      modelName: "gpt-4",
    });
    this.imageModel = new ImageAI(AI.getApiKey(), {
      model: "dall-e-3",
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });
  }

  private static getApiKey(): string {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in process.env");
    }

    return apiKey;
  }

  private async getImagePrompt(quote: string): Promise<string> {
    const systemMessage = new SystemMessage(dalleImagePrompt);
    const humanMessage = new HumanMessage(quote);

    const res = await this.promptModel.call([systemMessage, humanMessage]);

    return res.content as string;
  }

  public async generateImage(quote: string): Promise<ImageResult> {
    const prompt = await this.getImagePrompt(quote);

    const image = await this.imageModel.generateImage(prompt);

    return { image, prompt };
  }
}
