Template.graficaPieChart.onRendered( function(){
  //Width and height
  var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;
  /*var w = 300;
  var h = 300;

  var outerRadius = w / 2;
  var innerRadius = 0;

  var arc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
  */
  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  /*var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);*/
   
  //Easy colors accessible via a 10-step ordinal scale
  //var color = d3.scale.category10();
  var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d.votos;
    });

  //Create SVG element
  var svg = d3.select("#pieChart1")
        .attr("width", width)
        .attr("height", height)
      .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var key = function(d){ 
    return d.data._id;
  };

  Deps.autorun(function(){

    var votosRajoy = Votos.find({presidente: "rajoy"}).count();
    var votosPedro = Votos.find({presidente: "pedro"}).count();
    var votosPablo = Votos.find({presidente: "pablo"}).count();
    var votosAlbert = Votos.find({presidente: "albert"}).count();

    var dataset = [];
    dataset.length = 0;

    dataset.push({_id: 1, presidente: "rajoy", votos: votosRajoy});
    dataset.push({_id: 2, presidente: "pedro", votos: votosPedro});
    dataset.push({_id: 3, presidente: "pablo", votos: votosPablo});
    dataset.push({_id: 4, presidente: "albert", votos: votosAlbert});

    console.log(dataset);

    var arcs = svg.selectAll(".g.arc")
            .data(pie(dataset)
              , key
              );

    var newGroups = 
      arcs
        .enter()
        .append("g")
        .attr("class", "arc");
    
    //Draw arc paths
    newGroups
      .append("path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("d", arc);
    
    //Labels
    newGroups
      .append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.votos;
      });

    arcs
      .transition()
      .select('path')
      .attrTween("d", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });
   
    arcs
      .transition()
      .select('text')
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .text(function(d) {
        return d.votos;
      });

    arcs
      .exit()
      .remove();
  });
});                     