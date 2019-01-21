
// import React from "react"
// import ReactDOM from "react-dom"

// // This Component should obviously be a class if you want it to work ;)

// class RadioInputs extends React.Component {
//   /*
//     [[Label, associated value], ...]
//   */
//  state={
//      gender:{}
//  }

//  onChecked=(event)=>{
//      alert(JSON.stringify(event))
//  }

// render(){
//   return (
//     <div>
//       {
//         inputs.map(([text, value], i) => (
// 	  <div key={ i }>
// 	    <input type="radio"
//         checked={this.state.gender === value } 
// 	      onChange={(event)=>this.onChecked(event)}//{ /* You'll need an event function here */ } 
// 	      value={ value } /> 
//     	    { text }
//           </div>
//         ))
//       }
//     </div>
//   )}
// }

// export default RadioInputs;

// const inputs = [["Male", "M"], ["Female", "F"], ["Other", "O"]]