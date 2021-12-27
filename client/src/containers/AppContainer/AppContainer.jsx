import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

import PostContainer from '../PostContainer';
import TermContainer from '../TermContainer';
import TimelineContainer from '../TimelineContainer';
import UserProfileContainer from '../UserProfileContainer';

const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));

const AuthModalContainer = React.lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = React.lazy(() => import('../NewPostModalContainer'));

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route element={<TimelineContainer />} path="/" />
          <Route element={<UserProfileContainer />} path="/users/:username" />
          <Route element={<PostContainer />} path="/posts/:postId" />
          <Route element={<TermContainer />} path="/terms" />
          <Route element={<React.Suspense fallback={<p></p>}><NotFoundContainer /></React.Suspense>} path="*" />
        </Routes>
      </AppPage>

      {modalType === 'auth' ? (
        <React.Suspense fallback={<p></p>}><AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} /></React.Suspense>
      ) : null}
      {modalType === 'post' ? <React.Suspense fallback={<p></p>}><NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /></React.Suspense> : null}
    </>
  );
};

export { AppContainer };
