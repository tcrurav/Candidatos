Template.fotos.events({
	'click #rajoy': function(){
		Votos.insert({presidente: "rajoy"});
	},
	'click #pedro': function(){
		Votos.insert({presidente: "pedro"});
	},
	'click #pablo': function(){
		Votos.insert({presidente: "pablo"});
	},
	'click #albert': function(){
		Votos.insert({presidente: "albert"});
	}
});