// Backbone view for the graph
var GraphView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  plotLine: function(stock) {
    var Xrange = [0,500];//stock.getDateRange();
    var Yrange = stock.getValRange();
    var lineData = stock.getTrajectory();
    
    var x = d3.time.scale().range(Xrange);
    var y = d3.linear.scale().range(Yrange);

    var lineFunction = d3.svg.line()
        .x(function(d) { return d.date; })
        .y(function(d) { return d.value; });

    var svg = d3.select($el).append("svg")
        .attr("width", Xrange[1] - Xrange[0])//width + margin.left + margin.right)
        .attr("height", Yrange[1] - Yrange[0])//height + margin.top + margin.bottom)
        .append("g");
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var lineGraph = svg.append("g")
        .attr("d", lineFunction(lineData))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

  },

  render: function() {
    this.collection.forEach(this.plotLine, this);
    return this.$el;
  }

});
