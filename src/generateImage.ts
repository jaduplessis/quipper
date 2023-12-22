import { AI } from "./ai";

export const generateImage = async (
  quote: string,
): Promise<Buffer> => {
  const model = new AI();

  return await model.generateImage(quote);
};
