import React from 'react';

import { useHasIntersected } from '../../../hooks/use_has_intersected'

/**
 * @typedef {object} Props
 * @property {number} aspectHeight
 * @property {number} aspectWidth
 * @property {React.ReactNode} children
 */

/**
 * 親要素の横幅を基準にして、指定したアスペクト比のブロック要素を作ります
 * @type {React.VFC<Props>}
 */
const AspectRatioBox = ({ aspectHeight, aspectWidth, children, eager }) => {
  const ref = React.useRef(null)
  const hasIntersected = useHasIntersected(ref)

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }}>
      {eager || hasIntersected ? children : null}
    </div>
  );
};

export { AspectRatioBox };
