var React = require('react-native');
var _ = require('lodash');

var Color = require('./color');
var ProgressHUD = require('react-native-progress-hud');

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
  mixins: [ProgressHUD.Mixin],
  render: function() {
    return (
      <View style={this.props.style}>
        <ProgressHUD
          isVisible={true}
          isDismissible={false}
          overlayColor={'#000'}
          color={Color.red}
        />
      </View>
    );
  }
});
