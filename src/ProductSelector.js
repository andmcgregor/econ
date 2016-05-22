import React from "react";

const ProductOption = (props) => {
  return <option value={props.product.short_code}>{props.product.name}</option>
};

var ProductSelector = React.createClass({
  update(e) {
    this.props.onSelectProduct(e.target.value);
  },

  render() {
    let products = this.props.products.map( product => {
      return <ProductOption key={product.name} product={product} />
    });

    return <select onChange={this.update}>{products}</select>
  }
});

export default ProductSelector;

