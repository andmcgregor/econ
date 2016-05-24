import React from "react";
import ReactDOM from "react-dom";

import Loading from "./Loading";
import Globe from "./Globe";
import Sidebar from "./Sidebar";

var App = React.createClass({
  getInitialState() {
    return {
      selectedCountry: undefined,
      selectedProduct: undefined,
      tradeData: []
    }
  },

  componentDidMount() {
    ReactDOM.render(<Loading />, document.getElementById("loading"));
  },

  onLoaded() {
    ReactDOM.unmountComponentAtNode(document.getElementById("loading"));
  },

  onSelectCountry(country) {
    this.setState({ selectedCountry: country });
    this.fetchTradeData();
  },

  onSelectProduct(product) {
    this.setState({ selectedProduct: product });
    this.fetchTradeData();
  },

  fetchTradeData() {
    if (this.state.selectedCountry != undefined &&
        this.state.selectedProduct != undefined) {
      console.log('doing request');
      fetch("http://localhost:8000/api/trades?country_code="+this.state.selectedCountry+"&"+"product_code="+this.state.selectedProduct).then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log('SETTING TRADE DATA');
        this.setState({ tradeData: json });
      }.bind(this));
    }
  },

  render() {
    return <div>
             <div id="loading"></div>

             <div className="app">
               <Sidebar onLoaded={this.onLoaded}
                        selectedCountry={this.state.selectedCountry}
                        onSelectCountry={this.onSelectCountry}
                        selectedProduct={this.state.selectedProduct}
                        onSelectProduct={this.onSelectProduct}
                        tradeData={this.state.tradeData} />
               <Globe selectedCountry={this.state.selectedCountry} />
             </div>
           </div>
  }
});

export default App

