(function() {
  /* Data */
  var nbValues = 10;
  var dataset = [];
  for (var i = 0; i < nbValues; i++) {
      var newNumber = Math.floor((Math.random() * 30) + 2);
      dataset.push(newNumber);
  }
  var maxValue = Math.max(...dataset);

  /* SVG properties */
  var width = 400;
  var height = 400;

  /* graphic bar */
  var barPadding = 6;
  var gbSvg = d3.select("body").select("#graphic-bar")
                .attr("width", width)
                .attr("height", height);
  var gbBars = gbSvg.selectAll("rect")
                     .data(dataset)
                     .enter()
                     .append("rect");
  gbBars.attr("width", (width / nbValues) - barPadding)
        .attr("height", function(d) { return d * (height / maxValue) })
        .attr("x", function(d, i) { return i * ( this.width.baseVal.value + barPadding ) + (barPadding/2); })
        .attr("y", function(d) { return height - this.height.baseVal.value });
  var gbLabels = gbSvg.selectAll("text")
                      .data(dataset)
                      .enter()
                      .append("text");
  gbLabels.text(function(d) { return d; })
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) { return i * width/nbValues + 0.5*width/nbValues; })
          .attr("y", height - 3);
})();
