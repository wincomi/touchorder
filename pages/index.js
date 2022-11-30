import Link from 'next/link'
import styles from '@styles/Choice.module.css';
import Login from './login';
import {Form , Button } from 'react-bootstrap';
const Choice = () => {
    return (
        <>
        <div className='container-fluid'>
            <div className={styles.title}>터치오더에 오신 것을 환영합니다</div>
            <Login>
                
            </Login>
            
        </div>
        </>
    );
};

export default Choice;
