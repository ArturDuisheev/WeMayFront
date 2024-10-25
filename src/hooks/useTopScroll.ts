import { useEffect } from "react";

export const useTopScroll = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
};
