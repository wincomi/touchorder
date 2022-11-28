import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect} from "react";
function sidebar() {
    useEffect(()=>{
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    })
    
    return (
        <div>
            <div className="flex-shrink-0 p-3 bg-white" style={{width: 160, margin:10}}>

                <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <span className="fs-5 fw-semibold">터치오더</span>
                </a>
                <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                    주문관리
                    </button>
                    <div className="collapse show" id="home-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">주문정보 조회</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">주문변경/취소</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">주문알림</a></li>
                    </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                    예약관리
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">예약조회</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">예약추가/취소</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">예약설정</a></li>
                    </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                    메뉴관리
                    </button>
                    <div className="collapse" id="orders-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="/seller/menus" className="link-dark d-inline-flex text-decoration-none rounded">메뉴정보</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">재고관리</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">리뷰조회</a></li>
                    </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                    계정
                    </button>
                    <div className="collapse" id="account-collapse">
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">New...</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Profile</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Settings</a></li>
                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Sign out</a></li>
                    </ul>
                    </div>
                </li>
                </ul>
            </div>

            <style jsx>
                {`
                .dropdown-toggle { outline: 0; }

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
                .btn-toggle-nav a:focus {
                  background-color: #d2f4ea;
                }
                
                .scrollarea {
                  overflow-y: auto;
                }
                
                .b-example-divider {
                  height: 3rem;
                  background-color: rgba(0, 0, 0, .1);
                  border: solid rgba(0, 0, 0, .15);
                  border-width: 1px 0;
                  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
                
                }
                
                .b-example-vr {
                  flex-shrink: 0;
                  width: 1.5rem;
                  height: 100vh;
                }
                
                `}
            </style>  

        </div>
    );
}

  
  export default sidebar;