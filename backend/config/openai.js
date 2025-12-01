const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
  baseURL: process.env.OpenAI_BASE_URL,
});

module.exports = openai;
