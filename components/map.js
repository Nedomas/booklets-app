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
    this.getSquares();

    return {
      squares: []
    };
  },
  getSquares() {
    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    var SERVER_URL = 'http://localhost:3000'
    var booklet_id = 1

    fetch(SERVER_URL + '/squares/' + booklet_id + '/all', opts).then((resp) => {
      var squares = JSON.parse(resp._bodyText).squares
    });
  },
  openSearch(step) {
    this.props.navigator.push({
      title: 'New Venue',
      component: SearchStep,
      passProps: {
        step: step,
      },
    });
  },
  addVenue() {
    const new_step = this.state.squares.length + 1;
    this.openSearch(new_step);
  },
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.addVenue}>
          <Text style={{paddingTop: 100 }}>
            Add a venue
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});
