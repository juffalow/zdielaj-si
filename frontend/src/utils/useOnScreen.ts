import { useCallback, useState } from "react";

const useOnScreen = ({
  root = null,
  rootMargin = "0px",
  threshold = 0
} = {}) => {
  const [observer, setOserver] = useState<IntersectionObserver>();
  const [isIntersecting, setIntersecting] = useState(false);

  const measureRef = useCallback(
    (node: HTMLElement) => {
      if (node) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );

        observer.observe(node);
        setOserver(observer);
      }
    },
    [root, rootMargin, threshold]
  );

  return { measureRef, isIntersecting, observer };
};

export default useOnScreen;
