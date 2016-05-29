import React from "react";
import ReactDOM from "react-dom";

import Loading from "./Loading";
import Globe from "./Globe";

import CountryData from "./CountryData";

import Sidebar from "./Sidebar";

var App = React.createClass({
  getInitialState() {
    return {
      countries: [],
      selectedCountry: undefined,
      products: [],
      selectedProduct: undefined,
      tradeData: []
    }
  },

  getDefaultProps() {
    return {
      API_ENTRY: "http://www.andrewmcgregor.me/econ/api/"
    }
  },

  fetchInitialData() {
    fetch(this.props.API_ENTRY + "countries").then(function(response) {
      return response.json();
    }).then(function(json) {
      this.setState({ countries: json });
      if (this.state.countries.length > 0 && this.state.products.length > 0)
        this.onLoaded();
    }.bind(this));

    fetch(this.props.API_ENTRY + "products").then(function(response) {
      return response.json();
    }).then(function(json) {
      this.setState({ products: json });
      if (this.state.countries.length > 0 && this.state.products.length > 0)
        this.onLoaded();
    }.bind(this));
  },

  componentDidMount() {
    ReactDOM.render(<Loading />, document.getElementById("loading"));
    this.fetchInitialData();
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

  render() {
    return <div>
             <div id="loading"></div>

             <div className="app">
               <CountryData country={this.state.selectedCountry}
                            products={this.state.products}
                            API_ENTRY={this.props.API_ENTRY} />

               <div id="globe">
                 <Globe countries={this.state.countries}
                        selectedCountry={this.state.selectedCountry}
                        onSelectCountry={this.onSelectCountry} />
               </div>
             </div>
           </div>
  }
});

export default App

               /*
               <Sidebar countries={this.state.countries}
                        selectedCountry={this.state.selectedCountry}
                        products={this.state.products}
                        selectedProduct={this.state.selectedProduct}
                        onSelectProduct={this.onSelectProduct}
                        tradeData={this.state.tradeData} />
                */

