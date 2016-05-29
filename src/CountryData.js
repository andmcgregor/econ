import React from "react";

import TrendGraph from "./TrendGraph";
import ProductTreemap from "./ProductTreemap";

var CountryData = React.createClass({
  getInitialState() {
    return {
      year: 2014,
      importData: [],
      exportData: []
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.country != this.props.country;
  },

  componentDidUpdate() {
    this.fetchImportExportData();
  },

  fetchImportExportData() {
    fetch(this.props.API_ENTRY + "countries/" + this.props.country.code + "/imports/" + this.state.year).then(function(response) {
      return response.json();
    }).then(function(json) {
      this.setState({ importData: json });
    }.bind(this));

    fetch(this.props.API_ENTRY + "countries/" + this.props.country.code + "/exports/" + this.state.year).then(function(response) {
      return response.json();
    }).then(function(json) {
      this.setState({ exportData: json });
    }.bind(this));
  },

  render() {
    return <div className={"sidebar left " + (this.props.country ? "" : "hide")}>
             <h1>{this.props.country ? this.props.country.name : ""}</h1>

             <h2>Trend</h2>
             <TrendGraph id="countryTrend"
                         exportData={this.state.exportData}
                         importData={this.state.importData} />

             <h2>Exports</h2>
             <ProductTreemap id="exportsTreemap"
                             data={this.state.exportData} />

             <h2>Imports</h2>
             <ProductTreemap id="importsTreemap"
                             data={this.state.importData} />
           </div>
  }
});

export default CountryData;

