import React from 'react';
import  {FormGroup,Label,Input} from 'reactstrap';




class Login extends React.Component{

render(){
    return(
            <div>
               <FormGroup>
                  <Label for={this.props.usernameLabel}>{this.props.usernameLabel}</Label>
                  <Input {...this.props.usernameInputProps} name="username" value={this.props.username!==""?this.props.username:this.props.socialusername} onChange={this.props.handleChange} />
                  <div style={this.props.errorMsg}>{this.props.usernameerrors} </div>
                
                  <Label for={this.props.passwordLabel}>{this.props.passwordLabel}</Label>
                  <Input {...this.props.passwordInputProps} name="password" value={this.props.password} onChange={this.props.handleChange}/>
                  <div style={this.props.errorMsg}>{this.props.passworderrors} </div>
                </FormGroup>
            </div>
    );
}

}

export default Login;