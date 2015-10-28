var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');

var SearchStep = require('./search_step');
var Squares = require('./squares');
var Url = require('./url');
var Color = require('./color');

var ShowSquare = require('./show_square');
var Email = require('./email');
var SaveButton = require('./save_button');
var Loader = require('./loader');

const BOOKLET_STORAGE_KEY = '@booklets:booklet_id';

var {
  Image,
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableHighlight,
  LinkingIOS,
  AsyncStorage,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    backgroundColor: Color.gray,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loader: {
    marginTop: 160,
  },
});

module.exports = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState() {
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
  componentDidMount() {
    this.addListenerOn(this.props.events, 'rightButtonPress', (e) => this.clearAll());
  },
  async getSquares() {
    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    fetch(Url.allSquares(this.props.booklet_id), opts).then((resp) => {
      var squares = JSON.parse(resp._bodyText).squares
      this.setState({ loading: false, squares: squares });
    });
  },
  findSquare(square_id) {
    return _.find(this.state.squares, { id: square_id });
  },
  addVenue(square_id) {
    var square = this.findSquare(square_id);

    this.props.navigator.push({
      title: 'Search for a venue',
      component: SearchStep,
      passProps: {
        square: square,
        squares: this.state.squares,
      },
    });
  },
  print() {
    LinkingIOS.openURL(Url.print());
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
  handleEditPress(square) {
    this.props.navigator.push({
      title: square.name,
      component: ShowSquare,
      rightButtonTitle: 'Edit',
      onRightButtonPress: this.handleRightButtonPress,
      passProps: {
        square: square,
        events: this.event_emitter,
      },
    });
  },
  clearAll() {
    var opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    this.setState({ loading: true });
    fetch(Url.clearAll(), opts).then((resp) => {
      var squares = JSON.parse(resp._bodyText).squares;

      this.setState({ squares: squares, loading: false });
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

    this.setState({ loading: true });
    fetch(Url.destroySquare(square_id), opts).then((resp) => {
      var squares = JSON.parse(resp._bodyText).squares;

      this.setState({ squares: squares, loading: false });
    });
  },
  changableSquares() {
    return _.select(this.state.squares, { changable: true });
  },
  squares() {
    return (
      <View>
        <Squares
          squares={this.changableSquares()}
          addVenue={this.addVenue}
          print={this.print}
          onPress={this.handleEditPress}
          destroySquare={this.destroySquare}
        />

        <SaveButton onPress={this.print} text='PRINT MY BOOKLET'/>
      </View>
    );
  },
  render: function() {
    if (this.props.booklet_id && !this.state.squares.length) this.getSquares();

    return (
      <View style={styles.container}>
        {this.state.loading ? <Loader style={styles.loader} /> : this.squares()}
      </View>
    );
  }
});
