import React from 'react';

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
const AspectRatioBox = ({ aspectHeight, aspectWidth, children }) => {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${aspectWidth} / ${aspectHeight}` }}>
      {children}
    </div>
  );
};

export { AspectRatioBox };
