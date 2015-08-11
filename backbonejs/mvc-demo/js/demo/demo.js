/*var Approval = Backbone.Model.extend({});

var Approvals = Backbone.Collection.extend({
  model: Approval,
  url: 'http://u.realworld.local/passbook/approval',
  parse: function(resp) {
  	alert(_.size(resp));
    if (_.size(resp) === 0) {
      this.trigger('nodata');
    }
    return resp.data;
  }
});*/

/*var Song = Backbone.Model.extend({
	defaults: {
		name: "Not specified",
		artist: "Not specified"
	},
	initialize: function(){
		console.log("Music is the answer");
	}
});

var Album = Backbone.Collection.extend({
	model: Song
});
var song1 = new Song({ name: "How Bizarre", artist: "OMC" });
var song2 = new Song({ name: "Sexual Healing", artist: "Marvin Gaye" });
var song3 = new Song({ name: "Talk It Over In Bed", artist: "OMC" });

var myAlbum = new Album([ song1, song2, song3]);
console.log( myAlbum.models ); // [song1, song2, song3]*/

var SearchView = Backbone.View.extend({
    initialize: function(){
      this.render();
    },
    render: function(){
      // Compile the template using underscore
      console.log('2');
      var template = _.template( $("#search_template").html(), {} );
      console.log('1');
      // Load the compiled HTML into the Backbone "el"
      this.$el.html( template );
    }
  });

  var search_view = new SearchView({ el: $("#search_container") });