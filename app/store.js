import $ from 'jquery';
import Backbone from 'backbone';

let favorites;

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'cqhizBKK5iWlCpLhuxeaFOeZgkPvHFQgLvDWQWAz');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'cUhIJYNjs2h0oQfFPfW4MYF5QuGxgz43I47v2I65');
    }
  }
});

const Favorite = Backbone.Model.extend({
  idAttribute: "objectId",
});

const FavoritesCollection = Backbone.Collection.extend({
  url: "https://api.parse.com/1/classes/Favorite",
  model: Favorite,
  parse(response) {
    return response.results;
  }
});

export default {
  getFavoritesCollection(){
    return (favorites = favorites || new FavoritesCollection())
  },
};
