import { MenuBar } from "../MenuBar";
import { Link } from "react-router-dom";
export function MenuManage(){
    return(
        <>
            <div className="NavBar">
                <Link to={"/orderManage"}><button className="btn1">주문</button></Link> 
                <Link to={"/menuManage"}><button className="btn2">메뉴</button></Link>
                <Link to={"/reserveManage"}><button className="btn3">예약</button></Link>
                <Link to={"/mypage"}><button className="btn4">마이페이지</button></Link>      
                
                
            </div>
            <h1>메뉴관리 페이지</h1> 
            
        </>
    );
}