"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mic, StopCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import Image from "next/image";
import Overlay from "./Overlay";
import { useTranslations } from "next-intl";

const AudioRecorder = ({ setAudioURLState, workerId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const streamRef = useRef(null);
  const t = useTranslations("AudioRecorder")

  const getMimeType = () => {
    const types = [
      'audio/webm',
      'audio/mp4',
      'audio/wav',
      'audio/ogg'
    ];
    for (let type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return 'audio/webm'; // Fallback
  };

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = getMimeType();
      mediaRecorder.current = new MediaRecorder(stream, { mimeType });
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURLState(audioUrl, workerId);
        audioChunks.current = [];
      };

      mediaRecorder.current.start(10); // Start recording in 10ms chunks
      setIsRecording(true);
    } catch (err) {
      handleError(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
    }
  };

  const handleError = (err) => {
    console.error('Recording error:', err);
    let message = "An error occurred while accessing the microphone. ";
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      message += "Please grant microphone permissions and try again.";
    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      message += "No microphone was found on your device.";
    } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      message += "Your microphone is busy or unavailable.";
    } else if (err.name === 'OverconstrainedError') {
      message += "No suitable microphone found.";
    } else if (err.name === 'TypeError') {
      message += "No permission to use microphone.";
    } else {
      message += "Please check your browser settings and try again.";
    }
    setError(message);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {error && (
        <Overlay isOpen={!!error}>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button variant="destructive" onClick={() => setError(null)}>
              {t("Close")}
            </Button>
          </div>
        </Overlay>
      )}
      <div className="flex justify-center space-x-4">
        {!isRecording ? (
          <button onClick={startRecording}>
            <Image
              src="/Microphone.svg"
              alt="Start Recording"
              width={29}
              height={29}
              className="max-w-none"
            />
          </button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="destructive"
            className="rounded-full"
            size="icon"
          >
            <StopCircle className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;