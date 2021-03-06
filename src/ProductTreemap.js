import React from "react";

var position = function() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy) + "px"; });
};

var ProductTreemap = React.createClass({
  update() {
    this.div = d3.select("#" + this.props.id).html("");

    if (!this.props.data)
      return;

    var data = {
      name: 0,
      children: this.props.data
    };

    this.width = document.getElementById(this.props.id).clientWidth,
    this.height = this.width * 0.75;

    this.treemap = d3.layout.treemap()
        .sticky(true)
        .value(function(d) { return d.summed; })
        .size([this.width, this.height]);

    this.div = d3.select("#" + this.props.id).append("div")
        .style("position", "relative")
        .style("width", this.width + "px")
        .style("height", this.height + "px");

    var node = this.div.datum(data).selectAll(".node")
        .data(this.treemap.nodes)
      .enter().append("div")
        .attr("class", "node")
        .call(position)
        .text(function(d) { return d.children ? null : d.name; });

    d3.selectAll("input").on("change", function change() {
      var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.summed; };

      node.data(this.treemap.value(value).nodes)
        .transition()
          .duration(1500)
          .call(position);
    });
  },

  handleResize() {
    if (this.width !== document.getElementById(this.props.id).clientWidth)
      this.update();
  },

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  },

  componentDidUpdate() {
    this.update();
  },

  render() {
    var message;

    if (!this.props.data)
      message = <p>Loading...</p>
    else if (this.props.data.length == 0)
      message = <p>No data.</p>

    return <div>
             {message}
             <div className="graph" id={this.props.id}></div>
           </div>
  }
});

export default ProductTreemap;

