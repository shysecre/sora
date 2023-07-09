import { useState, useEffect } from "react";

export function useSearchDebounce(
  delay = 250
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayFn = setTimeout(() => setSearch(searchQuery), delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  return [search, setSearchQuery];
}
