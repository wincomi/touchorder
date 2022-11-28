import SellerLayout from "../../components/SellerLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap';
import styles from '../../styles/tables.module.css';


export default (Tables) => {
    return (
<>
        <div>
        <SellerLayout>
<pre>2
    테이블 예약관리 - tables.tsx
 \예약조회
 \예약추가/취소
 \예약금 설정
</pre>
    <Form>
    <div className="container">
    <div className="cell-a">1</div>
    <div className="cell-b">2</div>
    <div className="cell-c">3</div>
    <div className="cell-d">4</div>
    </div>
    </Form>    
        </SellerLayout>
        </div>
</>
    )
}
