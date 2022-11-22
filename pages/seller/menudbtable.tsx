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
    useEffect(async() => {
        
    },[])
    return (

    ) 
 }