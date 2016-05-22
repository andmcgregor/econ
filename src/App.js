import React from "react";
import ReactDOM from "react-dom";

import Loading from "./Loading";
import Globe from "./Globe";
import Sidebar from "./Sidebar";

var App = React.createClass({
  getInitialState() {
    return {
      selectedCountry: undefined
    }
  },

  onSelectCountry(country) {
    this.setState({ selectedCountry: country });
  },

  onSelectProduct(product) {
  },

  render() {
    return <div>
             <Loading />

             <div className="app">
               <Sidebar selectedCountry={this.state.selectedCountry}
                        onSelectCountry={this.onSelectCountry}
                        selectedProduct={this.state.selectedProduct}
                        onSelectProduct={this.onSelectProduct} />
               <Globe selectedCountry={this.state.selectedCountry} />
             </div>
           </div>
  }
});

export default App

