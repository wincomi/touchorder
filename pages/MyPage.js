import 'bootstrap/dist/css/bootstrap.min.css';
import "./seller/images/banner.png"
import "./seller/images/usericon.png"
import styles from '../styles/MyPage.module.css';
/*function profile() {
    const [state, setState]=useState(['회원정보수정','주문 내역','찜한 목록','관심 스토어','관심 상품','상품 리뷰'])
    return(
        <div>
            for
        </div>
    )
};
*/
const Mypage = () => {
    return(
<>

           <div className={styles.banner}>
            &nbsp;&nbsp;마이페이지
           </div>
           
           <div className={styles.leftside}>

            <div className={styles.userbox}>

                &nbsp;사용자 이름</div>

                {/*반복문 사용하면 좋을 듯*/}
                <div className={styles.smallbox}>회원정보수정</div>
                <div className={styles.smallbox}>주문 내역</div>
                <div className={styles.smallbox}>찜한 목록</div>
                <div className={styles.smallbox}>관심 스토어</div>
                <div className={styles.smallbox}>관심 상품</div>
                <div className={styles.smallbox}>상품 리뷰</div>
    
            </div>

            <div className={styles.Footer}>
            &nbsp;&nbsp;Presented by team Yeolilgop<br />
            &nbsp;&nbsp;Copyright 2022 Yeolilgop, Keimyung.- All rights Reserved.
            </div>

</>
    );
}
export default Mypage;