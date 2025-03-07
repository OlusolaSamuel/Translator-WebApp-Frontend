import React from "react";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh-cn", label: "Chinese" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
];

export default function LanguageSelector({ value, onChange }: Props) {
  return (
    <select value={value} onChange={onChange} style={{ width: "100%", padding: "10px", marginBottom: "10px" }}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
