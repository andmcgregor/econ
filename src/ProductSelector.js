import React from "react";

var ProductSelector = React.createClass({
  update(e) {
    this.props.onSelectProduct(e.target.value);
  },

  render() {
    let products = this.props.products.map( product => {
      return <option key={product.name} value={product.short_code}>{product.name}</option>
    });

    return <select onChange={this.update}>{products}</select>
  }
});

export default ProductSelector;

