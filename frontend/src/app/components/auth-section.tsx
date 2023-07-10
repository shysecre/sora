"use client";

import { useEffect, useState } from "react";

export default function AuthSection() {
  const [doAuth, setDoAuth] = useState(false);
  const [link, setLink] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    if (!doAuth) return;

    const fetchUrl = async () => {
      const response = await fetch("http://localhost:443/api/auth", {
        cache: "no-store",
      });

      const data = await response.json();

      setLink(data.link);
      setState(data.state);
    };

    fetchUrl();
  }, [doAuth]);

  useEffect(() => {
    if (!link || !state) return;

    localStorage.setItem("authState", state);

    window.location.replace(link);
  }, [link, state]);

  return (
    <div>
      <button
        className="border-none bg-emerald-300 bg-opacity-50 rounded-lg px-2 py-1"
        onClick={() => setDoAuth(true)}
      >
        Auth using Twitch
      </button>
    </div>
  );
}
