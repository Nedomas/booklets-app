'use strict';

var React = require('react-native');
var Map = require('./map');

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
          component: Map,
          title: 'Your city guide',
        }}
      />
    );
  }
});
