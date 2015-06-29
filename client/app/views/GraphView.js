/* Backbone view for the graph view
find more information on mbostock's page for charting line charts: http://bl.ocks.org/mbostock/3883245 */

var GraphView = Backbone.View.extend({

  className: 'graph col-xs-12 col-md-7',

  initialize: function() {
    this.collection.on('sync edited remove reset', this.render, this);
    var context = this;
    $(window).on("resize", function() {
      context.render.apply(context);
    });
  },

  plotLine: function(stocks) {
    var margin = {top: 60, right: 10, bottom: 20, left: 10},
        padding = {top: 10, right: 10, bottom: 10, left: 10},
        outerWidth = parseInt(d3.select(".col-md-7").style("width")),//700,
        outerHeight = 300,
        innerWidth = outerWidth - margin.left - margin.right,
        innerHeight = outerHeight - margin.top - margin.bottom,
        width = innerWidth - padding.left - padding.right,
        height = innerHeight - padding.top - padding.bottom;

    //find x-intersection with mouse pointer and stock line on chart
    var bisectDate = d3.bisector(function(d) { return d.date; }).left;
    var formatValue = d3.format(",.2f");
    var formatCurrency = function(d) { return "$" + formatValue(d); };

    //set boundaries for chart (pixels) - used to scale chart
    var Xrange = [0,width - 100];
    var Yrange = [height, 0];

    //x-axis scaled in date/time format
    var x = d3.time.scale().range(Xrange).nice(d3.time.year);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    //y-axis scaled in standard linear format ($ values)
    var y = d3.scale.linear().range(Yrange).nice();
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    /*create line expression: x-values=dates of each stock (day), 
      y-values=$ value on that day (adjusted close from yahoo-finance API call) */
    var lineFunction = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

    //data points for all stocks in colleciton (array of days/$values)
    var lineData = stocks.map(function(stock) {
      return stock.getTrajectory();
    });

    //final data array for the average of all stocks - appended to stocks array
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

    //create unique line color for each stock in collection
    var colors = d3.scale.category10();

    //set x-domain to average stock array date range (this array includes ALL dates)
    x.domain(d3.extent(averageStocks, function(d) {return d.date; }));
    //set y-domain to min and max stock $ ranges
    y.domain([
       d3.min(lineData, function(stock) { return d3.min(stock, function(d) { return d.value; }); }),
       d3.max(lineData, function(stock) { return d3.max(stock, function(d) { return d.value; }); })
     ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                //rotate x-axis labels
                return "rotate(-45)" 
                });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "translate(" + width + ",0)")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

    //append each stock array in lineData array as a PATH (line) on chart
    lineData.forEach(function(stock, index) {
      svg.append("path")
          .datum(stock)
          .attr("class", "line " + stock[0].symbol)
          .attr("d", lineFunction)
          .style("stroke", function (d) {
            if(stock[0].symbol === 'average') {
              //set average line to black
              return 'black';
            } else {
              //make sure index is scaled down to less than 10; colors variable uses d3 category10()
              return colors((index)%10);
            }
          });

      //append label to each line if it is NOT average
      if(stock[0].symbol !== 'average') {
        svg.append("text")
            .attr("transform", "translate(" + 600 + "," + y(stock[stock.length-1].value + 10)  + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .text(stock[0].symbol);
        }
     });

    //logic for stock info display on mouseover
    var mousemove = function() {
      var x0 = x.invert(d3.mouse(this)[0]);
      var y0 = y.invert(d3.mouse(this)[1]);
      var closest;
      var max = Number.MAX_VALUE;
      //find stock line that is closest to mouse pointer (y-distance)
      for (var i = 0; i < lineData.length; i++) {
        /*always use x0 = current mouse x location as x-bisection; 
        y-bisection is set to closest stock line*/
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

    //logic to create/append dot element for mouseover
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
    this.$el.empty();
    if (this.collection.length > 0) {  
      this.plotLine(this.collection, this);
      return this.$el;
    }
  }

});
