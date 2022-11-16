
export default ({ view }) => {
  return (
    <div>
        <ul>  
            {view.map((item) => (
                //이부분 html쓰면 됨 
                //<h1>{item.name} {item.conent} {item.phone} {item.address} {item.store_rating}</h1>
                <li>{item.review_id} {item.regdate} {item.user_name} {item.store_name} {item.menu_name} {item.rating} {item.content} {item.image_url1} {item.image_url2} {item.image_url3}</li>
            ))}
        </ul>
    </div>
    );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/reviews/allReviews')
  const view = await res.json()

  return {
    props: { view }
  }
}