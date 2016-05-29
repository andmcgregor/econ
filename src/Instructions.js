import React from "react";
import ReactDOM from "react-dom";

var Instructions = React.createClass({
  handleClose() {
    ReactDOM.unmountComponentAtNode(document.getElementById("instructions"));
    this.props.onClose();
  },

  render() {
    return <div className="instructions">
             <p>Visualize $17 trillion worth of international trade.</p>

             <p>Goods classified using the <a href="https://en.wikipedia.org/wiki/Harmonized_System" target="_blank">Harmonized System (HS)</a>.</p>

             <p>Data from the <a href="http://atlas.media.mit.edu/en/resources/data" target="_blank">Observatory of Economic Complexity</a>, originally from the <a href="http://comtrade.un.org/" target="_blank">United Nations Comtrade database</a>.</p>

             <p onClick={this.handleClose} className="action">start</p>
           </div>
  }
});

export default Instructions;

