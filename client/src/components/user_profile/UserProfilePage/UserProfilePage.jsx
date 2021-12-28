import { Fragment } from 'preact'

import { Timeline } from '../../timeline/Timeline';
import { UserProfileHeader } from '../UserProfileHeader';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 * @property {Models.User} user
 */

/** @type {React.VFC<Props>} */
const UserProfilePage = ({ timeline, user }) => {
  return (
    <Fragment>
      <UserProfileHeader user={user} />
      <div className="mt-6 border-t border-gray-300">
        <Timeline timeline={timeline} eager />
      </div>
    </Fragment>
  );
};

export { UserProfilePage };
