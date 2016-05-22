import React from "react";
import ReactDOM from "react-dom";

import CountrySelector from "./CountrySelector";
import ProductSelector from "./ProductSelector";
import TrendGraph from "./TrendGraph";
import ImportExportGraph from "./ImportExportGraph";

var Sidebar = React.createClass({
  fetchCountries() {
    fetch("http://localhost:8000/api/countries").then(function(response) {
      return response.json();
    }).then(function(json) {
      ReactDOM.render(<CountrySelector countries={json}
                                       selectedCountry={this.props.selectedCountry}
                                       onSelectCountry={this.props.onSelectCountry} />,
                      document.getElementById("countrySelector"));
      this.fetchProducts();
    }.bind(this));
  },

  fetchProducts() {
    fetch("http://localhost:8000/api/products").then(function(response) {
      return response.json();
    }).then(function(json) {
      ReactDOM.render(<ProductSelector products={json}
                                       selectedCountry={this.props.selectedCountry}
                                       onSelectProduct={this.props.onSelectProduct} />,
                      document.getElementById("productSelector"));

      this.props.onLoaded();
    }.bind(this));
  },

  componentWillMount() {
    this.fetchCountries();
  },

  render() {
    return <div className="sidebar">
             <div id="countrySelector"></div>
             <div id="productSelector"></div>
             <TrendGraph selectedCountry={this.props.selectedCountry}
                         selectedProduct={this.props.selectedProduct} />
             <ImportExportGraph selectedCountry={this.props.selectedCountry}
                                selectedProduct={this.props.selectedProduct} />
           </div>
  }
});

export default Sidebar;

