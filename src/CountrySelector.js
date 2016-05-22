import React from "react";

const CountryOption = (props) => {
  return <option value={props.country.name}>{props.country.name}</option>
};

var CountrySelector = React.createClass({
  update(e) {
    this.props.onSelectCountry(e.target.value);
  },

  render() {
    let countries = this.props.countries.map( country => {
      return <CountryOption key={country.name} country={country} />
    });

    return <select onChange={this.update}>{countries}</select>
  }
});

export default CountrySelector;

