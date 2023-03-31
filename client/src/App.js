import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('/login', { username, password })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>MERN App With Kerberos Auth Example</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Log In</Button>
      </Form>
    </Container>
  );
}

export default App;
