var React = require('react-native');

var EmptySquare = require('./empty_square');
var FilledSquare = require('./filled_square');

module.exports = React.createClass({
  render: function() {
    if (this.props.empty) {
      return <EmptySquare {...this.props}/>;
    } else {
      return <FilledSquare {...this.props}/>;
    }
  }
});
