import React from 'react';

import { useHasIntersected } from '../../../hooks/use_has_intersected'

const LazyLoadImage = ({ src, eager, ...props }) => {
  const ref = React.useRef(null)
  const hasIntersected = useHasIntersected(ref)

  return (
    <img ref={ref} src={eager || hasIntersected ? src : null} {...props} />
  );
};

export { LazyLoadImage };
