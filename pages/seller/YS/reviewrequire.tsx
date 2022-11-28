
export default ({ view }) => {
    //메인 리뷰페이지 여기서 시작
    return (
      <div>
          <ul>  
              {view.map((item) => (
                  // 이부분에서 버튼이나 링크등 가는데 만들던가? html쓰면 됨  
                  // 리뷰 작성(POST), 내 리뷰 보기(GET) =>여기서 api/reviews/1 등으로 해서 자기 리뷰페이지만 나오던가?
                  // 리뷰 수정(PUT), 리뷰 삭제(DELETE) 
                  // 자세한 건 내가 보낸 사이트 및 api/reviews/[user_id].tsx 참고 
                  <li>{item.review_id} {item.regdate} {item.user_name} {item.store_name} {item.menu_name} {item.rating} {item.content} {item.image_url1} {item.image_url2} {item.image_url3}</li>
              ))}
          </ul>
      </div>
      );
  }
  
  export async function getStaticProps() {
    //모든 리뷰 리스트 
    const res = await fetch('http://localhost:3000/api/reviews/allReviews')
    const view = await res.json()
  
    return {
      props: { view }
    }
  }