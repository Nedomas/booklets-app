'use strict';

var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');

var {
  Text,
  View,
  TouchableHighlight,
} = React;

module.exports = React.createClass({
  getInitialState() {
    return {
      step: this.props.step
    };
  },
  openSearch(step) {
    this.props.navigator.replace({
      title: 'New Venue',
      component: SearchStep,
      passProps: {
        step: step,
        nextVenue: this.nextVenue
      },
    });
  },
  nextVenue() {
    var new_step = this.state.step + 1;
    this.setState({ step: new_step });
    this.openSearch(new_step);
  },
  exec() {
    this.openSearch(this.props.step);
  },
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.exec}>
          <Text style={{paddingTop: 100 }}>
          Hello
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});
