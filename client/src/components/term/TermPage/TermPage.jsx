import { useState, useEffect, useRef } from 'preact/hooks';
import lazy from 'preact-lazy';

const Loading = () => <p>Loading...</p>
const TermContent = lazy(() => import('../TermContent'), Loading)

/** @type {React.VFC} */
const TermPage = () => {
  const bottomRef = useRef(null)
  const [showUnder, setShowUnder] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowUnder(true)
      }
    })
    if (bottomRef.current) {
      io.observe(bottomRef.current)
    }

    return () => {
      io.disconnect()
    }
  }, [bottomRef]);

  return (
    <article className="pb-16 px-2 leading-relaxed md:pt-2 md:px-4">
      <h1 className="mb-2 mt-4 text-3xl font-bold">利用規約</h1>

      <p>
        この利用規約（以下、「本規約」といいます。）は、株式会社&nbsp;架空の会社（以下、「当社」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
      </p>

      <h2 className="mb-2 mt-4 text-2xl font-bold">第1条（適用）</h2>
      <ol className="pl-8 list-decimal">
        <li>本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
        <li>
          当社は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
        </li>
        <li>
          本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
        </li>
      </ol>

      <h2 className="mb-2 mt-4 text-2xl font-bold">第2条（利用登録）</h2>
      <ol className="pl-8 list-decimal">
        <li>
          本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこの承認を登録希望者に通知することによって、利用登録が完了するものとします。
        </li>
        <li>
          当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
          <ol className="pl-8 list-decimal">
            <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
            <li>本規約に違反したことがある者からの申請である場合</li>
            <li>その他、当社が利用登録を相当でないと判断した場合</li>
          </ol>
        </li>
      </ol>

      <h2 className="mb-2 mt-4 text-2xl font-bold">第3条（ユーザーIDおよびパスワードの管理）</h2>
      <ol className="pl-8 list-decimal">
        <li>ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</li>
        <li>
          ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当社は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
        </li>
        <li>
          ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当社に故意又は重大な過失がある場合を除き、当社は一切の責任を負わないものとします。
        </li>
      </ol>

      <h2 className="mb-2 mt-4 text-2xl font-bold">第4条（利用料金および支払方法）</h2>
      <ol className="pl-8 list-decimal">
        <li>
          ユーザーは、本サービスの有料部分の対価として、当社が別途定め、本ウェブサイトに表示する利用料金を、当社が指定する方法により支払うものとします。
        </li>
        <li>
          ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14．6％の割合による遅延損害金を支払うものとします。
        </li>
      </ol>

      <div ref={bottomRef}></div>

      {
        showUnder
          ? <TermContent />
          : null
      }
    </article>
  );
};

export { TermPage };
