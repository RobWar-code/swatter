import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/images/logo.png'

function NavBar() {
  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="64"
              height="49"
              className="d-inline-block align-top"
            />{' '}
            Swatter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav">
            <Nav.Link className="navItem" as={Link} to="/">Game</Nav.Link>
            <Nav.Link className="navItem" as={Link} to="/scores">Scores</Nav.Link>
            <Nav.Link className="navItem" href="https://narayana-art.co.uk/ZingGames/ZingGames.php">Zing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;