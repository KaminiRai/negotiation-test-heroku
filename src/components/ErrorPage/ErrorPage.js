import React, { Component } from 'react';
import '../../styles/ErrorPage404.css'
import {Link} from "react-router-dom";

class ErrorPage extends Component
{

    render(){

        return(
            <div className="over404">
    <div className="darkOverlay"></div>
    <header>
      <img src={require('../../assets/img/something_wrong_error-2.png')} alt="main-logo" className="img-responsive main-logo" />
      <h1 data-text="404">404</h1>
      <p style={{color:'white',fontSize:'20',fontWeight:'bold'}} >Page Not Found <Link to='/login'>Back To Dashboard</Link></p>
    </header>
  </div>

);
    }

}

export default ErrorPage;