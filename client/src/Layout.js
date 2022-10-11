import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
    return (
        <>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;