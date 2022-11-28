import Container from 'react-bootstrap/Container';
import Footer from './footer';
import Sidebar from './sidebar';

export default ({children}) => {
   return (
    <>
        <Sidebar />
        <Container>{children}</Container>
        <Footer />
    </>
   ) 
}