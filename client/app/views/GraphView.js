// Backbone view for the graph
var GraphView = Backbone.View.extend({

  className: 'graph',

  initialize: function() {
    this.render();
    this.collection.on('sync', function() {
      this.render();
    }, this);
  },

  plotLine: function(stock) {
    var Xrange = [0,500];//stock.getDateRange();
    var Yrange = [500, 0];
    var lineData = stock.getTrajectory();
    
    var x = d3.time.scale().range(Xrange);
    x.domain(d3.extent(lineData, function(d) {return d.date; }));
    
    var y = d3.scale.linear().range(Yrange);
    y.domain(d3.extent(lineData, function(d) {return d.value; }));

    var lineFunction = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); })
        .interpolate("linear");

    var svg = d3.select('.graph').append("svg")
        .attr("width", 500)//width + margin.left + margin.right)
        .attr("height", 500);//height + margin.top + margin.bottom)
        //.append("g");
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var lineGraph = svg.append("path")
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
