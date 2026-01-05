import dotenv from "dotenv";
dotenv.config();

import { askGemini } from "./src/utils/openaiClient.js";

const run = async () => {
  const answer = await askGemini("Say hello in one sentence");
  console.log(answer);
};

run();
