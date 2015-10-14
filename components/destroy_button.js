var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');
var Color = require('./color');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    top: 0,
    left: 40,
    height: 40,
    width: 40,
    backgroundColor: Color.black,
    borderColor: Color.white,
    borderWidth: 2,
    padding: 5,
    borderRadius: 999,
  },
  symbol: {
    textAlign: 'center',
    color: Color.white,
    marginTop: 5,
  },
});

module.exports = React.createClass({
  render: function() {
    if (!this.props.show) return <View/>;

    return (
      <TouchableHighlight style={styles.bubble} onPress={this.props.onPress}>
        <Text style={styles.symbol}>X</Text>
      </TouchableHighlight>
    );
  }
});
