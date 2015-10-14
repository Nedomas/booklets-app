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
    backgroundColor: Color.black,
    borderColor: Color.white,
    borderWidth: 2,
    padding: 30,
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    color: Color.white,
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
