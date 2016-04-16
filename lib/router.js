Router.configure({
  layoutTemplate: 'layout', 
});

Router.route('/', {name: 'inicio'});
//Router.route('/pieChart', {name: 'pieChart'});
Router.route('/pieChart', function(){
	this.render("pieChart");
	this.render("pieDePagina", {to: "pie"});
});