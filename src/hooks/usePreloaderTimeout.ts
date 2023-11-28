import { useEffect, useRef, useState } from "react";

export default function usePreloaderTimeout({ isLoading, timeout = 1000 }: { isLoading: boolean, timeout?: number }) {
  const [loadingInternal, setLoadingInternal] = useState(false);
  const loadingRef = useRef(isLoading);
  loadingRef.current = isLoading;

  useEffect(() => {
    if(!isLoading) {
      const a = setTimeout(() => {
        if(!Boolean(loadingRef.current)) {
          setLoadingInternal(false);
        }
      }, timeout);
    } else {
      setLoadingInternal(true);
    }
  }, [isLoading]);

  return loadingInternal;
}
