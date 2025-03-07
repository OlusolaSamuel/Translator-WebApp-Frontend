"use client";

import { useState } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";

export default function TextTranslator() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [inputLang, setInputLang] = useState("en");
  const [outputLang, setOutputLang] = useState("es");
const baseUrl= process.env.NEXT_PUBLIC_API_BASE_URL
  const handleTranslate = async () => {
    try {
      const response = await axios.post(`https://translator-web-app-backend-2.onrender.com/text-translate/`, {
        text,
        source_lang: inputLang,
        target_lang: outputLang,
      });
      setTranslatedText(response.data.translated_text);
      const audio = new Audio(`https://translator-web-app-backend-2.onrender.com/audio/${response.data.audio_file}`);
      audio.play();
    } catch (error) {
      console.error("Translation failed", error);
    }
  };

  return (
    <div>
      <textarea placeholder="Enter text" value={text} onChange={(e) => setText(e.target.value)} style={{ width: "100%", height: "80px" }} />
      <LanguageSelector value={inputLang} onChange={(e) => setInputLang(e.target.value)} />
      <LanguageSelector value={outputLang} onChange={(e) => setOutputLang(e.target.value)} />
      <button onClick={handleTranslate}>Translate & Play Audio</button>
      {translatedText && <p><b>Translated:</b> {translatedText}</p>}
    </div>
  );
}
