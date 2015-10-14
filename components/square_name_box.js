'use strict';

var React = require('react-native');

var Color = require('./color');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var styles = StyleSheet.create({
  box: {
    width: 250,
    paddingBottom: 10,
  },
  label: {
    color: Color.black,
    fontSize: 11,
  },
  value: {
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
  venueName: {
    color: Color.black,
    paddingBottom: 10,
    fontSize: 16,
  },
});

module.exports = React.createClass({
  editingBox: function() {
    return (
      <TextInput
        style={styles.description}
        placeholder={this.props.label}
        onChangeText={this.props.onChange}
        value={this.props.value}
      />
    );
  },
  name: function() {
    return (
      <Text style={styles.venueName}>
        {this.props.value}
      </Text>
    );
  },
  render: function() {
    return this.props.editing ? this.editingBox() : this.name();
  }
});
