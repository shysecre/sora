import { useEffect } from "react";

/*

  Disabling this rule for line #12 because of we need this empty
  dependency array for useEffect hook to work only on first render
  of the element that hook will be used in to

*/

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useOnMount = (fun: () => void) => useEffect(fun, []);
