const openai = require("../../../config/openai");
const dotenv = require("dotenv");
dotenv.config();
async function main(base64Image, mimeType) {
  const messages = [
    {
      role: "system",
      content: `
                  You are a Product listing assistance for e-commerce store.
                  Your job is to analyze the image of a generate structured data.
  
                  Respond ONLY with raw JSON(no code block), no markdown, no explanation.
                  The JSON must strickly follow the this schema:
                  {
                  "name": string   //short product name,
                  "description":  string //Marketing-friendly description of the product
                  }
            `,
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Analyze the image and return name + description of the product",
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${base64Image}`,
          },
        },
      ],
    },
  ];
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages,
  });

  const raw = response.choices[0].message.content;
  const cleaned = raw.replace(/```json/g, "").replace(/```/g, "");
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to parse JSON response from OpenAI");
  }
  return parsed;
}

const createProductDescription = async (req, res) => {
  try {
    const { base64Image, mimeType } = req.body;
    const result = await main(base64Image, mimeType);
    return res.status(200).json({ ...result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.code || error.message });
  }
};

module.exports = {
  createProductDescription,
};
