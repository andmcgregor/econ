import React from "react";

var CountrySelector = React.createClass({
  update(e) {
    this.props.onSelectCountry(e.target.value);
  },

  render() {
    let countries = this.props.countries.map( country => {
      return <option key={country.name} value={country.short_code}>{country.name}</option>
    });

    return <select onChange={this.update}>{countries}</select>
  }
});

export default CountrySelector;

