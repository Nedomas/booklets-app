'use strict';

var React = require('react-native');
var _ = require('lodash');

var Color = require('./color');
var SquareInfoBox = require('./square_info_box');
var SquareNameBox = require('./square_name_box');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
} = React;

var styles = StyleSheet.create({
  venueCard: {
    backgroundColor: Color.white,
  },
  description: {
    height: 300,
    borderColor: Color.light_blue,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 20,
    marginTop: 40,
    fontSize: 14,
  },
});

module.exports = React.createClass({
  focus(type) {
    setTimeout((e) => {
      let scrollResponder = this.props.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.refs[type]),
        110, //additionalOffset
        true
      );
    }, 50);
  },
  image() {
    if (!this.props.photo_url) return false;

    return (
      <Image
        style={styles.venuePhoto}
        source={{uri: this.props.photo_url}}
      />
    );
  },
  handleFocus(type) {
    setTimeout((e) => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.refs[type]),
        110, //additionalOffset
        true
      );
    }, 50);
  },
  render: function() {
    return (
      <View style={styles.venueCard}>
        <TextInput
          style={styles.description}
          placeholder='Tips and tricks for your guests here.'
          onChangeText={this.props.onChange('description')}
          value={this.props.description}
          multiline
        />
      </View>
    );
  }
});
          // onFocus={this.focus('description')}
