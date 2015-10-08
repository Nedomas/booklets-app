var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');

var SearchStep = require('./search_step');
var Squares = require('./squares');
var Url = require('./url');
var Color = require('./color');

var ShowVenue = require('./show_venue');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: Color.gray,
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
      squares: [],
    };
  },
  setupReloads() {
    this.props.navigator.navigationContext.addListener('didfocus', this.reloadSquares);
  },
  reloadSquares() {
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

    var booklet_id = 1

    fetch(Url.allSquares(booklet_id), opts).then((resp) => {
      var squares = JSON.parse(resp._bodyText).squares
      this.setState({ loading: false, squares: squares });
    });
  },
  addVenue() {
    this.props.navigator.push({
      title: 'Search for a venue',
      component: SearchStep,
      passProps: {
        step: this.nextStepNumber(),
      },
    });
  },
  nextStepNumber() {
    return this.state.squares.length + 1;
  },
  componentWillMount() {
    this.event_emitter = new EventEmitter();
  },
  handleRightButtonPress(data) {
    this.event_emitter.emit('rightButtonPress', {});
  },
  handleEditPress(venue_id) {
    this.props.navigator.push({
      title: name,
      component: ShowVenue,
      rightButtonTitle: 'Save',
      onRightButtonPress: this.handleRightButtonPress,
      passProps: {
        id: venue_id,
        type: 'local',
        step: this.nextStepNumber(),
        events: this.event_emitter,
      },
    });
  },
  render: function() {
    if (this.state.loading) {
      var loader_or_squares = <Text>Loading</Text>
    } else {
      var loader_or_squares = <Squares squares={this.state.squares} addVenue={this.addVenue} editPress={this.handleEditPress}/>
    }

    return (
      <View style={styles.container}>
        {loader_or_squares}
      </View>
    );
  }
});
