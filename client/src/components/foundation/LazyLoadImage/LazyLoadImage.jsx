import { useRef } from 'preact/hooks';

import { useHasIntersected } from '../../../hooks/use_has_intersected'

const LazyLoadImage = ({ src, eager, ...props }) => {
  const ref = useRef(null)
  const hasIntersected = useHasIntersected(ref)

  return (
    <img ref={ref} src={eager || hasIntersected ? src : null} {...props} />
  );
};

export { LazyLoadImage };
