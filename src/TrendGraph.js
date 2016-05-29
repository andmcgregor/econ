import React from "react";
import d3 from "d3";

var TrendGraph = React.createClass({
  initGraph() {
    var _this = this;

    this.margin = { top: 10, right: 15, bottom: 25, left: 30 },
    this.width = document.getElementById(this.props.id).offsetWidth - this.margin.left - this.margin.right,
    this.height = this.width * 0.6;

    this.x = d3.scale.linear()
        .range([0, this.width]);

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.line = d3.svg.line()
        .x(function(d) { return _this.x(d.year); })
        .y(function(d) { return _this.y(d.value); });

    this.svg = d3.select(document.getElementById(this.props.id)).append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

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
  },

  updateGraph() {
    var data = [];

    /*
    for (var i = 0; i < this.props.tradeData.length; i++) {
      if ((this.props.valueType == "import_val" && this.props.tradeData[i].origin == this.props.selectedCountry) ||
          (this.props.valueType == "export_val" && this.props.tradeData[i].origin == this.props.selectedCountry)) {
        var inserted = false;

        for (var j = 0; j < data.length; j++) {
          if (data[j].year == this.props.tradeData[i].year) {
            data[j].value += this.props.tradeData[i][this.props.valueType];
            inserted = true;
            break;
          }
        }

        if (!inserted)
          data.push({ year: this.props.tradeData[i].year, value: this.props.tradeData[i][this.props.valueType] });
      }
    }
    */

    data.sort(function(a, b) { return a.year < b.year ? -1 : 1; });

    this.svg.selectAll("path").remove();
    this.svg.selectAll("g").remove();

    this.x.domain(d3.extent(data, function(d) { return d.year; }));
    this.y.domain(d3.extent(data, function(d) { return d.value; }));

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

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  },

  componentDidUpdate() {
    this.updateGraph();
  },

  componentDidMount() {
    this.initGraph();
    this.updateGraph();
  },

  render() {
    return <div>
             <div id={this.props.id}></div>
           </div>
  }
});

export default TrendGraph;

