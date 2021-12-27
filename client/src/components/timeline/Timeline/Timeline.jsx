import React from 'react';

import { TimelineItem } from '../TimelineItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

/** @type {React.VFC<Props>} */
const Timeline = ({ timeline, eager }) => {
  return (
    <section>
      {timeline.map((post, idx) => {
        return <TimelineItem key={post.id} post={post} eager={eager && idx === 0} />;
      })}
    </section>
  );
};

export { Timeline };
