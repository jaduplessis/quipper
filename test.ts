import dotenv from "dotenv";
import { generateImage } from "./src";

dotenv.config();

const { image, prompt } = await generateImage(
  "I haven't had a shower in 3 days"
);
