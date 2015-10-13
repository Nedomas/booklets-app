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
});

module.exports = React.createClass({
  onChange: function(e) {
    this.props.onChange(e.target.value);
  },
  editingBox: function() {
    return (
      <View style={styles.box}>
        <TextInput
          style={styles.description}
          placeholder={this.props.label}
          onChangeText={this.onChange}
          value={this.props.value}
        />
      </View>
    );
  },
  infoBox: function() {
    return (
      <View style={styles.box}>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <Text style={styles.value}>
          {this.props.value}
        </Text>
      </View>
    );
  },
  render: function() {
    return this.props.editing ? this.editingBox() : this.infoBox();
  }
});
