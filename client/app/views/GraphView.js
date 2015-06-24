// Backbone view for the graph
var GraphView = Backbone.View.extend({

  className: 'graph',

  initialize: function() {
    this.collection.on('sync', this.render, this);
    this.collection.on ('remove', this.render, this);
  },

  plotLine: function(stocks) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10},
        padding = {top: 10, right: 10, bottom: 10, left: 10},
        outerWidth = 960,
        outerHeight = 500,
        innerWidth = outerWidth - margin.left - margin.right,
        innerHeight = outerHeight - margin.top - margin.bottom,
        width = innerWidth - padding.left - padding.right,
        height = innerHeight - padding.top - padding.bottom;

    var bisectDate = d3.bisector(function(d) { return d.date; }).left;
    var formatValue = d3.format(",.2f");
    var formatCurrency = function(d) { return "$" + formatValue(d); };

    var Xrange = [0,width];
    var Yrange = [height, 0];

    var x = d3.time.scale().range(Xrange);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var y = d3.scale.linear().range(Yrange);
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var lineFunction = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    var lineData = stocks.map(function(stock) {
      return stock.getTrajectory();
    });
    var averageStocks = stocks.getAverage();
    lineData.push(averageStocks);

    var left = margin.left + padding.left;
    var bottom = margin.bottom + padding.bottom;
    var maxY = d3.max(lineData, function(stock) { return d3.max(stock, function(d) { return d.value; }); });
    var maxYLen = (Math.round(maxY)).toString().length * 14;

    var svg = d3.select('.graph').append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + maxYLen + "," + bottom + ")");


    var colors = d3.scale.category10();
    x.domain(d3.extent(averageStocks, function(d) {return d.date; }));
    y.domain([
       d3.min(lineData, function(stock) { return d3.min(stock, function(d) { return d.value; }); }),
       d3.max(lineData, function(stock) { return d3.max(stock, function(d) { return d.value; }); })
     ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "translate(" + width + ",0)")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    lineData.forEach(function(stock, index) {
      svg.append("path")
          .datum(stock)
          .attr("class", "line " + stock[0].symbol)
          .attr("d", lineFunction)
          .style("stroke", function (d) {
            if(stock[0].symbol === 'all') {
              return 'black';
            } else {
              return colors((index)%20);
            }
          });
    });

    var mousemove = function() {
      var x0 = x.invert(d3.mouse(this)[0]);
      var y0 = y.invert(d3.mouse(this)[1]);
      var closest;
      var max = Number.MAX_VALUE;
      for (var i = 0; i < lineData.length; i++) {
        var bis = bisectDate(lineData[i], x0, 1);
        var distance = Math.abs(lineData[i][bis].value - y0);
        if ( distance <= max && lineData[i][bis].value !== 0) {
          max = distance;
          closest = lineData[i][bis];
        }
      }
      focus.attr("transform", "translate(" + x(closest.date) + "," + y(closest.value) + ")");
      focus.select("text").text(closest.symbol.toUpperCase() + " : " + formatCurrency(closest.value));
    };

    var focus = svg.append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("circle")
          .attr("r", 4.5);

      focus.append("text")
          .attr("x", 9)
          .attr("dy", ".35em")
          .attr("font-family", "sans-serif")
          .attr("fill", '#060');

      svg.append("rect")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); })
          .on("mousemove", mousemove);


  },

  render: function() {
    this.$el.children().detach();
    if (this.collection.length > 0) {  
      this.plotLine(this.collection, this);
      return this.$el;
    }
  }

});
