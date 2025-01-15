import { useState, useCallback } from "react";

export const useScrollState = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true);
  }, []);

  const handleScrollEnd = useCallback(() => {
    setIsScrolling(false);
  }, []);

  return {
    isScrolling,
    handleScrollBegin,
    handleScrollEnd,
  };
};
