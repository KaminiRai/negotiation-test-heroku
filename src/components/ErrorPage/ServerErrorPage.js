import React, { Component } from 'react';
import '../../Style/ErrorPage404.css'
import {Link} from "react-router-dom";

class ServerErrorPage extends Component
{
render(){
    let link=this.props.link;
    return(
            <div className="over404">
    <div className="darkOverlay"></div>
    <header>
      <img src={require('../../Images/something_wrong_error-2.png')} alt="main-logo" className="img-responsive main-logo" />
      <h1 data-text="404">500</h1>
      <p style={{color:'white',fontSize:'20',fontWeight:'bold'}} >Something Went Wrong Please<Link to={link}>Try Again</Link></p>
    </header>
  </div>
);
 }
}

export default ServerErrorPage;