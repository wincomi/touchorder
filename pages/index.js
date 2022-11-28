import Link from 'next/link'
import { Button } from 'react-bootstrap';
import styles from '@styles/Choice.module.css';

const Choice = () => {
    return (
        <>
        <div className='container-fluid'>
            <div className={styles.title}>터치오더에 오신 것을 환영합니다</div>
            <div className={styles.Button}>
                <Link href="seller/home">
                    <Button variant="primary" size="lg">점주님</Button>
                </Link>
                &nbsp;&nbsp;
                <Link href="/home">
                    <Button variant="primary" size="lg">고객님</Button>
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

export default Choice;
