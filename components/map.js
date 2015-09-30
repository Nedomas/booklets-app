var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');
var Squares = require('./squares');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var gray = '#F7F7F8';
var dark_gray = '#B4BCCC';
var white = '#fff';
var red = '#FF3266';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: gray,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

module.exports = React.createClass({
  getInitialState() {
    this.getSquares();
    this.setupReloads();

    return {
      loading: true,
      squares: []
    };
  },
  setupReloads() {
    this.props.navigator.navigationContext.addListener('didfocus', this.reloadSquares);
  },
  reloadSquares() {
    console.log(this.state.loading);
    if (this.state.loading) return;

    this.setState({ loading: true });
    this.getSquares();
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
      this.setState({ loading: false, squares: squares });
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
    if (this.state.loading) {
      var loader_or_squares = <Text>Loading</Text>
    } else {
      var loader_or_squares = <Squares squares={this.state.squares} addVenue={this.addVenue} />
    }

    return (
      <View style={styles.container}>
        {loader_or_squares}
      </View>
    );
  }
});
