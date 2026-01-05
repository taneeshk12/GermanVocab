"use client";

import { useCallback } from "react";

export function useTextToSpeech() {
    const speak = useCallback((text: string, lang: string = "de-DE") => {
        if (typeof window === "undefined") return;

        // Clean text for URL
        const cleanText = encodeURIComponent(text);

        // 1. Try Google Translate TTS (High Quality, Free Unofficial)
        // Works by creating an audio element. Limitations: Character limit (~200 chars), requires network.
        if (text.length < 200) {
            try {
                // client=tw-ob is a known robust client param for this
                const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=de&q=${cleanText}`;
                const audio = new Audio(url);

                // If it loads, play it. If error, fallback.
                audio.play().catch((e) => {
                    console.warn("Google TTS failed, falling back to browser API", e);
                    fallbackToBrowserTTS(text, lang);
                });
                return;
            } catch (e) {
                console.warn("Google TTS setup failed", e);
            }
        }

        // 2. Fallback: Browser Web Speech API
        fallbackToBrowserTTS(text, lang);

    }, []);

    const fallbackToBrowserTTS = (text: string, lang: string) => {
        if (!("speechSynthesis" in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;

        const voices = window.speechSynthesis.getVoices();
        const germanVoice = voices.find(v => v.lang.startsWith("de") && !v.name.includes("Google")); // Prefer native over Google's low-res web speech if local exists
        const bestVoice = germanVoice || voices.find(v => v.lang.startsWith("de"));

        if (bestVoice) {
            utterance.voice = bestVoice;
        }

        window.speechSynthesis.speak(utterance);
    };

    return { speak };
}
