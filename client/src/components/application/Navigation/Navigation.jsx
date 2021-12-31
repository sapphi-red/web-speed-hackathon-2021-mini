import React from 'react';
import { faSignInAlt, faEdit, faUser, faHome, faBalanceScale } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';
import { NavigationItem } from '../NavigationItem';

/**
 * @typedef {object} Props
 * @property {Models.User | null} activeUser
 * @property {() => void} onRequestOpenAuthModal
 * @property {() => void} onRequestOpenPostModal
 */

/** @type {React.VFC<Props>} */
const Navigation = ({ activeUser, onRequestOpenAuthModal, onRequestOpenPostModal }) => {
  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
      <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
        <NavigationItem href="/" icon={<FontAwesomeIcon icon={faHome} />} text="ホーム" />
        {activeUser !== null ? (
          <NavigationItem
            icon={<FontAwesomeIcon icon={faEdit} />}
            onClick={onRequestOpenPostModal}
            text="投稿する"
          />
        ) : null}
        {activeUser !== null ? (
          <NavigationItem
            href={`/users/${activeUser.username}`}
            icon={<FontAwesomeIcon icon={faUser} />}
            text="マイページ"
          />
        ) : null}
        {activeUser === null ? (
          <NavigationItem
            icon={<FontAwesomeIcon icon={faSignInAlt} />}
            onClick={onRequestOpenAuthModal}
            text="サインイン"
          />
        ) : null}
        <NavigationItem
          href="/terms"
          icon={<FontAwesomeIcon icon={faBalanceScale} />}
          text="利用規約"
        />
      </ul>
    </nav>
  );
};

export { Navigation };
