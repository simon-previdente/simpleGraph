(function() {
  /* Data */
  var nbValues = 10;
  var sumValue = 0;
  var dataset = [];
  for (var i = 0; i < nbValues; i++) {
      var newNumber = Math.floor((Math.random() * 30) + 2);
      sumValue += newNumber;
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


  /* circle graph */
  var circleData = []; var nextStart = 0;
  for (var i = 0; i < dataset.length; i++) {
    var current = {
      'value': dataset[i],
      'start': nextStart,
      'end': nextStart + (dataset[i]/sumValue)*(2*Math.PI)
    }
    circleData.push(current);
    nextStart = current.end;
  }

  var r = Math.min(...[width, height]) / 2;
  var cgSvg = d3.select("body").select("#circle-graph")
                .attr("width", width)
                .attr("height", height);
  var cgGroup = cgSvg.append("g")
                     .attr("transform", "translate("+ r +","+ r +")");
  var cgArcs = cgGroup.selectAll("path")
                      .data(circleData)
                      .enter()
                      .append("path");
  cgArcs.attr("d", d3.svg.arc()
                     .innerRadius(r-40)
                     .outerRadius(r)
                     .startAngle(function(d) { return d.start; })
                     .endAngle(function(d) { return d.end; })
       ).attr("fill", function(d,i) { return (i%2==0 ? "red" : "blue"); });
})();
