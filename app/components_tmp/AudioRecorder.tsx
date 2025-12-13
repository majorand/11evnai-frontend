"use client";

import { useEffect, useState } from "react";

export default function AudioRecorder({
  onRecordComplete,
}: {
  onRecordComplete: (file: File) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    if (recording && !mediaRecorder) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          const file = new File([blob], "recording.wav", { type: "audio/wav" });
          onRecordComplete(file);
        };

        setMediaRecorder(recorder);
        recorder.start();
      });
    }
  }, [recording]);

  const toggleRecording = () => {
    if (recording) {
      mediaRecorder?.stop();
      setRecording(false);
    } else {
      setRecording(true);
    }
  };

  return (
    <button
      onClick={toggleRecording}
      className={`px-4 py-2 rounded font-semibold text-white ${
        recording ? "bg-red-500" : "bg-brand"
      }`}
    >
      {recording ? "Stop Recording" : "🎤 Start Recording"}
    </button>
  );
}
