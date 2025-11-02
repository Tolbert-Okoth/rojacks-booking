import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Form, 
  Button, 
  Container, 
  Row, 
  Col, 
  Alert,
  InputGroup 
} from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'; 

// Import hooks and actions
import { useLoginMutation } from '../api/authApiSlice';
import { setCredentials } from '../redux/authSlice';
import { selectCurrentUser } from '../redux/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();
  const userInfo = useSelector(selectCurrentUser);

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/admin/dashboard');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Failed to log in:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h1 style={{ color: '#4E342E' }}>Admin Login</h1>
          
          {error && <Alert variant="danger">{error.data?.message || 'Login Failed'}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                // --- THIS IS THE CORRECTED LINE ---
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text 
                  onClick={togglePasswordVisibility} 
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button 
              type="submit" 
              variant="primary" 
              className="mt-3"
              disabled={isLoading}
              style={{ backgroundColor: '#D4A373', borderColor: '#D4A373', color: '#4E342E' }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;