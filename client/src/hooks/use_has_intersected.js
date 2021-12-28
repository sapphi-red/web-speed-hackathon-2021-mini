import { useEffect, useState, useRef } from 'preact/hooks';

export const useHasIntersected = ref => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const observer = useRef(null);

  const cleanOb = () => {
    observer.current?.disconnect()
  }

  useEffect(() => {
    if (!ref.current) return
    cleanOb()

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true)
        cleanOb()
      }
    })
    observer.current.observe(ref.current);

    return () => {
      cleanOb()
    }
  }, [ref])

  return hasIntersected;
}
