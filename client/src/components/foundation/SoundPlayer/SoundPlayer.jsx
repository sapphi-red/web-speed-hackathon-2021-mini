import React from 'react';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { getSoundPath } from '../../../utils/get_path';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { SoundWaveSVG } from '../SoundWaveSVG';

/**
 * @typedef {object} Props
 * @property {Models.Sound} sound
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundPlayer = ({ sound }) => {
  const [currentTimeRatio, setCurrentTimeRatio] = React.useState(0);
  /** @type {React.ReactEventHandler<HTMLAudioElement>} */
  const handleTimeUpdate = React.useCallback((ev) => {
    const el = ev.currentTarget;
    setCurrentTimeRatio(el.currentTime / el.duration);
  }, []);

  /** @type {React.RefObject<HTMLAudioElement>} */
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const handleTogglePlaying = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-300">
      <audio ref={audioRef} loop={true} onTimeUpdate={handleTimeUpdate} src={getSoundPath(sound.id)} preload="none" />
      <div className="p-2">
        <button
          className="flex items-center justify-center w-8 h-8 text-white text-sm bg-blue-600 rounded-full hover:opacity-75"
          onClick={handleTogglePlaying}
          type="button"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      </div>
      <div className="flex flex-col flex-grow flex-shrink pt-2 min-w-0 h-full">
        <p className="whitespace-nowrap text-sm font-bold overflow-hidden overflow-ellipsis">{sound.title}</p>
        <p className="text-gray-500 whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">{sound.artist}</p>
        <div className="pt-2">
          <AspectRatioBox aspectHeight={1} aspectWidth={10}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full">
                <SoundWaveSVG id={sound.id} />
              </div>
              <div
                className="absolute inset-0 w-full h-full bg-gray-300 opacity-75"
                style={{ left: `${currentTimeRatio * 100}%` }}
              ></div>
            </div>
          </AspectRatioBox>
        </div>
      </div>
    </div>
  );
};

export { SoundPlayer };
