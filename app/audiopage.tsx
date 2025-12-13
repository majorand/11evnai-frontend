"use client";

import { useState } from "react";
import Protected from "./components/Protected";
import AudioRecorder from "./components/AudioRecorder";
import AudioUploadBox from "./components/AudioUploadBox";
import { backend } from "../lib/api";

export default function AudioPage() {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);

  const sendForTranscription = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await backend("/audio/transcribe", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setTranscription(data.transcription);
  };

  return (
    <Protected>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-brand mb-6">Audio Tools</h1>

        <div className="space-y-6">
          <AudioRecorder onRecordComplete={setFile} />

          <AudioUploadBox onUpload={setFile} />

          {file && (
            <div className="mt-4 bg-purple-50 p-4 rounded border text-gray-700">
              <p>
                Selected:&nbsp;
                <span className="font-semibold">{file.name}</span>
              </p>

              <button
                onClick={sendForTranscription}
                className="mt-3 bg-brand text-white px-4 py-2 rounded"
              >
                Transcribe Audio
              </button>
            </div>
          )}

          {transcription && (
            <div className="bg-white p-6 rounded shadow mt-6">
              <h3 className="text-xl font-semibold text-brand mb-2">
                Transcription
              </h3>
              <pre className="whitespace-pre-wrap">{transcription}</pre>
            </div>
          )}
        </div>
      </div>
    </Protected>
  );
}
