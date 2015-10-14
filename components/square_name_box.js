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
  venueName: {
    color: Color.black,
    paddingBottom: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: Color.light_blue,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
  },
});

module.exports = React.createClass({
  editingBox: function() {
    return (
      <TextInput
        style={styles.input}
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
