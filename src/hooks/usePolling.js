import { useEffect } from "react";

export default function usePolling(
  callback,
  delay = 3000
) {
  useEffect(() => {
    callback();

    const interval = setInterval(
      callback,
      delay
    );

    return () =>
      clearInterval(interval);
  }, [delay]);
}