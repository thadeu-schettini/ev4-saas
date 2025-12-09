import { useState, useEffect, useCallback } from "react";

interface UseLoadingOptions {
  initialDelay?: number;
  minLoadingTime?: number;
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { initialDelay = 0, minLoadingTime = 800 } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialDelay + minLoadingTime);

    return () => clearTimeout(timer);
  }, [initialDelay, minLoadingTime]);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, startLoading, stopLoading };
}

export function useSimulatedLoading(duration: number = 1000) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
}
