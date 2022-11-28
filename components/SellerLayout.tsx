import Container from 'react-bootstrap/Container';
import DefaultLayout from './defaultLayout';
import Footer from './footer';
import Sidebar from './sidebar';

export default ({children}) => {
   return (
    <>
        <DefaultLayout/>
        <Sidebar/>
        <Container>{children}</Container>
        <Footer/>
    </>
   ) 
}