'use strict';

var React = require('react-native');
var Map = require('./map');

var {
  NavigatorIOS,
  StyleSheet,
} = React;

var gray = '#F9F9FB';

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
          component: Map,
          title: 'Your city guide',
        }}
      />
    );
  }
});
