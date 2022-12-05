import Link from 'next/link'
import styles from '@styles/Choice.module.css';
import {Form , Button } from 'react-bootstrap';
const Choice = () => {
    return (
        <>
        <div className='container-fluid'>
            <div className={styles.title}>터치오더에 오신 것을 환영합니다</div>
        </div>
        <Form>
        <div className={styles.Auth_form_container}> 
      <form className={styles.Auth_form}>
        <div className={styles.Auth_form_content}> 
          <h3 className={styles.Auth_form_title}>login to touchorder</h3>

          <div className={styles.form_group}>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Phone Number"
            ></input>
            </div>
            <Button className={styles.outline_success}>인증</Button>

          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Pin Number"
            ></input>
          </div>

          <br/>

          <div className="login-button">
          <Link href="/MyPage">  
            <Button type="submit" className={styles.btn_success}>
              Login
            </Button>
          </Link>
          </div>

          <br/>
        </div>
      </form>
    </div>
        </Form>
        </>
    );
};

export default Choice;

/*
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Login.module.css';
import {Form , Button } from 'react-bootstrap';



const Login = () => {
  return (
<>
  <Form>
  <div className={styles.Auth_form_container}> 
      <form className={styles.Auth_form}>
        <div className={styles.Auth_form_content}> 
          <h3 className={styles.Auth_form_title}>login to touchorder</h3>

          <div className={styles.form_group}>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Phone Number"
            ></input>
            </div>
            <Button className={styles.outline_success}>인증</Button>

          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Pin Number"
            ></input>
          </div>

          <br/>

          <div className="login-button">
          <Link href="/MyPage">  
            <Button type="submit" className={styles.btn_success}>
              Login
            </Button>
          </Link>
          </div>

          <br/>
        </div>
      </form>
    </div>
    
    </Form>

  </>
  );
}

export default Login;
*/