import { getMoviePath } from '../../../utils/get_path';
import { PausableMovie } from '../../foundation/PausableMovie';

/**
 * @typedef {object} Props
 * @property {Models.Movie} movie
 */

/** @type {React.VFC<Props>} */
const MovieArea = ({ movie, eager }) => {
  return (
    <div className="relative w-full h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      <PausableMovie src={getMoviePath(movie.id)} eager={eager} />
    </div>
  );
};

export { MovieArea };
