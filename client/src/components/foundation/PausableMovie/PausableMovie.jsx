import classNames from 'classnames';
import { useRef, useState, useCallback } from 'preact/hooks';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src, eager }) => {
  /** @type {React.RefObject<HTMLVideoElement>} */
  const videoRef = useRef(null);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const handleClick = useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1} eager={eager}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <video src={src} ref={videoRef} className="w-full" muted autoPlay={!prefersReducedMotion} loop />
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };
