// Backbone view for the graph
var GraphView = Backbone.View.extend({

  className: 'graph',

  initialize: function() {
    // this.render();
    this.collection.on('sync', function() {
      this.render();
    }, this);
  },

  plotLine: function(stocks) {
    var margin = {top: 20, right: 10, bottom: 20, left: 10};
    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

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

    var svg = d3.select('.graph').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var lineData = stocks.normalizeStocks();
    var averageStocks = stocks.getAverage();
    lineData.push(averageStocks);

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
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    lineData.forEach(function(stock, index) {
      console.log(stock[0].symbol);
      svg.append("path")
          .datum(stock)
          .attr("class", "line " + stock[0].symbol)
          .attr("d", lineFunction)
          .style("stroke", function (d) {
            return colors((index)%20);
          });
    });

  },

  render: function() {
    this.$el.children().detach();
    this.plotLine(this.collection, this);
    return this.$el;
  }

});
