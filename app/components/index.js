import React from 'react';
import store from 'store';
import { Link } from 'react-router';

var Index = React.createClass({
  propTypes: {
      favorites: React.PropTypes.object
  },

  getDefaultProps(){
    return {
      favorites: store.getFavoritesCollection()
    }
  },


  getInitialState(){
    return {
      title: "",
      favorites: []
    }
  },

  componentWillMount(){
      this.props.favorites.fetch();
      this.props.favorites.on('sync add remove', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnMount(){
      this.props.favorites.off('sync add remove', null, this);
  },

  render() {
    var favorites = this.props.favorites.toJSON();
    console.log(favorites);


    return (
      <div>
      <h1>Favorites</h1>
      {this.props.children}

          {
            favorites.map((result) =>
              <div key={result.id}><Link to={`/favorites/${result.id}`}>{result.title}</Link></div>)
            }

      </div>

    );
  }

});

export default Index;
