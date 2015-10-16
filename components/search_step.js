'use strict';

var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');

var Url = require('./url');
var ShowSquare = require('./show_square');
var Color = require('./color');
var ProgressBar = require('./progress_bar');
var VenueSearchItem = require('./venue_search_item');

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
    marginTop: 150,
    marginLeft: 100,
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
      var venues = JSON.parse(resp._bodyText).venues
      this.setState({ loading: false, venues: venues });
    });
  },
  handleRightButtonPress(data) {
    this.event_emitter.emit('rightButtonPress', {});
  },
  openVenue(venue_id, name) {
    this.props.navigator.push({
      title: name,
      component: ShowSquare,
      rightButtonTitle: 'Edit',
      onRightButtonPress: this.handleRightButtonPress,
      passProps: {
        venue_id: venue_id,
        square_id: this.props.square_id,
        square_order: this.props.square_order,
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
  render: function() {
    if (this.state.loading) {
      var bottom_part = <ActivityIndicatorIOS style={styles.loader} animating={true} size='large' color={Color.dark_gray} />
    } else {
      var bottom_part = <View style={styles.venueList}>
        {_.map(this.state.venues, (venue) => {
          return (
            <VenueSearchItem {...venue} onPress={this.openVenue} />
          );
        })}
      </View>
    }

    return (
      <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
        <ProgressBar squares={this.props.squares} />
        <Text style={styles.question}>
          {this.question()}
        </Text>
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
