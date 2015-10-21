import React from 'react';
import _ from 'underscore';

var Input = React.createClass({
  propTypes: {
    initialValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    type: React.PropTypes.string
  },


  render: function() {
    var value = this.state.value;
    var type = this.props.type || "text";
    var rest = _.omit(this.props, 'type', 'initialValue');
  }
});

export default Input;
