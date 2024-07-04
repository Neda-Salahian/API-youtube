import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
//IMPORT SCSS
import './Footer.scss'
function Footer (){

    return (
        <Container fluid className='footer'>
            <Row>
                <div className='footer-color'>
                    <Link to='https://www.youtube.com/channel/UC15OT7mMGXfKaEYYexSL2hA' target="_blank">
                        <h1>Kita Kids Tv YouTube Page</h1>
                    </Link>
                </div>
                
            </Row>
        </Container>
    )
}

export default Footer