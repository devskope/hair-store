import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = {}) => {
  const { rootMargin = '0px', threshold = 0 } = options;

  const [observedEntry, updateObservedEntry] = useState({});
  const [domNode, setDomNode] = useState(null);
  const [root, setRootNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer && observer.current) {
      observer.current.disconnect;
    }

    observer.current = new window.IntersectionObserver(
      ([entry]) => updateObservedEntry(entry),
      {
        root,
        rootMargin,
        threshold,
      }
    );

    if (domNode) observer.current.observe(domNode);

    return () => observer.current.disconnect();
  }, [domNode, root, rootMargin, threshold]);

  return { setDomNode, setRootNode, observedEntry };
};

export default useIntersectionObserver;
