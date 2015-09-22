/**
 * Created by NNNGUYEN on 9/21/2015.
 */
posiba.controller('chartController', function($scope, $http) {
		// create a message to display in our view
    $scope.message = 'chart Module';
    $scope.chartData = {
      labels: [
        '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'
      ],
      series: [
        {
          label: 'Healthy Sensitive',
          values: [4, 8, 15, 16, 23, 42, 10, 3, 6]
        },
        {
          label: 'Unhealthy',
          values: [12, 43, 22, 11, 73, 25, 1, 6, 15]
        },
        {
          label: 'Very Unhealthy',
          values: [31, 28, 14, 8, 15, 21, 5, 9, 4]
        }
      ]
    };
    $scope.drawChart = function(){
      var data = $scope.chartData;

      var chartWidth     = 700,
        barHeight        = 25,
        groupHeight      = barHeight * data.series.length,
        gapBetweenGroups = 10,
        spaceForLabels   = 150,
        spaceForLegend   = 250;

      // Zip the series data together (first values, second values, etc.)
      var zippedData = [];
      for (var i=0; i<data.labels.length; i++) {
        for (var j=0; j<data.series.length; j++) {
          zippedData.push({
            label: data.series[j].label,
            value: data.series[j].values[i]
          });
        }
      }

      // Color scale
      var color = d3.scale.category20();
      var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

      var xmax = d3.max(zippedData, function(d){
        return d.value;
      });
      var labelMaxLength = d3.max(zippedData, function(d){
        return d.label.length;
      });
      var x = d3.scale.linear()
        .domain([0, xmax])
        .range([0, chartWidth]);

      var y = d3.scale.linear()
        .range([chartHeight + gapBetweenGroups, 0]);

      var yAxis = d3.svg.axis()
        .scale(y)
        .tickFormat('')
        .tickSize(0)
        .orient("left");

      // Specify the chart area and dimensions
      var chart = d3.select(".chart")
        .attr("width", spaceForLabels + chartWidth + spaceForLegend)
        .attr("height", chartHeight);

        var barScales = chart.selectAll("g.barScales")
          .data(zippedData)
          .enter().append("g")
          .attr("class", "barScales")
          .attr("transform", function(d, i) {
            return "translate(" + (spaceForLabels) + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
          });
          barScales.append("text")
              .attr("x", 0)
              .attr("y", barHeight / 2)
              .text(function(d){
                  return d.label;
              });

      // Create bars
      var bar = chart.selectAll("g.barRegion")
        .data(zippedData)
        .enter().append("g")
        .attr("class", "barRegion")
        .attr("transform", function(d, i) {
          return "translate(" + (spaceForLabels + 120) + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
        });

      // Create rectangles of the correct width


      bar.append("rect")
        .attr("fill", function(d,i) { return color(i % data.series.length); })
        .attr("class", "bar")
        .attr("width", function(d){
          return x(d.value);
        })
        .attr("height", barHeight - 1);

      // Add text label in bar
      bar.append("text")
        .attr("x", function(d) { return x(d.value) + 10; })
        .attr("y", barHeight / 2)
        .attr("fill", "red")
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });

      // Draw labels
      bar.append("text")
        .attr("class", "label")
        .attr("x", function(d) { return -200; })
        .attr("y", groupHeight / 2)
        .attr("dy", ".35em")
        .text(function(d,i) {
          if (i % data.series.length === 0)
            return data.labels[Math.floor(i/data.series.length)];
          else
            return ""});

      chart.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + (spaceForLabels + 120) + ", " + -gapBetweenGroups / 2 + ")")
          .call(yAxis);

      // Draw legend
      var legendRectSize = 18,
        legendSpacing  = 4;

      var legend = chart.selectAll('.legend')
        .data(data.series)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
            var height = legendRectSize + legendSpacing;
            var offset = -gapBetweenGroups / 2;
            var horz = spaceForLabels + chartWidth + 200 - legendRectSize;
            var vert = i * height - offset + 10;
            return 'translate(' + horz + ',' + vert + ')';
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function (d, i) { return color(i); })
        .style('stroke', function (d, i) { return color(i); });

      legend.append('text')
        .attr('class', 'legend')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) { return d.label; });
    }
    $scope.drawChart();
});
