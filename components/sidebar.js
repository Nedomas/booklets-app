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
  container: {
    flex: 1,
    paddingTop: 30,
    width: 300,
    height: 600,
    backgroundColor: Color.mirage_black,
    paddingLeft: 10,
    paddingRight: 10,
  },
  menuHeading: {
    color: Color.white,
    fontWeight: '600',
    fontSize: 20,
    paddingBottom: 20,
  },
  menuItem: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: Color.red,
  },
  menuItemText: {
    color: Color.white,
    fontSize: 16,
  },
  actionItem: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  actionItemText: {
    color: Color.white,
    fontSize: 14,
  },
});

module.exports = React.createClass({
  render: function() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.menuHeading}>Your Maps</Text>

        {_.map(this.props.booklets, (booklet) => {
          return (
            <TouchableHighlight style={styles.menuItem} onPress={(e) => this.props.onChange(booklet.id)}>
              <Text style={styles.menuItemText}>{booklet.name}</Text>
            </TouchableHighlight>
          );
        })}

        <TouchableHighlight style={styles.actionItem} onPress={this.props.onNew}>
          <Text style={styles.actionItemText}>+ NEW MAP</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
});
