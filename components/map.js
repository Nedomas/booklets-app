var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');

var SearchStep = require('./search_step');
var Squares = require('./squares');
var Url = require('./url');
var Color = require('./color');

var ShowSquare = require('./show_square');

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
  print() {
    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    var booklet_id = 1

    fetch(Url.print(booklet_id), opts).then((resp) => {
      alert('done');
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
  handleEditPress(square_id, step) {
    this.props.navigator.push({
      title: name,
      component: ShowSquare,
      rightButtonTitle: 'Save',
      onRightButtonPress: this.handleRightButtonPress,
      passProps: {
        square_id: square_id,
        type: 'local',
        step: step,
        events: this.event_emitter,
      },
    });
  },
  destroySquare(square_id) {
    var opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    fetch(Url.destroySquare(square_id), opts).then((resp) => {
      var squares = JSON.parse(resp._bodyText).squares

      this.setState({ squares: squares });
    });
  },
  render: function() {
    if (this.state.loading) {
      var loader_or_squares = <Text>Loading</Text>
    } else {
      var loader_or_squares = <Squares
        squares={this.state.squares}
        addVenue={this.addVenue}
        print={this.print}
        editPress={this.handleEditPress}
        destroySquare={this.destroySquare}
      />
    }

    return (
      <View style={styles.container}>
        {loader_or_squares}
      </View>
    );
  }
});
