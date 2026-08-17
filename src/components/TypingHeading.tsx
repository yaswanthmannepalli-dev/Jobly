"use client";

import { useEffect, useState } from "react";

interface TypingHeadingProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  as?: "h1" | "h2" | "h3";
}

export default function TypingHeading({
  text,
  className = "",
  speed = 30,
  as: Tag = "h1",
}: TypingHeadingProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        // Hide cursor after a short delay
        setTimeout(() => setDone(true), 400);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <Tag className={className}>
      {displayed}
      {!done && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block w-[2px] h-[0.85em] bg-current align-middle animate-blink"
        />
      )}
    </Tag>
  );
}
