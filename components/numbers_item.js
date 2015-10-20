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
  squareName: {
    fontSize: 6,
    color: Color.grey,
    paddingTop: 30,
  },
  container: {
    alignItems: 'center',
  },
});


module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.squareName}>
          Map legend
        </Text>
      </View>
    );
  }
});
