import { useCallback, useState } from "react";

const useOnScreen = ({
  root = null,
  rootMargin = "0px",
  threshold = 0.4
} = {}) => {
  const [observer, setOserver] = useState<IntersectionObserver>();
  const [isIntersecting, setIntersecting] = useState(false);

  const measureRef = useCallback(
    (node: HTMLElement) => {
      if (node) {
        const newObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              newObserver.unobserve(entry.target);
            }

            setIntersecting(entry.isIntersecting);
          },
          { root, rootMargin, threshold }
        );

        newObserver.observe(node);
        setOserver(newObserver);
      }
    },
    [root, rootMargin, threshold]
  );

  return { measureRef, isIntersecting, observer };
};

export default useOnScreen;