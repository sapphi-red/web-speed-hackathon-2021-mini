import { useState, useCallback } from 'preact/hooks'
import { Link } from 'preact-router/match';

import { ModalErrorMessage } from '../../modal/ModalErrorMessage';
import { ModalSubmitButton } from '../../modal/ModalSubmitButton';
import { AuthInput } from '../AuthInput';

/**
 * @typedef {object} SubmitParams
 * @property {string} name
 * @property {string} password
 * @property {'signin' | 'signup'} type
 * @property {string} username
 */

/**
 * @typedef {object} Props
 * @property {boolean} hasError
 * @property {boolean} isLoading
 * @property {() => void} onRequestCloseModal
 * @property {() => void} onResetError
 * @property {(params: SubmitParams) => void} onSubmit
 */

/** @type {React.VFC<Props>} */
const AuthModalPage = ({ hasError, isLoading, onRequestCloseModal, onResetError, onSubmit }) => {
  /** @type {[SubmitParams, (params: SubmitParams) => SubmitParams]} */
  const [params, setParams] = useState({ name: '', password: '', type: 'signin', username: '' });

  const handleToggleType = useCallback(() => {
    onResetError();
    setParams((params) => ({
      ...params,
      type: params.type === 'signin' ? 'signup' : 'signin',
    }));
  }, [onResetError]);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeUsername = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      username: value,
    }));
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangeName = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      name: value,
    }));
  }, []);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleChangePassword = useCallback((ev) => {
    const value = ev.currentTarget.value;
    setParams((params) => ({
      ...params,
      password: value,
    }));
  }, []);

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault();
      onResetError();
      onSubmit(params);
    },
    [params, onSubmit, onResetError],
  );

  const isFilled =
    params.username !== '' && params.password !== '' && (params.type === 'signup' ? params.name !== '' : true);

  return (
    <section>
      <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">{params.type === 'signin' ? 'サインイン' : '新規登録'}</h2>
        <p className="mt-4">
          <button className="text-green-600 underline" onClick={handleToggleType} type="button">
            {params.type === 'signin' ? '初めての方はこちら' : 'サインインはこちら'}
          </button>
        </p>
        <div className="mt-8">
          <AuthInput label="ユーザー名" onInput={handleChangeUsername} type="text" />
        </div>
        {params.type === 'signup' ? (
          <div className="mt-4">
            <AuthInput label="名前" onInput={handleChangeName} type="text" />
          </div>
        ) : null}
        <div className="mt-4">
          <AuthInput
            autoComplete={params.type === 'signup' ? 'new-password' : 'current-password'}
            label="パスワード"
            onInput={handleChangePassword}
            type="password"
          />
        </div>
        {params.type === 'signup' ? (
          <p className="mt-4">
            <Link className="text-green-600 underline" onClick={onRequestCloseModal} href="/terms">
              利用規約
            </Link>
            に同意して
          </p>
        ) : null}
        <p className="mt-4">
          <ModalSubmitButton disabled={isLoading || !isFilled} loading={isLoading}>
            {params.type === 'signin' ? 'サインイン' : '登録する'}
          </ModalSubmitButton>
        </p>
        <p className="mt-4">
          <ModalErrorMessage>
            {hasError ? (params.type === 'signin' ? 'パスワードが異なります' : 'ユーザー名が使われています') : null}
          </ModalErrorMessage>
        </p>
      </form>
    </section>
  );
};

export { AuthModalPage };
