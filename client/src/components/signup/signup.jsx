import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import axios from 'axios';

class SignUp extends React.Component {
  constructor() {
    super();
    this.handleSubmit = (event) => {
      const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
      const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
      const creds = { username: username, password: password };
      //this.props.onLoginClick(creds)
      console.log('SIGN UP with creds', creds);

      axios.post('http://localhost:3000/users/register', creds)
      .then(response => {
        console.log('[Signup] Success Response', response);
        ReactDOM.findDOMNode(this.refs.username).value = '';
        ReactDOM.findDOMNode(this.refs.password).value = '';
        // TODO: show the next view
      })
      .catch(error => {
        console.log('[Signup] ERROR:', error);
        // TODO: show user error message in DOM
      });
    };
  }
  
  render() {
    const {errorMessage} = this.props;
    
    return (
      <div>
        <Form inline>
            <FormGroup controlId="formHorizontalEmail">
                <ControlLabel>username </ControlLabel>
                <FormControl type="username" ref="username" onChange={this.handleChange} placeholder="username" />
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
                <ControlLabel>Password </ControlLabel>
                <FormControl type="password" ref="password" onChange={this.handleChange} placeholder="Password" />
            </FormGroup>
            <Button onClick={(event) => this.handleSubmit(event)}>Sign Up</Button>
            {errorMessage &&
            <p style={{color:'red'}}>{errorMessage}</p>
            }
        </Form>
      </div>
    )
  }
}

export default SignUp;