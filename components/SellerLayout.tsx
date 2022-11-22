import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default ({children}) => {
   return (
    <>
        <p>TODO: 메뉴바</p>
        <Container>{children}</Container>
        <p>TODO: 푸터</p>
    </>
   ) 
}