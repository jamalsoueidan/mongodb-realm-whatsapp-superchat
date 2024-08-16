import { useLayoutEffect, useState } from "react";

export const useVisualViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(
    window.visualViewport ? window.visualViewport.height : window.innerHeight
  );

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!window.visualViewport) {
        return;
      }

      setViewportHeight(window.visualViewport.height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportHeight;
};
