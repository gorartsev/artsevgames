"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type AudioContextValue = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.volume = 0.22;
  }, []);

  const play = () => {
    ref.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };
  const pause = () => {
    ref.current?.pause();
    setIsPlaying(false);
  };
  const toggle = () => (isPlaying ? pause() : play());

  return (
    <AudioCtx.Provider value={{ isPlaying, play, pause, toggle }}>
      <audio ref={ref} src="/bg-music.mp3" loop preload="auto" />
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within <AudioProvider>");
  return ctx;
}
