import React from 'react';
import Router from 'preact-router';

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
  const onRouteChange = React.useCallback(() => {
    window.scrollTo(0, 0);
  })

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
        <Router onChange={onRouteChange}>
          <TimelineContainer path="/" />
          <UserProfileContainer path="/users/:username" />
          <PostContainer path="/posts/:postId" />
          <TermContainer path="/terms" />
          <React.Suspense fallback={<p></p>} default><NotFoundContainer /></React.Suspense>
        </Router>
      </AppPage>

      {modalType === 'auth' ? (
        <React.Suspense fallback={<p></p>}><AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} /></React.Suspense>
      ) : null}
      {modalType === 'post' ? <React.Suspense fallback={<p></p>}><NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /></React.Suspense> : null}
    </>
  );
};

export { AppContainer };
