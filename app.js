var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top:30,
    right:30,
    bottom:30,
    left: 30
};

var plotWidth = svgWidth - margin.left - margin.right;
var plotHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var plot = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

d3.csv("data.csv").then(function(projectdata){
  var scX = d3.scaleLinear()
  .domain(d3.extent(projectdata, d => d.age))
  .range([0, plotWidth]);
  var scY = d3.scaleLinear()
  .domain(d3.extent(projectdata, d => d.smokes))
  .range([plotHeight, 0]);

    //console.log(projectdata)
    projectdata.forEach(function(data){
      data.age = +data.age;
      console.log(data.age)
      data.smokes = +data.smokes
      console.log(data.smokes)
    })

    plot.selectAll('circle')
        .data(projectdata)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', d => scX(d.age))
        .attr('cy', d => scY(d.smokes))
});
