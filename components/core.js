'use strict';

var React = require('react-native');
var App = require('./app');

var {
  NavigatorIOS,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: App,
          title: 'Login',
          passProps: { step: 1 },
        }}
      />
    );
  }
});
