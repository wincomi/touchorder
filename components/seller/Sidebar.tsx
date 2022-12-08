import { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

type Props = {
  title: string
}

export default ({ title }: Props) => {
  const router = useRouter()
  const session = useSession()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()

    const element = e.currentTarget
    router.push(element.href)
  }

  return (
    <>
      <div className="flex-shrink-0 p-3 bg-white">
        <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
          <span className="fs-5 fw-semibold">{title} ({session?.data?.user?.store_id}번 가게)</span>
        </a>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
              주문
            </button>
            <div className="collapse show" id="home-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="/seller/orders" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/orders' ? ' active' : '')}>주문 통합 조회</a></li>
                <li><a href="/seller/order_history" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/order_history' ? ' active' : '')}>주문 알림</a></li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
              예약
            </button>
            <div className="collapse show" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="/seller/reservations" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/reservations' ? ' active' : '')}>예약 통합 조회</a></li>
                <li><a href="/seller/reservation_setup" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/reservation_setup' ? ' active' : '')}>예약 설정</a></li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#reviews-collapse" aria-expanded="false">
              매장 관리
            </button>
            <div className="collapse show" id="reviews-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="/seller/setup" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/setup' ? ' active' : '')}>매장 정보 변경</a></li>
                <li><a href="/seller/reviews" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/reviews' ? ' active' : '')}>리뷰 관리</a></li>
                <li><a href="/seller/menus" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/menus' ? ' active' : '')}>상품 설정</a></li>
                <li><a href="/seller/tables" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/tables' ? ' active' : '')}>테이블 설정</a></li>
                <li><a href="/seller/qrcode" onClick={handleClick} className={'link-dark d-inline-flex text-decoration-none rounded' + (router.pathname == '/seller/qrcode' ? ' active' : '')}>QR 코드 생성</a></li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-expanded="false">
              사용자
            </button>
            <div className="collapse show" id="user-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" onClick={() => signOut({callbackUrl: `/`})} className={'link-dark d-inline-flex text-decoration-none rounded'}>로그아웃</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <style jsx>
        {`
              .btn-toggle {
                padding: .25rem .5rem;
                font-weight: 600;
                color: rgba(0, 0, 0, .65);
                background-color: transparent;
              }
              .btn-toggle:hover,
              .btn-toggle:focus {
                color: rgba(0, 0, 0, .85);
                background-color: #d2f4ea;
              }
              
              .btn-toggle::before {
                width: 1.25em;
                line-height: 0;
                content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
                transition: transform .35s ease;
                transform-origin: .5em 50%;
              }
              
              .btn-toggle[aria-expanded="true"] {
                color: rgba(0, 0, 0, .85);
              }
              .btn-toggle[aria-expanded="true"]::before {
                transform: rotate(90deg);
              }
              
              .btn-toggle-nav a {
                padding: .1875rem .5rem;
                margin-top: .125rem;
                margin-left: 1.25rem;
              }
              .btn-toggle-nav a:hover,
              .btn-toggle-nav a:focus,
              .btn-toggle-nav a.active {
                background-color: #d2f4ea;
              }
              `}
      </style>
    </>
  )
}
