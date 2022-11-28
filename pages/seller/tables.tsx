import SellerLayout from "../../components/SellerLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import styles from '../../styles/tables.module.css';


export default (Tables) => {
    return (
<>
        <SellerLayout>
        
        <Table striped style={{width:900, marginLeft:200, marginTop:-300, textAlign:"center"}}>
  
             <thead>
                <tr>
                  <th>예약번호</th>
                  <th>예약자 이름</th>
                  <th>예약자 연락처</th>
                  <th>예약 내용</th>
                  <th>예약금액</th>
                  <th>예약 상태</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>1</th>
                  <th>장근혁</th>
                  <th>01012345678</th>
                  <th>3번,4번 테이블 예약함</th>
                  <th>20000원</th>
                  <th>30분 남음</th>  
                </tr>
              </tbody>
            </Table>
        </SellerLayout>

</>
    )
}
