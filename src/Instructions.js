import React from "react";
import ReactDOM from "react-dom";

var Instructions = React.createClass({
  handleClose() {
    ReactDOM.unmountComponentAtNode(document.getElementById("instructions"));
    this.props.onClose();
  },

  render() {
    return <div className="instructions">
             <p>Vizualize $17 trillion worth of international trade, classified with the Harmonized System.</p>

             <p>Data from the United Nations Comtrade database.</p>

             <p>Select a country to begin...</p>

             <p onClick={this.handleClose} className="action">start</p>
           </div>
  }
});

export default Instructions;

