import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPicture } from '../lib/cloudinary';

class _Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }
  handleChange(e) {
    this.setState({file: e.target.files[0]});
  }
  handleSubmit(e) {
    e.preventDefault();
    addPicture(this.state.file);
  }
  render() {
    const {user} = this.props;
    if (user){
      return (
        <div className="profile">
          <h2>Profile</h2>
          <p>Welcome {user.username}</p>
          <img style={{width: "10em"}} src={user.pictureUrl} alt="profile pic"/>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
            <button type="submit">Save new profile picture</button>
          </form>
        </div>
        );
    } else {
      return <p>You r not logged in</p>}
    }
}

export const Profile = connect(store => ({user: store.user}))(withRouter(_Profile));
