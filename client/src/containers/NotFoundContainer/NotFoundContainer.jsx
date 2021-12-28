import { useEffect } from 'preact/hooks';

import { NotFoundPage } from '../../components/application/NotFoundPage';

/** @type {React.VFC} */
const NotFoundContainer = () => {
  useEffect(() => {
    document.title = 'ページが見つかりません - CAwitter'
  }, [])

  return <NotFoundPage />
};

export { NotFoundContainer };
