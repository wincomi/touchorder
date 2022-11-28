import SellerLayout from "@components/seller/SellerLayout"
import { Table } from 'react-bootstrap';
import {PrismaClient} from "@prisma/client";

export default ({orders}) => {
    return (
        <div>
        <SellerLayout>

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

