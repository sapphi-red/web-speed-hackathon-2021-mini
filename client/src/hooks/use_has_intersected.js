import React from 'react';

export const useHasIntersected = ref => {
  const [hasIntersected, setHasIntersected] = React.useState(false);
  const observer = React.useRef(null);

  const cleanOb = () => {
    observer.current?.disconnect()
  }

  React.useEffect(() => {
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
