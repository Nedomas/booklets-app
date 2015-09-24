'use strict';

var React = require('react-native');
var NewVenue = require('./new_venue');

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
          component: NewVenue,
          title: 'New Venue',
          passProps: { myProp: 'foo' },
        }}
      />
    );
  }
});
