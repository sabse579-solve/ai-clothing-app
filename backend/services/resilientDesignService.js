import OpenAI from "openai";
import axios from "axios";
import fs from "fs";
import path from "path";

// INIT MODELS
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Helper: return a safe local fallback image
function getRandomLocalImage() {
  const dir = path.join(process.cwd(), "assets/fallback-images");

  if (!fs.existsSync(dir)) {
    console.warn("Fallback directory missing, returning placeholder...");
    return "/assets/fallback-images/default.png";
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png") || f.endsWith(".jpg"));
  if (files.length === 0) {
    console.warn("No fallback images found.");
    return "/assets/fallback-images/default.png";
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];
  return `/assets/fallback-images/${randomFile}`;
}

// -------------------------------------
// 1️⃣ TRY GOOGLE GEMINI  
// -------------------------------------
//async function generateWithGemini(prompt) {
  //if (!GEMINI_API_KEY) throw new Error("Gemini API key missing.");

  //try {
    //const response = await axios.post(
      //"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateImage?key=" + GEMINI_API_KEY,
      //{ prompt: { text: prompt } },
      //{ responseType: "arraybuffer" }
    //);

   // const base64 = Buffer.from(response.data).toString("base64");
    //return `data:image/png;base64,${base64}`;
  //} catch (err) {
    //console.error("[Gemini] Failed:", err.message);
    //throw err;
  //}
//}

// -------------------------------------
// 2️⃣ TRY OPENAI DALL·E 3
// -------------------------------------
async function generateWithOpenAI(prompt) {
  if (!openai) throw new Error("OPENAI_API_KEY missing.");

  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      n: 1,
    });

    return response.data[0].url;
  } catch (err) {
    console.error("[OpenAI] Failed:", err.message);
    throw err;
  }
}

// -------------------------------------
// 3️⃣ TRY HUGGINGFACE SDXL TURBO
// -------------------------------------
async function generateWithHF(prompt) {
  if (!process.env.HF_API_KEY) {
    throw new Error("HF_API_KEY missing");
  }

  const response = await axios.post(
    "https://api-inference.huggingface.co/models/stabilityai/sdxl-turbo",
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
      timeout: 60000,
    }
  );

  const base64 = Buffer.from(response.data).toString("base64");
  return `data:image/png;base64,${base64}`;
}


// -------------------------------------
// MASTER FUNCTION
// Order: Gemini → OpenAI → SDXL → fallback
// -------------------------------------
export async function createDesign(prompt) {
  // 1️⃣ Try Gemini
  try {
    if (GEMINI_API_KEY) {
      return await generateWithGemini(prompt);
    }
  } catch (err) {
    console.warn("Gemini failed → trying OpenAI…");
  }

  // 2️⃣ Try OpenAI
  try {
    if (openai) {
      return await generateWithOpenAI(prompt);
    }
  } catch (err) {
    console.warn("OpenAI failed → trying SDXL…");
  }

  // 3️⃣ Try HuggingFace SDXL
  try {
    if (process.env.HF_API_KEY) {
      return await generateWithHF(prompt);
    }
  } catch (err) {
    console.warn("SDXL failed → using fallback…");
  }

  // 4️⃣ Last option: fallback image
  return getRandomLocalImage();
}
