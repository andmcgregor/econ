import React from "react";

import TrendGraph from "./TrendGraph";
import ProductTreemap from "./ProductTreemap";

var CountryData = React.createClass({
  getInitialState() {
    return {
      year: 2014,
      totalImportData: undefined,
      importData: undefined,
      totalExportData: undefined,
      exportData: undefined
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.country !== this.props.country ||
           nextState.importData !== this.state.importData ||
           nextState.exportData !== this.state.exportData ||
           nextState.totalImportData !== this.state.totalImportData ||
           nextState.totalExportData !== this.state.totalExportData;
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.country !== this.props.country)
      this.fetchImportExportData();
  },

  fetchImportExportData() {
    this.setState({
      importData: undefined,
      exportData: undefined,
      totalImportData: undefined,
      totalExportData: undefined
    });

    fetch(this.props.API_ENTRY + "countries/" + this.props.country.code + "/imports/" + this.state.year).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('fetched importData');
      this.setState({ importData: json });
    }.bind(this));

    fetch(this.props.API_ENTRY + "countries/" + this.props.country.code + "/exports/" + this.state.year).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('fetched exportData');
      this.setState({ exportData: json });
    }.bind(this));

    fetch(this.props.API_ENTRY + "countries/" + this.props.country.code + "/imports").then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('fetched totalImportData');
      this.setState({ totalImportData: json });
    }.bind(this));

    fetch(this.props.API_ENTRY + "countries/" + this.props.country.code + "/exports").then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('fetched totalExportData');
      this.setState({ totalExportData: json });
    }.bind(this));
  },

  render() {
    return <div>
             <h1>{this.props.country ? this.props.country.name : ""}</h1>

             <div className={"sidebar left " + (this.props.country ? "" : "hide")}>
               <h2>Exports</h2>

               <TrendGraph id="totalExports"
                           data={this.state.totalExportData} />

               <ProductTreemap id="Exports"
                               data={this.state.exportData}
                               value={this.state.exportValue} />
             </div>

             <div className={"sidebar right " + (this.props.country ? "" : "hide")}>
               <h2>Imports</h2>

               <TrendGraph id="totalImports"
                           data={this.state.totalImportData} />

               <ProductTreemap id="Imports"
                               data={this.state.importData}
                               value={this.state.importValue} />
             </div>
           </div>
  }
});

export default CountryData;
