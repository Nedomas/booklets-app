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
  squarePhoto: {
    height: 50,
  },
  squareName: {
    paddingTop: 5,
    fontSize: 10,
    color: Color.black,
  },
});


module.exports = React.createClass({
  render: function() {
    return (
      <View>
        <Image
          style={styles.squarePhoto}
          source={{uri: this.props.photo_url}}
        />

        <Text style={styles.squareName}>
          {_.trunc(this.props.name, 23)}
        </Text>
      </View>
    );
  }
});
