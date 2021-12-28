import { useEffect } from 'preact/hooks';

import { TermPage } from '../../components/term/TermPage';

/** @type {React.VFC} */
const TermContainer = () => {
  useEffect(() => {
    document.title = '利用規約 - CAwitter'
  }, [])

  return <TermPage />;
};

export { TermContainer };
