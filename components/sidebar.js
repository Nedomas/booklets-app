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
    height: 700,
    alignItems: 'stretch',
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
    borderLeftWidth: 5,
    borderLeftColor: Color.mirage_black,
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
  active: {
    borderLeftWidth: 5,
    borderLeftColor: Color.red,
  },
});

module.exports = React.createClass({
  activeStyle: function(booklet) {
    if (booklet.id != this.props.current_booklet_id) return {};

    return styles.active;
  },
  render: function() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.menuHeading}>Your Guides</Text>

        {_.map(this.props.booklets, (booklet) => {
          return (
            <TouchableHighlight style={[styles.menuItem, this.activeStyle(booklet)]} onPress={(e) => this.props.onChange(booklet.id)}>
              <Text style={styles.menuItemText}>{booklet.name}</Text>
            </TouchableHighlight>
          );
        })}

        <TouchableHighlight style={styles.actionItem} onPress={this.props.onNew}>
          <Text style={styles.actionItemText}>+ NEW GUIDE</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
});
