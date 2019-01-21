import React from 'react';
import {Button,Input,Label} from 'reactstrap';
import Select from 'react-select';
import {RadioGroup,Radio} from 'react-radio-group';
//import RadioInputs from '../pages/RadioButton'
//import ReactRadioButtonGroup from 'react-radio-button-group';

class SignUpSecond extends React.Component{

  state={
    checkedValue:""
  }

    componentWillMount(){
      if(localStorage.getItem('org')!=null){
      org=JSON.parse(localStorage.getItem('org'));
    }
    if(localStorage.getItem('cap')!=null){
      cap=JSON.parse(localStorage.getItem('cap'));}

      //alert(JSON.stringify(cap))
    }

    //function(checkedValue) {console.log("New value: ", checkedValue);}

    onChecked=(event)=>{
alert(event)
    }

    render()
    {
        return(
            <div>
            <Label>*Type Of Organisation Name</Label>
            <Select
            placeholder="Enter/Select orgnisation name"
            value={this.props.selectedValue}
            onChange={this.props.select}
            options={org}
            />
          <br/>
           <Label>*Select Capabilities</Label>
            <Select
            placeholder="Select multiple capabilities"
            value={this.props.multiSelectValue}
            onChange={this.props.multiSelect}
            options={cap}
            isMulti="true"
            />
            {/* <RadioInputs/> */}
            
          <br/>
          <Label>Pre approved Code</Label>
           <Input name="preapprovedcode" value={this.props.preapprovedcode} onChange={this.props.handleChange}/>
           <br/>
           <div className="row">
           <Button  
            onClick={this.props.changeRenderState} className="submitbtn" >
            CANCEL
           </Button>
           
            <Button
                className="bg-gradient-theme-left border-0"
                onClick={e=>this.props.handleSubmit(e,this.isLogin)} className="submitbtn">
               {this.props.renderButtonText()}
            </Button>  
          </div>           
          </div>
        );
    }

}

var org=[{value:"",label:""}];
var cap=[{value:"",label:""}];

export default SignUpSecond;