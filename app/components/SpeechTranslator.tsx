"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector";

export default function SpeechTranslator() {
  const [translatedText, setTranslatedText] = useState("");
  const [inputLang, setInputLang] = useState<string>("en");
  const [outputLang, setOutputLang] = useState<string>("es");
  const [recording, setRecording] = useState<boolean>(false);
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [SpeechRecognitionAPI, setSpeechRecognitionAPI] = useState<any>(null);
  const baseUrl= process.env.NEXT_PUBLIC_API_BASE_URL

  // Ensure SpeechRecognition is only accessed in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechRecognitionAPI(SpeechRecognition ? new SpeechRecognition() : null);
    }
  }, []);

  const handleSpeak = () => {
    if (!SpeechRecognitionAPI) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = SpeechRecognitionAPI;
    recognition.lang = inputLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setRecording(true);
    recognition.onend = () => setRecording(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
      handleTranslate(transcript);
    };

    recognition.onerror = (event: Event) => {
      console.error("Speech recognition error:", event);
      setRecording(false);
    };

    recognition.start();
  };

  const handleTranslate = async (text: string) => {
    if (!text.trim()) {
      console.error("No text to translate");
      return;
    }
  
    try {
      const response = await axios.post(`${baseUrl}/text-translate/`, {
        text,
        source_lang: inputLang,
        target_lang: outputLang,
      });
  
      setTranslatedText(response.data.translated_text);
      
      if (response.data.audio_file) {
        const audioUrl = `${baseUrl}/audio/${response.data.audio_file}?t=${new Date().getTime()}`; 
        
        const audio = new Audio(audioUrl);
        audio.load(); // Force reload of new audio file
        audio.play();
      }
    } catch (error) {
      console.error("Translation failed", error);
    }
  };

  return (
    <div>
      <LanguageSelector value={inputLang} onChange={(e) => setInputLang(e.target.value)} />
      <LanguageSelector value={outputLang} onChange={(e) => setOutputLang(e.target.value)} />

      <button onClick={handleSpeak} disabled={recording}>
        {recording ? "Listening..." : "Speak Now"}
      </button>

      {recognizedText && <p><b>Recognized:</b> {recognizedText}</p>}
      {translatedText && <p><b>Translated:</b> {translatedText}</p>}
    </div>
  );
}
