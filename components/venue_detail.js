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
  venuePhoto: {
    height: 150,
  },
  venueCard: {
    backgroundColor: Color.white,
  },
  venueInfo: {
    padding: 20,
    flex: 1,
  },
  venueInfoBox: {
    width: 250,
    paddingBottom: 10,
  },
  venueInfoLabel: {
    color: Color.black,
    fontSize: 11,
  },
  venueInfoValue: {
    color: Color.black,
    fontSize: 11,
  },
  description: {
    height: 100,
    borderColor: Color.light_blue,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 20,
    marginTop: 0,
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
        {this.image()}

        <View style={styles.venueInfo}>
          <SquareNameBox
            value={this.props.name}
            onChange={this.props.onChange('name')}
            editing={this.props.editing}
          />

          <SquareInfoBox
            label='ADDRESS'
            value={this.props.address}
            onChange={this.props.onChange('address')}
            editing={this.props.editing}
          />
          <SquareInfoBox
            label='PHONE'
            value={this.props.phone}
            onChange={this.props.onChange('phone')}
            editing={this.props.editing}
          />
          <SquareInfoBox
            label='WEBSITE'
            value={this.props.website}
            onChange={this.props.onChange('website')}
            editing={this.props.editing}
          />
        </View>

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
