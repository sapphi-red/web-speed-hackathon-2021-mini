import React from 'react';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { TimelinePage } from '../../components/timeline/TimelinePage';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';

/** @type {React.VFC} */
const TimelineContainer = () => {
  const { data: posts, fetchMore } = useInfiniteFetch('/api/v1/posts', fetchJSON);

  React.useEffect(() => {
    document.title = 'タイムライン - CAwitter'
  }, [])

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <TimelinePage timeline={posts} />
    </InfiniteScroll>
  );
};

export { TimelineContainer };
