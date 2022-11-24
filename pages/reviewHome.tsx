import SellerLayout from "../components/SellerLayout"
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Link from 'next/link'


export default ( {view} ) => {
    const[reviewData, setReveiwData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/reviews/allReviewsList')
        .then(res => res.json())
        .then(data => {
        setReveiwData(data);
        }).catch((e) => {console.log(e)});
    }, []);

    return (
        <SellerLayout>
            <Table striped>
              <thead>
                <tr>
                  <th>등록 일자</th>
                  <th>등록 유저</th>
                  <th>가게 이름</th>
                  <th>메뉴 이름</th>
                  <th>평점</th>
                  <th>내용</th>
                  <th>사진</th> 
                </tr>
              </thead>
              <tbody>
                {view.map((item) =>( 
                    <>
                    <tr>
                        <th> {item.regdate} </th>
                        <th> {item.user_name} </th>
                        <th> {item.store_name} </th>
                        <th> {item.menu_name} </th>
                        <th>  {item.rating} </th>
                        <th> {item.content} </th>
                        <th> 사진없어 </th>
                    </tr>
                    </>
                ))}
              </tbody>
            </Table>
        
        <div>
            <Link href="reveiewCreate">
                <Button variant="primary" size="lg">리뷰 생성</Button>
            </Link>
            &nbsp;&nbsp;
            <Link href="seller/managementReview">
                <Button variant="primary" size="lg">리뷰 관리</Button>
            </Link>
        </div>
          </SellerLayout>
    )
}

export async function getStaticProps() {
    //모든 리뷰 리스트 
    const res = await fetch('http://localhost:3000/api/reviews/allReviewList')
    const view = await res.json()
  
    return {
      props: { view }
    }
  }