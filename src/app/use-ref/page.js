"use client";
import { useEffect, useRef } from "react";

export default function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Fokus input saat halaman dimuat
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault(); // Mencegah default browser (Find in page)
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="text-black"
        placeholder="Ketik di sini..."
      />
    </div>
  );
}
