(function() {
  var dataset = [];
  for (var i = 0; i < 10; i++) {
      var newNumber = Math.floor((Math.random() * 30) + 2);
      dataset.push(newNumber);
  }

  d3.select("body").select("#graphic-bar").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .append("div")
    .attr("class", "filling")
    .style("height", function(d) { return d/Math.max(...dataset)*100 + "%"; })
    .text(function(d) { return d; });

})();
