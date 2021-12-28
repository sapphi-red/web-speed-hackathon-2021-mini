import React from 'react';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';

const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));

/** @type {React.VFC} */
const UserProfileContainer = ({ username }) => {
  const { data: user, isLoading: isLoadingUser } = useFetch(`/api/v1/users/${username}`, fetchJSON);
  const { data: posts, fetchMore } = useInfiniteFetch(`/api/v1/users/${username}/posts`, fetchJSON);

  React.useEffect(() => {
    if (isLoadingUser) {
      document.title = '読込中 - CAwitter'
    } else if (user !== null) {
      document.title = `${user.name} さんのタイムライン - CAwitter`
    }
  }, [isLoadingUser, user])

  if (!isLoadingUser && user === null) {
    return <React.Suspense fallback={<p></p>}><NotFoundContainer /></React.Suspense>;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <UserProfilePage timeline={posts} user={user} />
    </InfiniteScroll>
  );
};

export { UserProfileContainer };
