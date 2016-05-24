import React from "react";
import ReactDOM from "react-dom";

import CountrySelector from "./CountrySelector";
import ProductSelector from "./ProductSelector";
import TrendGraph from "./TrendGraph";
import ImportExportGraph from "./ImportExportGraph";

var Sidebar = React.createClass({
  render() {
    return <div className="sidebar">
             <CountrySelector countries={this.props.countries}
                              selectedCountry={this.props.selectedCountry}
                              onSelectCountry={this.props.onSelectCountry} />

             <ProductSelector products={this.props.products}
                              selectedCountry={this.props.selectedCountry}
                              onSelectProduct={this.props.onSelectProduct} />

             <h3>Import Value ($)</h3>
             <TrendGraph valueType="import_val"
                         selectedCountry={this.props.selectedCountry}
                         tradeData={this.props.tradeData} />

             <h3>Export Value ($)</h3>
             <TrendGraph valueType="export_val"
                         selectedCountry={this.props.selectedCountry}
                         tradeData={this.props.tradeData} />

             <ImportExportGraph tradeData={this.props.tradeData} />
           </div>
  }
});

export default Sidebar;

