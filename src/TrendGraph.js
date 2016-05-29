import React from "react";
import d3 from "d3";

var TrendGraph = React.createClass({
  init() {
    console.log('TrendGraph init');

    if (!this.props.data)
      return;

    this.margin = { top: 10, right: 10, bottom: 25, left: 30 },
    this.width = document.getElementById(this.props.id).offsetWidth - this.margin.left - this.margin.right,
    this.height = this.width * 0.75;

    this.svg = d3.select(document.getElementById(this.props.id)).append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x = d3.scale.linear()
        .range([0, this.width]);

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .tickFormat(d3.format("d"))
        .tickSize(this.height, 1)
        .orient("top");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .tickFormat(d3.format("s"))
        .tickSize(this.width, 1)
        .orient("right");

    var _this = this;

    this.line = d3.svg.line()
        .x(function(d) { return _this.x(d.year); })
        .y(function(d) { return _this.y(d.summed); });

    var data = this.props.data || [];

    this.x.domain(d3.extent(data, function(d) { return d.year; }));
    this.y.domain(d3.extent(data, function(d) { return d.summed; }));

    this.svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.xAxis)
      .selectAll("text")
        .attr("y", 10);

    this.svg.append("g")
        .attr("class", "axis axis--y")
        .call(this.yAxis)
      .selectAll("text")
        .attr("x", -25);

    this.svg.append("path")
        .attr("class", "line")
        .datum(data)
        .attr("d", this.line);
  },

  handleResize() {
    if (this.width !== document.getElementById(this.props.id).clientWidth - this.margin.left - this.margin.right)
      this.init();
  },

  componentDidMount() {
    this.init();
    window.addEventListener("resize", this.handleResize);
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  },

  componentDidUpdate() {
    document.getElementById(this.props.id).innerHTML = "";
    this.init();
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

export default TrendGraph;

