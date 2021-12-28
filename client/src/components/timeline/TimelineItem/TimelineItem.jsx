import React from 'react';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';

import { getProfileImagePath } from '../../../utils/get_path';
import { formatDate } from '../../../utils/date';
import { ImageArea } from '../../post/ImageArea';
import { MovieArea } from '../../post/MovieArea';
import { SoundArea } from '../../post/SoundArea';
import { LazyLoadImage } from '../../foundation/LazyLoadImage';

/**
 * @param {Element} target
 * @param {Element} currentTarget
 * @returns {boolean}
 */
const isClickedAnchorOrButton = (target, currentTarget) => {
  while (target !== null) {
    const tagName = target.tagName.toLowerCase();
    if (['button', 'a'].includes(tagName)) {
      return true;
    }
    if (currentTarget === target) {
      return false;
    }
    target = target.parentNode;
  }
  return false;
};

/**
 * @typedef {object} Props
 * @property {Models.Post} post
 */

/** @type {React.VFC<Props>} */
const TimelineItem = ({ post, eager }) => {
  /**
   * ボタンやリンク以外の箇所をクリックしたとき かつ 文字が選択されてないとき、投稿詳細ページに遷移する
   * @type {React.MouseEventHandler}
   */
  const handleClick = React.useCallback(
    (ev) => {
      const isSelectedText = document.getSelection().isCollapsed === false;
      if (!isClickedAnchorOrButton(ev.target, ev.currentTarget) && !isSelectedText) {
        route(`/posts/${post.id}`);
      }
    },
    [post],
  );

  return (
    <article className="px-1 hover:bg-gray-50 sm:px-4" onClick={handleClick}>
      <div className="flex pb-4 pt-2 px-2 border-b border-gray-300 sm:px-4">
        <div className="flex-grow-0 flex-shrink-0 pr-2 sm:pr-4">
          <Link
            className="block w-12 h-12 bg-gray-300 border border-gray-300 rounded-full hover:opacity-75 overflow-hidden sm:w-16 sm:h-16"
            href={`/users/${post.user.username}`}
          >
            <LazyLoadImage alt={post.user.profileImage.alt} src={getProfileImagePath(post.user.profileImage.id)} eager={eager} loading="lazy" />
          </Link>
        </div>
        <div className="flex-grow flex-shrink min-w-0">
          <p className="whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">
            <Link className="pr-1 text-gray-800 hover:underline font-bold" href={`/users/${post.user.username}`}>
              {post.user.name}
            </Link>
            <Link className="pr-1 text-gray-500 hover:underline" href={`/users/${post.user.username}`}>
              @{post.user.username}
            </Link>
            <span className="pr-1 text-gray-500">-</span>
            <Link className="pr-1 text-gray-500 hover:underline" href={`/posts/${post.id}`}>
              <time dateTime={new Date(post.createdAt).toISOString()}>
                {formatDate(post.createdAt)}
              </time>
            </Link>
          </p>
          <p className="text-gray-800 leading-relaxed">{post.text}</p>
          {post.images?.length > 0 ? (
            <div className="relative mt-2 w-full">
              <ImageArea images={post.images} eager={eager} />
            </div>
          ) : null}
          {post.movie ? (
            <div className="relative mt-2 w-full">
              <MovieArea movie={post.movie} eager={eager} />
            </div>
          ) : null}
          {post.sound ? (
            <div className="relative mt-2 w-full">
              <SoundArea sound={post.sound} eager={eager} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export { TimelineItem };
