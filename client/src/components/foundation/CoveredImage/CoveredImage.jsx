/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src, children }) => {
  return (
    <picture className="w-full h-full overflow-hidden">
      {children}
      <img
        alt={alt}
        className="w-full h-full max-w-none object-cover"
        src={src}
      />
    </picture>
  );
};

export { CoveredImage };
