var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');

var SearchStep = require('./search_step');
var Squares = require('./squares');
var Url = require('./url');
var Color = require('./color');

var ShowSquare = require('./show_square');
var Email = require('./email');

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
  async createBooklet() {
    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const resp = await fetch(Url.createBooklet(), opts);
    var booklet_id = JSON.parse(resp._bodyText).booklet_id;

    await this.saveBookletId(booklet_id);
    return booklet_id;
  },
  async ensureBooklet() {
    var id = await AsyncStorage.getItem(BOOKLET_STORAGE_KEY);
    if (id) return Url.booklet_id = id;

    Url.booklet_id = await this.createBooklet();
  },
  async saveBookletId(booklet_id) {
    return AsyncStorage.setItem(BOOKLET_STORAGE_KEY, String(booklet_id));
  },
  async getSquares() {
    await this.ensureBooklet();

    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    var booklet_id = 1

    fetch(Url.allSquares(), opts).then((resp) => {
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
        square_id: square.id,
        square_order: square.order,
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
  handleEditPress(square_id) {
    const square = this.findSquare(square_id);

    this.props.navigator.push({
      title: square.name,
      component: ShowSquare,
      rightButtonTitle: 'Edit',
      onRightButtonPress: this.handleRightButtonPress,
      passProps: {
        venue_id: square.venue_id,
        square_id: square.id,
        type: 'local',
        square_order: square.order,
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
        onPress={this.handleEditPress}
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
