'use strict';

var React = require('react-native');
var Cards = require('./cards');

var {
  NavigatorIOS,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Cards,
          title: 'Your Guide',
        }}
      />
    );
  }
});
