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
                  The JSON must strictly follow this schema:
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

  const maxRetries = 3;
  let attempt = 0;
  let response;

  try {
    while (attempt < maxRetries) {
      try {
        response = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL,
          messages,
        });
        break; // Success, exit loop
      } catch (error) {
        if (error.status === 429 && attempt < maxRetries - 1) {
          attempt++;
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s...
          console.log(
            `Rate limit hit. Retrying in ${delay}ms... (Attempt ${
              attempt + 1
            }/${maxRetries})`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw error; // Not a 429 or max retries reached
        }
      }
    }

    const raw = response.choices[0].message.content;
    console.log("AI Response:", raw); // Log the raw response for debugging

    // Improved JSON extraction: find the first { and last }
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const cleaned = jsonMatch[0];
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (error) {
      console.error("JSON Parse Error:", error);
      console.error("Cleaned content was:", cleaned);
      throw new Error("Failed to parse JSON response from OpenAI");
    }
    return parsed;
  } catch (error) {
    console.error("OpenAI API/Logic Error:", error);
    throw error; // Re-throw to be caught by the route handler
  }
}

const createProductDescription = async (req, res) => {
  try {
    const { base64Image, mimeType } = req.body;
    if (!base64Image || !mimeType) {
      return res.status(400).json({ error: "Missing base64Image or mimeType" });
    }
    const result = await main(base64Image, mimeType);
    return res.status(200).json({ ...result });
  } catch (error) {
    console.error("Controller Error:", error);
    // Send more specific error if available
    const errorMessage =
      error.response?.data?.error?.message ||
      error.message ||
      "Something went wrong";
    const statusCode = error.status || 400; // Return 429 if that was the final error
    return res.status(statusCode).json({ error: errorMessage });
  }
};

module.exports = {
  createProductDescription,
};
