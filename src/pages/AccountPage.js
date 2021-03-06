import React from 'react';

import '../styles/style.css'
import {
    Button, Form, FormGroup, Label, Input
  } from 'reactstrap';
 
  import axios from 'axios'

import { BASE_URL,UPDATE_USER_PASSWORD } from '../utils/api';
 
  //import {BASE_URL} from '../utils/api';

class AccountPage extends React.Component{

state={
  editable:false,
  passwords:{
    newpassword:"",
    confirmpassword:""
  },
  authToken:""
  //loginDetails:{}
}

componentWillMount(){
  this.uploadProfile();
}

uploadProfile(){
  debugger;
 loginDetails=JSON.parse(localStorage.getItem('loginDetail'));
 if(loginDetails!==null){
   if(loginDetails.id!==0){
     profileDetail.username=loginDetails.email_id;
     profileDetail.firstname=loginDetails.first_name;
     profileDetail.lastname=loginDetails.last_name;
     profileDetail.password=loginDetails.password;
     //profileDetail.username=loginDetails.email_id
   }
 }
}

editable=()=>{
this.setState({
  editable:!this.state.editable
})
}

editPassword=()=>{
  debugger;
 var loginHeaderDetail=JSON.parse(localStorage.getItem('loginHeaderDetail'));
//console.log(JSON.stringify())

 let requestBody =JSON.stringify({
    password: this.state.passwords.newpassword
  })

  let headers = {
    'Content-Type': 'application/json',
    'Authorization':loginHeaderDetail!==null?loginHeaderDetail.authorization:"",
    "X-userid":loginHeaderDetail!==null?loginHeaderDetail["x-userid"]:""
  }

   axios.patch(BASE_URL+UPDATE_USER_PASSWORD+loginHeaderDetail["x-userid"]+"/password",requestBody,{headers:headers})
   .then(data=>{
     alert(JSON.stringify(data))
   })
   .catch(error=>{
    alert(JSON.stringify(error))
   })
   
  this.setState({
    editable:!this.state.editable
  })


  }

  handleChange=(event)=>{
    let userInputs=this.state.passwords;
    userInputs[event.target.name]=event.target.value;
    this.setState({
      passwords:userInputs
    })
   
  }

  editCancel=(event)=>{
    event.preventDefault();
    this.setState({
      editable:!this.state.editable
    })
  }

render(){
return(
  <div className="accountform">
 <div className="accountdetail">
 <strong>Account Details</strong>
  {!this.state.editable&&(
  <Button onClick={this.editable} className="editbutton col-4">EDIT</Button>)}
 </div>
  
<div className="clear"></div>

    <Form >
      <div>
    <div className="row">
    <FormGroup className="col-6">
      <Label for="exampleEmail">First Name</Label>
      <Input type="text" name="firstname"  placeholder="with a placeholder" value={profileDetail.firstname} />
    </FormGroup>
    <FormGroup className="col-6">
      <Label for="examplePassword">Last Name</Label>
      <Input type="text" name="lastname"  placeholder="password placeholder" value={profileDetail.lastname}/>
    </FormGroup>
    <div className="clear"></div>
    </div>
    <div className="clear"></div>
     <FormGroup>
      <Label for="exampleEmail">Email Address</Label>
      <Input type="email" name="username" placeholder="with a placeholder" value={profileDetail.username}/>
    </FormGroup>
    <div className="row">
    <FormGroup className="col-4 pwd">

      <div>
      <Label for="examplePassword">Password</Label>
      <Input type="password" name="password" placeholder="password placeholder" value={profileDetail.password}/>
      </div>
    </FormGroup>
   
   {this.state.editable&&(
     <div className="row col-8">
   <FormGroup className="col-6">
      <Label for="exampleEmail">New Password</Label>
      <Input type="password" name="newpassword" placeholder="with a placeholder" value={this.state.passwords.newpassword} onChange={this.handleChange} />
    </FormGroup>
    <FormGroup className="col-6">
      <Label for="examplePassword">Confirm New Password</Label>
      <Input type="password" name="confirmpassword"  placeholder="password placeholder" value={this.state.passwords.confirmpassword} onChange={this.handleChange} />
   </FormGroup>
   </div>
   )}
   </div>
    <div>
     <FormGroup>
      <Label for="exampleEmail">Orgnisation</Label>
      <Input type="text" name="orgnisation"  placeholder="with a placeholder"value={profileDetail.orgnisation} />
    </FormGroup>
     {this.state.editable&&(
       <div className="text-center">
     <Button onClick={(event)=>this.editCancel(event)} className="submitbtn">CANCEL</Button>
    <Button onClick={(event)=>this.editPassword(event)} className="submitbtn">SAVE</Button>
    </div>
  )}
    </div> 
    </div>
  </Form>
  </div>
  );
  }

}

var profileDetail={
  username:"",
  firstname:"",
  lasrname:"",
  password:"",
  orgnisation:"",
  authToken:""
}

var loginDetails;

export default AccountPage;