import classNames from 'classnames';

/**
 * @typedef {object} Props
 * @property {string} accept
 * @property {boolean} active
 * @property {React.ReactNode} icon
 * @property {React.ChangeEventHandler<HTMLInputElement>} onInput
 */

/** @type {React.VFC<Props>} */
const AttachFileInputButton = ({ accept, active, icon, onInput }) => {
  return (
    <label className="relative flex items-center justify-center focus-within:outline-black cursor-pointer">
      <span
        className={classNames('flex items-center justify-center w-12 h-12 rounded-full', {
          'bg-gray-100': !active,
          'bg-green-100': active,
        })}
      >
        {icon}
      </span>
      <input multiple accept={accept} className="sr-only" onInput={onInput} type="file" />
    </label>
  );
};

export { AttachFileInputButton };
