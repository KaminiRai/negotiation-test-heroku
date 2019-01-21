import React from 'react';
import AuthForm,{STATE_LOGIN,STATE_SIGNUP} from '../components/AuthForm';
import {Card,Col,Row} from 'reactstrap';
import axios from 'axios';
import {BASE_URL,GET_DETAIL_BY_SOCIAL_ID_URL} from '../utils/api';
import {Redirect} from "react-router-dom";
import {GITHUB_CLIENTID,GITHUB_CLIENTSECRET} from '../utils/constantUtil';

class AuthPage extends React.Component{
    
    state={
        userDetails:{},
        islogin:false,
      }


handleAuthState=authState=>{
  debugger;
    if(authState===STATE_LOGIN){
        this.props.history.push('/login');
    }
    else{
        this.props.history.push('signup');
    }
};

handleLogoClick=()=>{
    this.props.history.push('/');
}

socialResponse = (response,socialEvent) => {
    debugger;
    let fields=this.state.userDetails;
  
    //facebook success
   if(socialEvent===1)
   {
     if(JSON.stringify(response)!=="{}"){
        if(response.name!=null)
        {
        var array = response.name.split(" ");
        fields['firstname']=array[0];
        fields['lastname']=array[1];
        }

    fields['username']=response.email;
    fields['socialId']=response.id!==0?123456:123456//response.id;
    this.checkSocialUserExistance(123456,fields)
    }
    else{
        alert("Something wrong with facebook link!!")
    }
    }

    //google success
    else if(socialEvent===2)
    {  
        if(response.profileObj!=null)
        {
         fields['firstname']=response.profileObj.givenName;
         fields['lastname']=response.profileObj.familyName;
         fields['username']=response.profileObj.email;
         fields['socialId']=response.profileObj.googleId;
         this.checkSocialUserExistance(response.profileObj.googleId,fields)
        }   
        }
  
    //google fail
   else if(socialEvent===3){
        alert("Login with google failed")
    }
   
    //github sucsess
   else if(socialEvent===4){
        const params = new URLSearchParams();
        params.append('code', response.code);
        params.append('client_id',GITHUB_CLIENTID);
        params.append('client_secret',GITHUB_CLIENTSECRET);
        axios.post('https://github.com/login/oauth/access_token', params)
        .then( (data)=> {
            params.append('access_token', data.data);
            return axios.get('https://api.github.com/user?'+data.data)
          })
          .then((finalData)=>{
            fields['firstname']=finalData.data.login;
            fields['socialId']=finalData.data.id;
            this.checkSocialUserExistance(finalData.data.id,fields)
          })
        }
    
     //githubfail
    else if(socialEvent===5){
        alert("Login with github failed")
     }
  }

  checkSocialUserExistance(socialId,fields){
    axios.get(BASE_URL+GET_DETAIL_BY_SOCIAL_ID_URL+"/"+socialId)
    .then((data)=>{
        if(data.status===200){
            localStorage.setItem('loginDetail', JSON.stringify(data.data));
            this.setState({islogin:true})
        }
        else if(data.status===204){
            localStorage.setItem('userDetails', JSON.stringify(fields));
            this.handleAuthState(STATE_SIGNUP);
            this.setState({})
        }
    })
    .catch((error)=>{
        if(error.response!==null){
        if(error.response.status===500){
            alert("Somthing Went Wrong")
           }
        else{console.log("social:"+error)}
    }
    })
 }

render(){

    if(this.state.islogin){
        return <Redirect to={{
          pathname: "/dashboard",
        }} />;
      } 

    return(
        <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={6}>
          <Card body>

            <AuthForm
              userDetails={this.state.userDetails}
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
              socialResponse={this.socialResponse}
            />

          </Card>
        </Col>
      </Row>
    );
}
}

export default AuthPage