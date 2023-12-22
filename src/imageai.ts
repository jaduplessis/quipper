import axios from "axios";
import OpenAI from "openai";

import { ImageGenerateParams } from "openai/src/resources/images";

interface ImageParams extends Omit<ImageGenerateParams, "prompt"> {}

export class ImageAI {
  private openAIApiKey: string;
  private imageParams: ImageParams;
  private openai: OpenAI;
  constructor(openAIApiKey: string, imageProps: ImageParams) {
    this.openAIApiKey = openAIApiKey;
    this.imageParams = imageProps;
    this.openai = this.instantiateOpenAI();
  }

  private instantiateOpenAI(): OpenAI {
    return new OpenAI({
      apiKey: this.openAIApiKey,
    });
  }

  public async generateImage(prompt: string): Promise<Buffer> {
    const response = await this.openai.images.generate({
      model: this.imageParams.model,
      prompt: prompt,
      n: this.imageParams.n,
      size: this.imageParams.size,
      response_format: this.imageParams.response_format,
    });
    const image = response.data[0];
    const imageUrl = image.url as string;

    // Fetch the image from the URL
    const imageData = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    return imageData.data as Buffer;
  }
}
