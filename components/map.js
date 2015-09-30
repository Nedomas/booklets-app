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
      this.setState({ squares: squares });
    });
  },
  addVenue() {
    var next_step_number = this.state.squares.length + 1;

    this.props.navigator.push({
      title: 'Search for a venue',
      component: SearchStep,
      passProps: {
        step: next_step_number,
      },
    });
  },
  render: function() {
    return (
      <View style={{paddingTop: 100 }}>
        {_.map(this.state.squares, function(square) {
          return (
            <Text key={square.id}>
              {square.photo_url}
            </Text>
          );
        })}
        <TouchableHighlight onPress={this.addVenue}>
          <Text style={{paddingTop: 100 }}>
            Add a venue
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});
