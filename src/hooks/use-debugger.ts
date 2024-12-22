import { useEffect } from "react";

export const useDebugger = <T>(state: T) => {
  useEffect(() => {
    console.log(state);
  }, [state]);
};
