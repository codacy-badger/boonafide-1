import React from 'react';
import { AuthAPI } from '../lib/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, clearMessages } from '../lib/redux/actions';
import { timeOutMessages } from '../lib/common/helpers';
import { Button } from './Button';
import FormField from './FormField';

class _SignUpForm extends React.Component {

  constructor(){
    super();
    this.state = {
      username:"",
      email: "",
      password:""
    }
  }

  handleSignUp(){
    const {username, email, password} = this.state;
    const {history, dispatch} = this.props;
    AuthAPI.signup(username, email, password)
    .then( user =>{
      dispatch(clearMessages());
      dispatch(login(user))
      history.push('/profile');
    })
    .catch( e => {
      timeOutMessages(dispatch, e);
      history.push('/signup');
    });
  }

  render() {
    const {username, email, password} = this.state;
    return (
      <React.Fragment>
        <div className="form">
          <FormField type="text" placeholder="write your username" onChange={e => this.setState({username: e.target.value})} value={username}/>
          <FormField type="email" placeholder="write your email" onChange={e => this.setState({email: e.target.value})} value={email}/>
          <FormField type="password" placeholder="write your password" onChange={e => this.setState({password: e.target.value})} value={password}/>
          <Button className="btn" onClick={() => this.handleSignUp()}>sign up</Button>
        </div>
      </React.Fragment>
    );
  }
};

export const SignUpForm = connect()(withRouter(_SignUpForm));
