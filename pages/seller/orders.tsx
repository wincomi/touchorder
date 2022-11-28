import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import { Table } from 'react-bootstrap';

export default ({ orders }) => {
    return (
        <SellerLayout>
          <HeaderTitle title="주문 관리" subtitle="주문 조회" />
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
                  <td>접수</td>
                  <td>2022-10-11</td>
                  <td>10105546</td>
                  <td>주문접수</td>
                </tr>
              </tbody>
            </Table>
          </SellerLayout>
    )
}
