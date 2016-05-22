import React from "react";

var Globe = React.createClass({
render() {
  return <div className="globe">
           <p>{this.props.selectedCountry}</p>
         </div>
}
});

export default Globe;

