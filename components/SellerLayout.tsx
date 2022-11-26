import Container from 'react-bootstrap/Container';
import DefaultLayout from './defaultLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

export default ({children}) => {
   return (
    <>
        <DefaultLayout></DefaultLayout>
        <div style={{display:'flex',justifyContent:'left'}}>
            <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                    Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item as="li" disabled>
                    Morbi leo risus
                </ListGroup.Item>
                <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
        </div>
        
        <Container>{children}</Container>
    </>
   ) 
}