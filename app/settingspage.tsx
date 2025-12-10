"use client";

import { useState, useEffect } from "react";
import Protected from "../components/Protected";
import SettingToggle from "../components/SettingToggle";
import ModelSelector from "../components/ModelSelector";
import CreativitySlider from "../components/CreativitySlider";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoVoice, setAutoVoice] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [model, setModel] = useState("gpt-4.1");
  const [creativity, setCreativity] = useState(0.7);

  useEffect(() => {
    const s = localStorage.getItem("11evnai_settings");
    if (s) {
      const parsed = JSON.parse(s);
      setDarkMode(parsed.darkMode ?? false);
      setAutoVoice(parsed.autoVoice ?? false);
      setAnimations(parsed.animations ?? true);
      setModel(parsed.model ?? "gpt-4.1");
      setCreativity(parsed.creativity ?? 0.7);
    }
  }, []);

  const saveSettings = () => {
    const data = {
      darkMode,
      autoVoice,
      animations,
      model,
      creativity,
    };
    localStorage.setItem("11evnai_settings", JSON.stringify(data));
    alert("Settings saved!");
  };

  const reset = () => {
    localStorage.removeItem("11evnai_settings");
    location.reload();
  };

  return (
    <Protected>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-brand mb-6">Settings</h1>

        {/* Model Selector */}
        <ModelSelector value={model} onChange={setModel} />

        {/* Creativity Slider */}
        <CreativitySlider value={creativity} onChange={setCreativity} />

        {/* Toggles */}
        <div className="mt-6">
          <SettingToggle
            label="Dark Mode"
            enabled={darkMode}
            onChange={setDarkMode}
          />

          <SettingToggle
            label="Auto Voice Responses"
            enabled={autoVoice}
            onChange={setAutoVoice}
          />

          <SettingToggle
            label="UI Animations"
            enabled={animations}
            onChange={setAnimations}
          />
        </div>

        {/* Save */}
        <button
          className="mt-6 bg-brand text-white w-full py-3 rounded font-semibold"
          onClick={saveSettings}
        >
          Save Settings
        </button>

        <button
          className="mt-3 w-full py-2 rounded border border-red-500 text-red-500 font-medium"
          onClick={reset}
        >
          Reset to Defaults
        </button>
      </div>
    </Protected>
  );
}
