import Link from 'next/link'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/index.module.css';

const Home = () => {
    return (
        <>
        <div className='container-fluid'>
            <div className={styles.title}>터치오더에 오신 것을 환영합니다</div>
            <div className={styles.Button}>
                <Link href="/Login">
                    <Button variant="outline-primary" size="lg">시작하기</Button>
                </Link>
            </div>

            <div className={styles.Footer}>
            &nbsp;&nbsp;Presented by team Yeolilgop<br />
            &nbsp;&nbsp;Copyright 2022 Yeolilgop, Keimyung.- All rights Reserved.
            </div>
        </div>
        </>
    );
};

export default Home;