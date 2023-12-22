import { AI, ImageResult } from "./ai";

export const generateImage = async (
  quote: string,
): Promise<ImageResult> => {
  const model = new AI();

  return await model.generateImage(quote);
};
