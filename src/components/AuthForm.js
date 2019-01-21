import logo200Image from '../assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {Button,Form,FormGroup,Input,Label,Nav,NavLink,NavItem,UncontrolledAlert } from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import {Redirect} from "react-router-dom";
import Login from './Login';
import SignUpSecond from './SignUpSecond';
import {BASE_URL,GET_CAPABILITIES_URL,GET_ORGNISATION_URL,POST_REGISTRATION_URL,CHECK_PRE_APPROVED_CODE_URL, GET_USER_DETAIL_URL} from '../utils/api';
import {GITHUB_CLIENTID,FACEBOOK_APPID,GOOGLE_CLIENTID} from '../utils/constantUtil'
//import Loader from 'react-loader-spinner'
import { ClipLoader } from 'react-spinners';
import axios from 'axios'
import '../styles/style.css'


class AuthForm extends React.Component
{
   state={
    fields:{
      username:"",
      firstname:"",
      lastname:"",
      password:"",
      confirmpassword:"",
      preapprovedcode:"",
      capabilitieids:{},
      organisationids:{},
      socialid:""
    },
    errors:{},
    isrenderOnNext:false,
    selectedValue:null,
    multiSelectValue:null,
    islogin:false,
    isregistered:false,
    organisations:null,
    capabilities:null,
    isapprovedCode:false,
    loader:false
   }

   componentWillMount(){
    this.setSocialDetail()
    this.getOrganisations()
    this.getCapabilities()
    }

   componentDidUpdate(){
    this.setSocialDetail();
   }

   get isLogin() 
   { return this.props.authState === STATE_LOGIN;}
  
   get isSignup() 
   {return this.props.authState === STATE_SIGNUP;}

    getOrganisations=()=>{
      var orgs=[];
      axios.get(BASE_URL+GET_ORGNISATION_URL,{headers:{"Content-Type":"application/json"}})
      .then((data)=>{
        for(let i=0;i<data.data.length;i++)
        {
          let org={label:data.data[i].name,value:data.data[i].id}
          orgs.push(org);
        }
        localStorage.setItem("org",JSON.stringify(orgs));
      })
      .catch((error)=>{
        //alert(JSON.stringify(error))
        // if(error.response!==null){
        // if(error.response.status===500){
        //   alert("Somthing Went Wrong")
        //  }else
         {console.log("Orgnization Fails:"+error)}//}
      });
     }
     
     getCapabilities=()=>{
      var orgs=[];
      axios.get(BASE_URL+GET_CAPABILITIES_URL,{headers:{"Content-Type":"application/json"}})
      .then((data)=>{
        for(let i=0;i<data.data.length;i++)
        {
          let org={label:data.data[i].name,value:data.data[i].id}
          orgs.push(org);
        }
        localStorage.setItem("cap",JSON.stringify(orgs));
      })
      .catch((error)=>{
        // if(error.response!==null){
        // if(error.response.status===500){
        //   alert("Somthing Went Wrong")
        //  }else
         {
          console.log("Capabilities Fails:"+error);
         }//}
      });
      }

     setSocialDetail=()=>{ 
      userDetails=JSON.parse(localStorage.getItem('userDetails'));
      if(userDetails!==null && !this.isLogin){
      fields['username']=userDetails.username;
      fields['firstname']=userDetails.firstname;
      fields['lastname']=userDetails.lastname;
       }
    }
  
    checkPreApprovedCode=()=>{
      let requestBody = JSON.stringify({
      pre_approved_code: this.state.fields.preapprovedcode
      })
      axios.post(BASE_URL+CHECK_PRE_APPROVED_CODE_URL,requestBody,{headers:{"Content-Type":"application/json"}})
      .then((data)=>{
        if(data.status===200){
        
          this.registration(data.status);
        }
        else if(data.status===204){
       
          this.registration(data.status);
        }
      })
      .catch((error)=>{
        if(error.response!==null){
        if(error.response.status===500){
          alert("Somthing Went Wrong")
         }
         else{console.log("AppCode Error:"+error)}
        }
      }) } 

    select=(event)=> {
      this.setState({
        organisations:event
      });
      }
     
    multiSelect=(event)=> {
       this.setState({
        capabilities: event
       });
     }

      changeAuthState = authState => event => {
        event.preventDefault();
        this.props.onChangeAuthState(authState);
      };
     
       handleChange=(event)=>{
        this.setState({errors:{}})
        let userInputs=this.state.fields;
        
        if(event.target.name==="firstname")
        fields["firstname"] ="";

        if(event.target.name==="lastname")
        fields["lastname"] ="";
        
        if(event.target.name==="username")
        fields["username"] ="";

        userInputs[event.target.name]=event.target.value;
        
        this.setState(
          previosState=>({
           fields:previosState.fields?previosState.fields:userInputs
        } ))
              }
      
      changeRenderState=(event)=>
      {
        // if (this.validateForm())
        // {     
          this.setState(pre=>({
          isrenderOnNext:!pre.isrenderOnNext,
         }));
      //}
      }

       login=()=>{
        let requestBody = JSON.stringify({
          email_id: this.state.fields.username,
          password: this.state.fields.password
        })
        let headers = {
          'Content-Type': 'application/json'
        }
        this.setState({loader:true})
        axios.post(BASE_URL+GET_USER_DETAIL_URL,requestBody,{headers:headers})
        .then((data)=>{
        if(data.status===200)
        {
          console.log(JSON.stringify(data))
        localStorage.setItem('loginDetail', JSON.stringify(data.data));
        localStorage.setItem('loginHeaderDetail', JSON.stringify(data.headers));
        this.setState({
          islogin:true,
          loader:false
         })}
        
      })
      .catch((error)=>{
       if(error.response!==null){
         if(error.response.status===404||error.response.status===401){
          let loginerr={};
          loginerr["loginerror"]="EMAIL OR PASSWORD INCORRECT!!";
          this.setState({
            errors:loginerr,
            loader:false
          })}
          else if(error.response.status===500){
            alert("Somthing Went Wrong")
           }
           this.setState({
            loader:false
          })
        }
      })
    }
      
      checkPreApprovedCode=()=>{
        let requestBody = JSON.stringify({
        pre_approved_code: this.state.fields.preapprovedcode
        })
        this.setState({loader:true})
        axios.post(BASE_URL+CHECK_PRE_APPROVED_CODE_URL,requestBody,{headers:{"Content-Type":"application/json"}})
        .then((data)=>{
          if(data.status===200){
            this.registration(data.status);
          }
          else if(data.status===204){
            this.registration(data.status);
          }
        })
        .catch((error)=>{
          if(error.response!==null){
          if(error.response.status===500){
            alert("Somthing Went Wrong")
           }
           else{console.log("AppCode Error:"+error)}}
           this.setState({loader:false})
        })
       }   

      registration=(status)=>{
        userDetails=JSON.parse(localStorage.getItem('userDetails'));
        let socialid=userDetails!==null?userDetails.socialId:""

        var organisationids={}
        if(this.state.organisations!=null){
        organisationids={"id":this.state.organisations.value};
        }
       
        // var capabilitieids={}
        // var capIds=0;
        // if(this.state.capabilities!=null){
        // for(let i=0;i<this.state.capabilities.length;i++)
        // {
        //   if(i===0){
        //     capIds=this.state.capabilities[i].value
        //   }
        //   if(i>0){
        //     capIds+=","+this.state.capabilities[i].value
        //   }
        // }
        // capabilitieids={"id":capIds};
        // }

        // alert(JSON.stringify(capabilitieids))

        //alert("userDetails.socialId")

        let requestBody = JSON.stringify({
          email_id: this.state.fields.username,
          password: this.state.fields.password,
          first_name: this.state.fields.firstname,
          last_name: this.state.fields.lastname,
          social_id: socialid,
          default_role_id: {
            "id": 2
           },
          organisation_id:organisationids
        })

        let headers = {
          'Content-Type': 'application/json'
        }
        axios.post(BASE_URL+POST_REGISTRATION_URL,requestBody,{headers:headers})
        .then((data)=>{
        if(data.status===201)
        {
       
          if(status===200){
            localStorage.setItem('loginDetail', JSON.stringify(this.state.fields));
            this.setState({
              islogin:true,
             loader:false
            })
          }
          else if(status===204){
            alert("Registration completed and pendding for the approval")
            this.setState({
              isregistered:true,
              loader:false 
              })
          }

        }})
        .catch((error)=>{
          if(error.response!==null){
         if(error.response.status===409){
          this.setState({
            errors:loginerr,
            loader:false
          })
          let loginerr={};
          loginerr["loginerror"]="Eamil Already Exist!!";
          this.setState({
            isregistered:true,
          })
        }
         else if(error.response.status===500){
          alert("Somthing Went Wrong")
         }
       }
       })
      }
      

      handleSubmit = (event,isLoginState) => {
      event.preventDefault(); 
      
      // userDetails=JSON.parse(localStorage.getItem('userDetails'));
      // alert(JSON.stringify(userDetails))
      // this.setState({
      //   fields:{socialid:userDetails.socialId}
      //  })

     // if (this.validateForm())
        {
        if(isLoginState){
          this.login();
        }
        else{
          //alert("HEYYY")
         this.checkPreApprovedCode();
         //this.registration("1");
        }
      }}
    
      validateForm=()=>{
        let fieldstate= this.state.fields;
        let errors = {};
        let formIsValid = true;
        debugger;
        if (!fieldstate["username"]&&!fields["username"]) {
          formIsValid = false;
          errors["username"] = "Enter your username.";
        }

        if (!fieldstate["password"]) {
          formIsValid = false;
          errors["password"] = "Enter your password.";
        }
        if(!this.isLogin){
        if (!fieldstate["confirmpassword"]) {
          formIsValid = false;
          errors["confirmpassword"] = "Confirm your password.";
        }
          
        if(fieldstate["password"]&&fieldstate["confirmpassword"])
        {
          if(fieldstate["password"]!==fieldstate["confirmpassword"])
          {
          formIsValid = false;
          errors["confirmpassword"] = "Confirm password don't match with password.";
          }
        }
      }
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
  
    
      renderButtonText=()=> {
        const { buttonText } = this.props;
      
        if (!buttonText && this.state.isrenderOnNext) {
        return 'SignUp';
        }

        if (!buttonText && this.isLogin) {
          debugger;
          localStorage.clear();
          fields['username']="";
          fields['firstname']="";
          fields['lastname']="";
          return 'Login';
        }
    
        // if (!buttonText && this.isSignup) {
        //   return 'Next';
        // }
        return buttonText;
      }
    
       
    render()
    {
      //alert(this.state.errors.loginerror)
      let isrenderOnNext=this.state.isrenderOnNext;
        const {
            showLogo,
            usernameLabel,
            usernameInputProps,
            userfirstnameLabel,
            userfirstnameInputProps,
            userlastnameLabel,
            userlastnameInputProps,
            passwordLabel,
            passwordInputProps,
            confirmPasswordLabel,
            confirmPasswordInputProps,
            children,
            onLogoClick,
          } = this.props;
        
  if(this.state.islogin){
    return <Redirect to={{
      pathname: "/dashboard",
    }} />;
  }     

  if(this.state.isregistered){
    return <Redirect to={{
      pathname: "/login",
    }} />;
  } 

          return(     
            <div>
             {/* <UncontrolledAlert  color="warning">{alertamessage}</UncontrolledAlert > */}

            {this.state.loader?
              <div className='sweet-loading' style={{position:'fixed',top:'50%',left:'50%',zIndex:9999}}>
                                   <p style={{marginTop:'-120px',marginLeft:'-20px',fontWeight:'bold',color:'#fb365f'}}>Please Wait...</p>
                                     < ClipLoader
                                       loaderStyle={{display: "block", margin: "0 auto"}}
                                       sizeUnit={"px"}
                                       size={50}
                                       color={'#fb365f'}
                                       loading='true'
                                     />
                                   </div> : <div style={errorMsg}>{this.state.errors.loginerror} </div>}
              <div>
               {showLogo && (
                  <div className="text-center pb-4 logo">
                    <p>Login with Negotiation Plateform</p>
                  </div>
                )}
                 
                 {!isrenderOnNext &&
                   ( <small className="col-sm-12">EASILY USING</small>)}

               {!isrenderOnNext &&
                  (
            <div className="social row"> 
            <FacebookLogin
                  appId={FACEBOOK_APPID} 
                  fields="name,email,picture"
                  callback={(e) =>this.props.socialResponse(e,1)}
                  textButton="FACEBOOK"
                  className="socialfb"
                  />     
                 <div className="socialgoogle">
                <GoogleLogin
                  clientId={GOOGLE_CLIENTID}
                  buttonText="GOOGLE"
                  onSuccess={(e) =>this.props.socialResponse(e,2)}
                  onFailure={(e) =>this.props.socialResponse(e,3)}
                  // className="socialgoogle"
                  /> 
                  </div> 
                  <GitHubLogin 
                clientId={GITHUB_CLIENTID}
                redirectUri=""
                scope="user:email,user:read"
                onSuccess={(e) =>this.props.socialResponse(e,4)}
                onFailure={(e) =>this.props.socialResponse(e,5)}
                buttonText="GITHUB"
                className="socialgit"
                />
                 
                   
                 
              </div>
                  )}
                   {!isrenderOnNext &&
                   (<small>-OR USING EMAIL-</small> )}

                  {/* <div style={errorMsg}>{this.state.errors.loginerror} </div> */}

                <Form onSubmit={this.handleSubmit}>
                 
                
          {this.isSignup && !isrenderOnNext &&
               (
                <FormGroup>
                 <div className="row">
                 <div className="col-6">
                <Label for={userfirstnameLabel}>{userfirstnameLabel}</Label>
                <Input {...userfirstnameInputProps} name="firstname" value={this.state.fields.firstname!==""?this.state.fields.firstname:fields.firstname} onChange={this.handleChange}/>
                </div>
                <div className="col-6">
               <Label for={userlastnameLabel}>{userlastnameLabel}</Label>
               <Input {...userlastnameInputProps} name="lastname" value={this.state.fields.lastname!==""?this.state.fields.lastname:fields.lastname} onChange={this.handleChange}/>
               </div>
                 </div>
             </FormGroup>
                
                )
          }
          
           {!isrenderOnNext &&
               (
                <Login
                usernameLabel={usernameLabel}
                usernameInputProps={usernameInputProps}
                username={this.state.fields.username}
                socialusername={fields.username}

                passwordLabel={passwordLabel}
                passwordInputProps={passwordInputProps}
                password={this.state.fields.password}

                handleChange={this.handleChange}
                errorMsg={errorMsg}
                usernameerrors={this.state.errors.username}
                passworderrors={this.state.errors.password}
                />
               )}  
             
                {this.isLogin && !isrenderOnNext
                &&( 
                    <Nav>
                      <NavItem>
                       <NavLink href="#">Forget Password?</NavLink>
                      </NavItem>
                     </Nav>
                    )
                }

              {this.isSignup && !isrenderOnNext &&(
                <div>
                    <FormGroup>
                    <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                    <Input {...confirmPasswordInputProps} name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleChange} />
                    <div style={errorMsg}>{this.state.errors.confirmpassword} </div>
                  </FormGroup>
                  <Button onClick={this.changeRenderState} 
                   size="lg"
                   className="bg-gradient-theme-left border-0"
                   block >
                   Next
                  </Button>
               </div>
                )
              }

              {isrenderOnNext && (
                
                <SignUpSecond
                selectedValue={this.state.organisations}
                select={this.select}
                organisations={organisationsCheck}

                multiSelectValue={this.state.capabilities}
                multiSelect= {this.multiSelect}
                capabilities={capabilities}

                preapprovedcode={this.state.preapprovedcode}
                handleChange={this.handleChange}

                changeRenderState={this.changeRenderState}
                handleSubmit={this.handleSubmit}
                renderButtonText={this.renderButtonText}
                />
                
                 
             )}

                <hr />

                {this.isLogin&&(<Button
                  size="lg"
                  className="bg-gradient-theme-left border-0"
                  block
                  onClick={e=>this.handleSubmit(e,this.isLogin)}>
                  {this.renderButtonText()}
                </Button>)}
        
                <div className="text-center pt-1">
                  <span>New User? </span>
                  <span>
                    {this.isSignup ? (
                      <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                        Login
                      </a>
                    ) : (
                      <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                        Register
                      </a>
                    )}
                  </span>
                </div>
        
                {children}
              </Form>
              </div>
              <div style={this.state.loader? overlay:{}}>
    </div>
        </div>
            );
    }
} 



var userDetails=null;

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

var fields={
  username:"",
  firstname:"",
  lastname:"",
}

var  alertamessage="";

const errorMsg={
  color: '#fb365f',
  marginbottom: '12px'
}

var organisationsCheck =[];

var capabilities = [
  { value: 'AAA', label: 'aaa',type:'radio'},
  { value: 'BBB', label: 'bbb',type:'radio' },
  { value: 'CCC', label: 'ccc',type:'radio' },
  { value: 'DDD', label: 'ddd',type:'radio' }
];

AuthForm.propTypes = {
    authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
    showLogo: PropTypes.bool,
    userfirstnameLabel:PropTypes.string,
    userfirstnameInputProps:PropTypes.object,
    usernameLabel: PropTypes.string,
    usernameInputProps: PropTypes.object,
    passwordLabel: PropTypes.string,
    passwordInputProps: PropTypes.object,
    confirmPasswordLabel: PropTypes.string,
    confirmPasswordInputProps: PropTypes.object,
    onLogoClick: PropTypes.func,
  };

  AuthForm.defaultProps = {
    authState: 'LOGIN',
    showLogo: true,
    userfirstnameLabel: '*First Name',
    userfirstnameInputProps: {
      type: 'text',
      placeholder: 'first name',
    },
    userlastnameLabel: 'Last Name',
    userlastnameInputProps: {
      type: 'text',
      placeholder: 'last name',
    },
    usernameLabel: '*Your Email Address',
    usernameInputProps: {
      type: 'email',
      placeholder: 'your@email.com',
    },
    passwordLabel: '*Password',
    passwordInputProps: {
      type: 'password',
      placeholder: 'your password',
    },
    confirmPasswordLabel: '*Confirm Password',
    confirmPasswordInputProps: {
      type: 'confirm password',
      placeholder: 'confirm your password',
    },
    onLogoClick: () => {},
  };
  

  const overlay= {
    backgroundColor:'#fb365f',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '1000',
    top: '0px',
    left: '0px',
    opacity: '.5',
    cursor:"not-allowed"
}
  export default AuthForm;
  