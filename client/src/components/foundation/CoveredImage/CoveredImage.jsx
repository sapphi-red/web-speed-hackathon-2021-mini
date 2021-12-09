import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <img
        alt={alt}
        className="w-full h-full max-w-none object-cover"
        src={src}
      />
    </div>
  );
};

export { CoveredImage };
