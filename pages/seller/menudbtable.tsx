import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {
    const [menudb, setmenudb] = useState([{
        menu_id: '',
        name: '',
        content: '',
        price: '',
        category: '',
        image_url: '',
        status: '' //품절or 판매가능
      }])
    const [index, setindex] = useState(0)
    useEffect(() => {
        
    },[])
    return (

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