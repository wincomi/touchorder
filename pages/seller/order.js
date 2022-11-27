import {Switch,Route,Link,} from 'react-router-dom';
import "../../../styles/Order.css";
import "../images/banner.png"
import { OrderList } from "./orderList";
import { useState, useEffect } from "react";
import axiosManager from "../../util/axiosManager";
import { MenuBar } from '../MenuBar';

export function Order() {  //js파일은 함수형으로 방출
    const [userId, setUserId] = useState([]);
    const initData = [];
    useEffect(() => {
        axiosManager.axios("/posts", "GET")
        .then((res) => {
            res.forEach((r) => {
                initData.push({
                    id: r.id,
                    title: r.title,
                    request: r.request,
                    client_num: r.client_num,
                    order_num: r.order_num,
                    order_status: r.order_status,
                })
            })
            
            setUserId(initData);
        })
    }, [])
        

    return(
        <>
        <div className="container-fluid">

            <MenuBar></MenuBar>

            <div className="roof">
            &nbsp;&nbsp;판매자 페이지-주문 관리
                <div className="roof2">
                주문목록(2022/10/27)
                </div>
            </div>
            <div className="block">
            {userId.map(order => (
                <OrderList
                    id={order.id}
                    title={order.title}
                    request={order.request}
                    client_num={order.client_num}
                    order_num={order.order_num}
                    order_status={order.order_status}
                ></OrderList>
            ))}
            </div>
            

            {/* <OrderList id={1}></OrderList> */}
            <div className="footer">
            &nbsp;&nbsp;Presented by team Yeolilgop<br />
            &nbsp;&nbsp;Copyright 2022 Yeolilgop, Keimyung.- All rights Reserved.
            </div>

        </div>
        

        </>
    );

    
}