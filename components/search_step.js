'use strict';

var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');

var Url = require('./url');
var ShowSquare = require('./show_square');
var Color = require('./color');
var ProgressBar = require('./progress_bar');
var VenueSearchItem = require('./venue_search_item');
var CategorySelect = require('./category_select');
var Loader = require('./loader');

var {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    backgroundColor: Color.gray,
    paddingLeft: 10,
    paddingRight: 10,
  },
  question: {
    paddingBottom: 10,
    fontSize: 14,
  },
  answer: {
    height: 40,
    borderColor: Color.light_blue,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  loader: {
    marginTop: 110,
  },
  venueList: {
    marginTop: 15,
    paddingTop: 0,
  },
  venueItem: {
    backgroundColor: Color.white,
    height: 100,
    marginBottom: 15,
    borderRadius: 2,
  },
  venuePhoto: {
    height: 100,
  },
  venueName: {
    textAlign: 'center',
    color: Color.white,
    paddingBottom: 5,
    fontSize: 16,
  },
  venueAddress: {
    textAlign: 'center',
    color: Color.white,
    fontSize: 12,
  },
  insideVenuePhoto: {
    padding: 20,
    paddingTop: 30,
    height: 100,
    backgroundColor: 'hsla(0, 0%, 0%, .7)',
    borderRadius: 2,
  },
});

module.exports = React.createClass({
  getInitialState() {
    return {
      query: '',
      category: this.props.square.category,
      venues: []
    };
  },
  changeQuery(query) {
    this.setState({ query });
    this.debouncedGetVenues();
  },
  componentWillMount() {
    this.event_emitter = new EventEmitter();
    this.debouncedGetVenues = _.debounce(this.getVenues, 1000);
  },
  getVenues() {
    this.setState({ loading: true });
    var data = { query: this.state.query }

    var opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }

    fetch(Url.venuesSearch(), opts).then((resp) => {
      var venue_squares = JSON.parse(resp._bodyText).venue_squares;
      this.setState({ loading: false, venue_squares: venue_squares });
    });
  },
  handleRightButtonPress(data) {
    this.event_emitter.emit('rightButtonPress', {});
  },
  openVenueSquare(venue_square) {
    venue_square.id = this.props.square.id;
    venue_square.order = this.props.square.order;
    venue_square.category = this.state.category;

    this.props.navigator.push({
      title: venue_square.name,
      component: ShowSquare,
      rightButtonTitle: 'Edit',
      onRightButtonPress: this.handleRightButtonPress,
      passProps: {
        square: venue_square,
        events: this.event_emitter,
      },
    });
  },
  question() {
    var questions = [
      'What is your favorite Cafe?',
      'What is your favorite breakfast place?',
      'What is your favorite bar?',
    ];

    // var question_no = this.props.step;
    // if (question_no > questions.length) question_no = questions.length;
    //
    return questions[1];
  },
  changeCategory(new_category) {
    this.setState({ category: new_category });
  },
  render: function() {
    if (this.state.loading) {
      var bottom_part = <Loader style={styles.loader} />;
    } else {
      var bottom_part = <View style={styles.venueList}>
        {_.map(this.state.venue_squares, (venue_square) => {
          return (
            <VenueSearchItem {...venue_square} onPress={(e) => this.openVenueSquare(venue_square)} />
          );
        })}
      </View>
    }

    return (
      <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
        <ProgressBar squares={this.props.squares} />
        <CategorySelect category={this.state.category} onChange={this.changeCategory}/>
        <TextInput
          style={styles.answer}
          onChangeText={this.changeQuery}
          value={this.state.query}
          autoFocus
        />
        {bottom_part}
      </ScrollView>
    );
  }
});
