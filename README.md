Project Structure:

/backend
  ├── main.py            # FastAPI backend logic
  ├── requirements.txt   # Dependencies
  ├── uploads/           # Stores uploaded audio files
  ├── outputs/           # Stores processed and encrypted audio files
  ├── .env               # Environment variables

/frontend
  ├── components/
  │   ├── TextTranslator.tsx     # Text translation component
  │   ├── SpeechTranslator.tsx   # Speech translation component
  │   ├── LanguageSelector.tsx   # Dropdown for language selection
  ├── pages/
  │   ├── index.tsx              # Main UI combining all components
  ├── styles/global.css          # App styling
  ├── package.json               # Frontend dependencies



AI Tools Used:
Google Translate API: Translates text from one language to another.
gTTS (Google Text-to-Speech): Converts translated text into speech audio.
SpeechRecognition (Google Web Speech API): Converts spoken language to text.


Security Considerations:
Encryption: Audio files are encrypted before storage and decrypted upon retrieval.
CORS Handling: Configured to allow secure cross-origin requests between frontend and backend.
Environment Variables: Sensitive keys stored securely using .env files (not committed to Git).


📝 User Guide:
Features
✅ Text Translation: Enter text, select input and output languages, get translated text and speech.
✅ Speech Translation: Speak into the app, transcribe, translate, and listen to the translated speech.

How to Use:
Choose Input Type → Select “Text Input” or “Speech Input.”
Select Languages → Choose the source and target languages.
Translate
For text: Enter text and click Translate & Play Audio.
For speech: Click Speak Now, say something, and wait for translation & playback.


🎤 Presentation :
Approach
Built with FastAPI (Backend) and Next.js (Frontend) for speed & scalability.
Uses Generative AI for translation & speech synthesis, ensuring real-time and natural communication.
Security-first approach with encrypted audio storage.
How Generative AI is Used
Google Translate API: Enables multi-language support for seamless communication.
Speech-to-Text AI: Automatically converts spoken language into written text.
Text-to-Speech AI: Generates natural-sounding audio responses for translations.


🚀 Deployment:
Frontend: Hosted on Vercel
Backend: Deployed on Render
