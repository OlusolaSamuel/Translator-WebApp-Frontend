"use client";

import { useState } from "react";
import TextTranslator from "@/app/components/TextTranslator";
import SpeechTranslator from "@/app/components/SpeechTranslator";

export default function Home() {
  const [inputMode, setInputMode] = useState<"text" | "speech">("text");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container">
        <h1>Healthcare AI Translator</h1>
        <p style={{ textAlign: "center" }}>Real-time Speech & Text Translation</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          <button onClick={() => setInputMode("text")} style={{ backgroundColor: inputMode === "text" ? "#075e54" : "#128c7e" }}>
            Text Input
          </button>
          <button onClick={() => setInputMode("speech")} style={{ backgroundColor: inputMode === "speech" ? "#075e54" : "#128c7e" }}>
            Speech Input
          </button>
        </div>

        {inputMode === "text" ? <TextTranslator /> : <SpeechTranslator />}
      </div>
    </div>
  );
}