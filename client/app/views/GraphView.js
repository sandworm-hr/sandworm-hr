// Backbone view for the graph
var GraphView = Backbone.View.extend({

  className: 'graph',

  initialize: function() {
    this.render();
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
    // var parseDate = d3.time.format("%Y%m%d").parse;
    // lineData.forEach(function(d) {
    //   d.date = parseDate(d.date);
    // });
    
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

    /*THIS NEEDS TO BE FIXED. UNCOMMENT AND COMMENT OUT ABOVE LINEFUNCTION WHEN READY TO TEST*/
    // var lineFunction = d3.svg.line()
    //     .x(function(stock) { return x(function(d) { return d.date; }); })
    //     .y(function(stock) { return y(function(d) { return d.value; }); });

    var svg = d3.select('.graph').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var lineData = [];
    stocks.forEach(function(stock) {
      /*THIS MAY NOT BE BEST OPTION. THIS PUSHES EACH TRAJECTORY ARRAY INTO
        A PARENT ARRAY DECLARED ABOVE*/
      // lineData.push(stock.getTrajectory());
      var lineData = stock.getTrajectory();
    // }, this);

      /*UNINDENT BELOW CODE IF YOU TRY METHOD IN WHICH YOU PUSH EACH TRAJECTORY INTO
        A PARENT ARRAY. IN THAT CASE, LINEDATA WILL HOLD AN ARRAY OF STOCKS DATA ARRAYS*/
      // x.domain([
      //    d3.min(lineData, function(stock) { return d3.min(stock, function(d) { return d.date; }); }),
      //    d3.max(lineData, function(stock) { return d3.max(stock, function(d) { return d.date; }); })
      //  ]);

      // y.domain([
      //    d3.min(lineData, function(stock) { return d3.min(stock, function(d) { return d.value; }); }),
      //    d3.max(lineData, function(stock) { return d3.max(stock, function(d) { return d.value; }); })
      //  ]);

      x.domain(d3.extent(lineData, function(d) {return d.date; }));
      y.domain(d3.extent(lineData, function(d) {return d.value; }));

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

      svg.append("path")
          .datum(lineData)
          .attr("class", "line")
          .attr("d", lineFunction);
          // .attr("d", lineFunction(lineData))
          // .attr("class", "line")
          // .attr("stroke", "blue")
          // .attr("stroke-width", 2)
          // .attr("fill", "none"); 

    }, this);

  },

  render: function() {
    this.$el.children().detach();
    this.plotLine(this.collection, this);
    //this.collection.forEach(this.plotLine, this);
    return this.$el;
  }

});
