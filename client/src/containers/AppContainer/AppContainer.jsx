import { Fragment } from 'preact'
import { useCallback, useState, useEffect } from 'preact/hooks';
import Router from 'preact-router';
import lazy from 'preact-lazy';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';

import PostContainer from '../PostContainer';
import TermContainer from '../TermContainer';
import TimelineContainer from '../TimelineContainer';
import UserProfileContainer from '../UserProfileContainer';

const NotFoundContainer = lazy(() => import('../NotFoundContainer'));

const AuthModalContainer = lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = lazy(() => import('../NewPostModalContainer'));

/** @type {React.VFC} */
const AppContainer = () => {
  const onRouteChange = useCallback(() => {
    window.scrollTo(0, 0);
  }, [])

  const [activeUser, setActiveUser] = useState(null);
  const { data } = useFetch('/api/v1/me', fetchJSON);
  useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = useState('none');
  const handleRequestOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = useCallback(() => setModalType('none'), []);

  return (
    <Fragment>
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
          <NotFoundContainer default />
        </Router>
      </AppPage>

      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </Fragment>
  );
};

export { AppContainer };
