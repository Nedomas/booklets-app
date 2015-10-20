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
  name: {
    paddingTop: 20,
  },
  city: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  venuePhoto: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  venueCard: {
    backgroundColor: Color.white,
    alignItems: 'center',
    marginBottom: 50,
  },
});

module.exports = React.createClass({
  image() {
    if (!this.props.photo_url) return false;

    return (
      <Image
        style={styles.venuePhoto}
        source={{uri: this.props.photo_url}}
      />
    );
  },
  render: function() {
    return (
      <View style={styles.venueCard}>
        {this.image()}

        <SquareNameBox
          style={styles.name}
          value={this.props.name}
          onChange={this.props.onChange('name')}
          editing={this.props.editing}
        />

        <Text style={styles.city}>Stockholm, Sweden</Text>
      </View>
    );
  }
});
          // onFocus={this.focus('description')}
