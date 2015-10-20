'use strict';

var React = require('react-native');
var EventEmitter = require('EventEmitter');
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
  componentWillMount() {
    this.event_emitter = new EventEmitter();
  },
  handleRightButtonPress(data) {
    this.event_emitter.emit('rightButtonPress', {});
  },
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Your Guide',
          rightButtonTitle: 'Clear all',
          component: Cards,
          onRightButtonPress: this.handleRightButtonPress,
          passProps: {
            events: this.event_emitter,
          }
        }}
      />
    );
  }
});
