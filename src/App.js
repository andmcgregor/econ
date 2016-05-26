import React from "react";
import ReactDOM from "react-dom";

import Loading from "./Loading";
import Globe from "./Globe";
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

  fetchInitialData() {
    fetch("/econ/api/countries").then(function(response) {
      return response.json();
    }).then(function(json) {
      this.setState({ countries: json });
      if (this.state.countries.length > 0 && this.state.products.length > 0)
        this.onLoaded();

      ReactDOM.render(<Globe countries={this.state.countries}
                             selectedCountry={this.state.selectedCountry} />,
                      document.getElementById("globe"));


    }.bind(this));

    fetch("/econ/api/products").then(function(response) {
      return response.json();
    }).then(function(json) {
      this.setState({ products: json });
      if (this.state.countries.length > 0 && this.state.products.length > 0)
        this.onLoaded();
    }.bind(this));
  },

  fetchTradeData() {
    if (this.state.selectedCountry != undefined &&
        this.state.selectedProduct != undefined) {
      console.log('doing request');
      fetch("/econ/api/trades?country_code="+this.state.selectedCountry+"&"+"product_code="+this.state.selectedProduct).then(function(response) {
        return response.json();
      }).then(function(json) {
        this.setState({ tradeData: json });
      }.bind(this));
    }
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
    this.fetchTradeData();
  },

  onSelectProduct(product) {
    this.setState({ selectedProduct: product });
    this.fetchTradeData();
  },

  render() {
    return <div>
             <div id="loading"></div>

             <div className="app">
               <div id="globe"></div>

               <Sidebar countries={this.state.countries}
                        selectedCountry={this.state.selectedCountry}
                        onSelectCountry={this.onSelectCountry}
                        products={this.state.products}
                        selectedProduct={this.state.selectedProduct}
                        onSelectProduct={this.onSelectProduct}
                        tradeData={this.state.tradeData} />
             </div>
           </div>
  }
});

export default App

