import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';

var ShowTrack = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    tracks: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {tracks: []};
  },

  getInitialState() {
    return {
      track: {},
    };
  },

  componentWillMount() {
    this.fetchTrack();
  },

  componentWillReceiveProps() {
    this.fetchTrack();
  },

  fetchTrack() {
    SC.get(`/tracks/${this.props.params.id}`).then((track) => {
      this.setState({ track: track });
      SC.stream(`/tracks/${this.props.params.id}`).then((stream) => {
        this.setState({ stream: stream });
      });
    });
  },

  togglePlaying() {
    this.state.stream && this.state.stream.toggle();
    this.forceUpdate();
  },

  render() {
    var tracks = this.props.tracks;
    var track = _.findWhere(tracks, {id: Number(this.props.params.id)});
    var index = this.props.tracks.indexOf(track);
    var prevIndex = index > 0 && index - 1;
    var nextIndex = index < (tracks.length - 1) && index + 1;
    var prev = prevIndex && tracks[prevIndex];
    var next = nextIndex && tracks[nextIndex];

    return (
      <div>
        <h1>{this.state.track.title}</h1>
        <button onClick={this.togglePlaying}>
          {this.state.stream && this.state.stream.isPlaying() ? "Pause" : "Play"}
        </button>

        {!!prev && <Link to={`/tracks/${prev.id}`}>Previous</Link>}
        {!!next && <Link to={`/tracks/${next.id}`}>Next</Link>}
      </div>
    );
  }
});

export default ShowTrack;
