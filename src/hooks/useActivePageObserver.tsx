import { useEffect, useState, MutableRefObject } from 'react';

const useActivePageObserver = (pageRefs: MutableRefObject<HTMLDivElement[]>): number | null => {
  const [activePageIndex, setActivePageIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePageIndex(pageRefs.current.indexOf(entry.target as HTMLDivElement));
        }
      })
      },
      {
        root: null, // Use viewport as the root
        rootMargin: '0px',
        threshold: 0.5,
      }
    )

    const currentRefs = pageRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    })

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      })  
    }
  });

  return activePageIndex;
};

export default useActivePageObserver;