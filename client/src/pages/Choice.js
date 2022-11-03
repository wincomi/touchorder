import { Button } from 'react-bootstrap';
import "./Choice.css";

const Choice = () => {
    return (
        <>
        <div className='container-fluid'>
            <div className="title">터치오더에 오신 것을 환영합니다</div>
            <div className="Button">
                <Button variant="primary" href="Touchorder.kr/seller/home" size="lg">점주님</Button>
                &nbsp;&nbsp;
                <Button variant="primary" href="/home" size="lg">고객님</Button>
            </div>

            <div className="Footer">
            &nbsp;&nbsp;Presented by team Yeolilgop<br />
            &nbsp;&nbsp;Copyright 2022 Yeolilgop, Keimyung.- All rights Reserved.
            </div>
        </div>
        </>
    );
};

export default Choice;