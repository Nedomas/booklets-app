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
  button: {
    backgroundColor: Color.transparent_red,
    borderColor: Color.red,
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    color: Color.red,
  },
});

module.exports = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight style={styles.button} onPress={this.props.onPress}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});
