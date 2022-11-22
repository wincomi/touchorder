import React from "react"
import "./SellerLogin.css";
import {Form , Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./images/QRcode.png";


const SellerLogin = () => {
  return (
  <>
    
  <Form>
  <div className="Auth-form-container"> 
      <form className="Auth-form">
        <div className="Auth-form-content"> 
          <h3 className="Auth-form-title">login to touchorder</h3>

          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Phone Number"
            ></input>
            </div>
            <Button variant="outline-success">인증</Button>

          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Pin Number"
            ></input>

          </div>

          <div className="d-grid gap-2 mt-3">
            <Button type="submit" className="btn btn-success">
              Login
            </Button>
          </div>
            
          <br/>
        
          <div className="text-center">
            Not a member?&nbsp;
            <Link to={"/Touchorder.kr/seller/register"}><a href="#!">Register</a></Link> 

          </div>
        </div>
      </form>
    </div>
    
    </Form>


  </>
  );
}

export default SellerLogin;