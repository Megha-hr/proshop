import {useNavigate} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import {LinkContainer} from "react-router-bootstrap"
import { useSelector,useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import {logout} from '../slices/authSlice'


const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand >ProShop</Navbar.Brand>
          </LinkContainer>
          
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className="ms-auto">
                  <LinkContainer to="/cart">
                  <Nav.Link><FaShoppingCart />cart
                  {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
                  </Nav.Link>
                  </LinkContainer>
                  {userInfo?(
                    <NavDropdown title={userInfo.name} id='userName'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Item onClick={logoutHandler}>
                        logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ):( <LinkContainer to="/login">
                  <Nav.Link href='/login'><FaUser />Sign in</Nav.Link>
                  </LinkContainer>)}
                 
                   
                   
                </Nav>
                </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
