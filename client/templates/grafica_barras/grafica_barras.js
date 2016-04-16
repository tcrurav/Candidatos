Template.graficaBarras.onRendered( function(){
    //I thought .rendered is deprecated? Correct. Updated.
    //define constants, height/width
    var margin = {top: 50, right: 20, bottom: 30, left: 40},
        width = 500 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    //define scales and axes
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(3);

    //define key function to bind elements to documents
    //var key = function(d) {
    //    return d._id;
    //};

    //define the SVG element by selecting the SVG via its id attribute
    var svg = d3.select("#barChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
          .text("Votos");

    //declare a Deps.autorun block
    Deps.autorun(function(){

        //perform a reactive query on the collection to get an array
        var dataset = [];
        var votosRajoy = Votos.find({presidente: "rajoy"}).count();
        var votosPedro = Votos.find({presidente: "pedro"}).count();
        var votosPablo = Votos.find({presidente: "pablo"}).count();
        var votosAlbert = Votos.find({presidente: "albert"}).count();

        dataset.push({presidente: "rajoy", votos: votosRajoy});
        dataset.push({presidente: "pedro", votos: votosPedro});
        dataset.push({presidente: "pablo", votos: votosPablo});
        dataset.push({presidente: "albert", votos: votosAlbert});

        console.log(dataset);

        //update scale domains and axises
        x.domain(dataset.map(function(d) { return d.presidente; }));
        y.domain([0, d3.max(dataset, function(d) { return d.votos; })]);

        //Update X axis
        svg.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);
        
        //Update Y axis
        svg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(yAxis);

        //select elements that correspond to documents
        var barras = svg.selectAll(".bar")
          .data(dataset//, key
            );
        

        //handle new documents via enter()
        barras.enter()
            .append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.presidente); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.votos); })
              .attr("height", function(d) { return height - y(d.votos); })
              //.attr("data-id", function(d) { return d._id; })
              ;       

        //handle updates to documents via transition()
        barras.transition()
            .duration(500)
              .attr("x", function(d) { return x(d.presidente); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.votos); })
              .attr("height", function(d) { return height - y(d.votos); });


        //handle removed documents via exit()
        barras.exit()
            .transition()
            .duration(500)
            .attr("x", -x.rangeBand())
            .remove();
    });
});                        