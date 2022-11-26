import SellerLayout from "../components/SellerLayout"
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Link from 'next/link'


export default ( {view} ) => {
  const reviewId = 0;

  const getReviewId = (e) => {
    var d = document.getElementById("reviewId")?.innerHTML
    alert(d + "-" )
  }

    return (
        <SellerLayout>
            <Table striped>
              <thead>
                <tr>
                  <th>리뷰 번호</th>
                  <th>등록 일자</th>
                  <th>등록 유저</th>
                  <th>가게 이름</th>
                  <th>메뉴 이름</th>
                  <th>평점</th>
                  <th>내용</th>
                  <th>사진</th> 
                </tr>
              </thead>
              <tbody id = 'reviewBox'>
                {view.map((item) =>( 
                    <>
                    <tr id = 'reviewContent' onClick={getReviewId}>
                        <th id = "reviewId"> {item.review_id} </th>
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
        
        <style jsx>{`
          #reviewContent:hover{background-color : gray;}
        `}</style>

        <div>
            <Link href="reveiewCreate">
                <Button variant="primary" size="lg">리뷰 수정</Button>
            </Link>
            &nbsp;&nbsp;
            <Link href="reviewManage">
                <Button id = "reviewDelete" variant="primary" size="lg">리뷰 삭제</Button>
            </Link>
            &nbsp;&nbsp;
            <Link href="reviewHome">
                <Button variant="primary" size="lg">리뷰 홈</Button>
            </Link>
        </div>
          </SellerLayout>
    )
}

export async function getStaticProps() {
    //내 리뷰 리스트 관리 
    const user_id = 1 //이부분이 문제네... 
    const res = await fetch(`http://localhost:3000/api/reviews/${user_id}`,{method : 'GET'})
    const view = await res.json()
  
    return {
      props: { view }
    }
  }