import React from "react";
import ReactDOM from "react-dom";

import Loading from "./Loading";
import Globe from "./Globe";
import Sidebar from "./Sidebar";

var App = React.createClass({
  getInitialState() {
    return {
      selectedCountry: undefined,
      selectedProduct: undefined
    }
  },

  onLoaded() {
    ReactDOM.unmountComponentAtNode(document.getElementById("loading"));
  },

  onSelectCountry(country) {
    this.setState({ selectedCountry: country });
  },

  onSelectProduct(product) {
    this.setState({ selectedProduct: product });
  },

  componentDidMount() {
    ReactDOM.render(<Loading />, document.getElementById("loading"));
  },

  render() {
    return <div>
             <div id="loading"></div>

             <div className="app">
               <Sidebar onLoaded={this.onLoaded}
                        selectedCountry={this.state.selectedCountry}
                        onSelectCountry={this.onSelectCountry}
                        selectedProduct={this.state.selectedProduct}
                        onSelectProduct={this.onSelectProduct} />
               <Globe selectedCountry={this.state.selectedCountry} />
             </div>
           </div>
  }
});

export default App

