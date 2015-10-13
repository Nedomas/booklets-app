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
  square: {
    padding: 5,
    margin: 5,
    width: 70,
    height: 90,
    marginTop: 10,
    backgroundColor: Color.white,
    borderColor: Color.light_blue,
    borderWidth: 1,
  },
});

module.exports = React.createClass({
  render: function() {
    if (!this.props.show) return <View/>;

    return (
      <TouchableHighlight style={styles.square} onPress={this.props.onPress} >
        <Text>X</Text>
      </TouchableHighlight>
    );
  }
});
