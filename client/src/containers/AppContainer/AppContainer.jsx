import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

const AuthModalContainer = React.lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = React.lazy(() => import('../NewPostModalContainer'));

const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));
const PostContainer = React.lazy(() => import('../PostContainer'));
const TermContainer = React.lazy(() => import('../TermContainer'));
const TimelineContainer = React.lazy(() => import('../TimelineContainer'));
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer'));

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
          <Route element={<React.Suspense fallback={<p></p>}><TimelineContainer /></React.Suspense>} path="/" />
          <Route element={<React.Suspense fallback={<p></p>}><UserProfileContainer /></React.Suspense>} path="/users/:username" />
          <Route element={<React.Suspense fallback={<p></p>}><PostContainer /></React.Suspense>} path="/posts/:postId" />
          <Route element={<React.Suspense fallback={<p></p>}><TermContainer /></React.Suspense>} path="/terms" />
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
