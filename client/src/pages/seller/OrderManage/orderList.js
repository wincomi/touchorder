import "./Order.css";

export function OrderList({id, title, request, client_num, order_num, order_status}){
    return(
        <>
        <div className="orderlist">
                    {title}<br />
                    -요청사항<br />
                    {request}<br />
                    고객번호:{client_num}<br />
                    주문번호:{order_num}<br />     
                    {order_status}
        </div>
        
        </>
    );
}