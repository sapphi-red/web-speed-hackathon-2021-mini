import React from 'react';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { PostPage } from '../../components/post/PostPage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';

const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));

/** @type {React.VFC} */
const PostContainer = ({ postId }) => {

  const { data: post, isLoading: isLoadingPost } = useFetch(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch(`/api/v1/posts/${postId}/comments`, fetchJSON);

  React.useEffect(() => {
    if (isLoadingPost) {
      document.title = '読込中 - CAwitter'
    } else if (post !== null) {
      document.title = `${post.user.name} さんのつぶやき - CAwitter`
    }
  }, [isLoadingPost, post])

  if (!isLoadingPost && post === null) {
    return <React.Suspense fallback={<p></p>}><NotFoundContainer /></React.Suspense>;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={post ? comments : []}>
      <PostPage comments={comments} post={post} />
    </InfiniteScroll>
  );
};

export { PostContainer };
