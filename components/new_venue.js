'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  label: {
    marginTop: 80,
    paddingBottom: 20,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

module.exports = React.createClass({
  getInitialState() {
    return {
      query: ''
    };
  },
  changeQuery(query) {
    this.setState({ query });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          What is your favorite Cafe?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={this.changeQuery}
          value={this.state.query}
        />
      </View>
    );
  }
});
