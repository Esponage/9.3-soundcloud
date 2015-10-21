import React from 'react';
import { Link } from 'react-router';

var Search = React.createClass({

  getInitialState() {
    return {
      search: "",
      results: []
    };
  },

  handleChange(event) {
    this.setState({search: event.target.value});
  },

  handleSubmit(event) {
    event.preventDefault();
    SC.get('/tracks', {
      limit: 10,
      q: this.state.search,
      order: 'hotness'
    }).then((tracks) => {
      this.setState({results: tracks});
    });
  },

  render() {
    return (
      <div>
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </form>

        {this.props.children && React.cloneElement(this.props.children, {
          tracks: this.state.results
        })}

        <ul>
          {this.state.results.map((result) => {
            return (
              <li key={result.id}>
                <Link
                  to={`/tracks/${result.id}`}>
                  {result.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

});

export default Search;
