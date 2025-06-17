import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Use your Gemini API key here
const API_KEY = "AIzaSyBI6qB_v_jNo5-81ecZWmKpRAhkV2QwFIc";

const genAI = new GoogleGenerativeAI(API_KEY);

// ✅ Use "gemini-1.5-pro" for v1 models
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

document.getElementById("sendBtn").addEventListener("click", getPlaceInfo);

async function getPlaceInfo() {
  const input = document.getElementById("placeInput");
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  addMessage("Typing...", "bot");

  try {
    const result = await model.generateContent(userText);
    const response = await result.response;
    const text = response.text();

    removeLastMessage();
    addMessage(text, "bot");
  } catch (error) {
    console.error("Gemini API error:", error);
    removeLastMessage();
    addMessage("⚠️ Gemini API call failed. Please check your model name or API key.", "bot");
  }
}

function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function removeLastMessage() {
  const chatbox = document.getElementById("chatbox");
  if (chatbox.lastChild) chatbox.removeChild(chatbox.lastChild);
}
