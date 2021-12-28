import { useCallback, useState } from 'preact/hooks';

import { AuthModalPage } from '../../components/auth_modal/AuthModalPage';
import { Modal } from '../../components/modal/Modal';
import { sendJSON } from '../../utils/fetchers';

/**
 * @typedef {object} Props
 * @property {() => void} onRequestCloseModal
 * @property {(user: Models.User) => void} onUpdateActiveUser
 */

/** @type {React.VFC<Props>} */
const AuthModalContainer = ({ onRequestCloseModal, onUpdateActiveUser }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetError = useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = useCallback(
    async ({ type, ...params }) => {
      try {
        setIsLoading(true);
        if (type === 'signin') {
          const user = await sendJSON('/api/v1/signin', params);
          onUpdateActiveUser(user);
        } else if (type === 'signup') {
          const user = await sendJSON('/api/v1/signup', params);
          onUpdateActiveUser(user);
        }
        onRequestCloseModal();
      } catch (_err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [onRequestCloseModal, onUpdateActiveUser],
  );

  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <AuthModalPage
        hasError={hasError}
        isLoading={isLoading}
        onRequestCloseModal={onRequestCloseModal}
        onResetError={handleResetError}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export { AuthModalContainer };
