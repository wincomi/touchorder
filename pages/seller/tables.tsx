import SellerLayout from "../../components/SellerLayout"
export default (Tables) => {
    return (
        <div>
        <SellerLayout>
<pre>
    테이블 예약관리 - tables.tsx
 \예약조회
 \예약추가/취소
 \예약금 설정
</pre>
            <Table striped>
             <thead>
                <tr>
                  <th>선택</th>
                  <th>주문날짜</th>
                  <th>주문번호</th>
                  <th>상태</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>접수</th>
                  <th>2022-10-11</th>
                  <th>10105546</th>
                  <th>주문접수</th>
                </tr>
              </tbody>
            </Table>
        

        </SellerLayout>
        </div>

    )
}