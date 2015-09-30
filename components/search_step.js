'use strict';

var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');

var Url = require('./url');
var ShowVenue = require('./show_venue');
var Color = require('./color');

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
    paddingLeft: 40,
    paddingRight: 40,
  },
  progress: {
    paddingBottom: 16,
    fontSize: 11,
    textAlign: 'center',
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
    console.log(this.props);
  },
  openVenue(id, name) {
    this.props.navigator.push({
      title: name,
      component: ShowVenue,
      rightButtonTitle: 'Save',
      onRightButtonPress: this.handleRightButtonPress,
      passProps: {
        id: id,
        step: this.props.step,
        events: this.event_emitter,
      },
    });
  },
  render: function() {
    if (this.state.loading) {
      var bottom_part = <ActivityIndicatorIOS style={styles.loader} animating={true} size='large' color={Color.dark_gray} />
    } else {
      var bottom_part = <View style={styles.venueList}>
        {_.map(this.state.venues, (venue) => {
          return (
            <TouchableHighlight key={venue.id} onPress={(e) => { this.openVenue(venue.id, venue.name) }}>
              <View style={styles.venueItem}>
                <Image
                  style={styles.venuePhoto}
                  source={{uri: venue.photo_urls[0]}}
                >
                  <View style={styles.insideVenuePhoto}>
                    <Text style={styles.venueName}>
                      {venue.name}
                    </Text>
                    <Text style={styles.venueAddress}>
                      {venue.address}
                    </Text>
                  </View>
                </Image>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    }

    return (
      <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
        <Text style={styles.progress}>
          STEP {this.props.step} OF 16
        </Text>
        <Text style={styles.question}>
          What is your favorite Cafe?
        </Text>
        <TextInput
          style={styles.answer}
          onChangeText={this.changeQuery}
          value={this.state.query}
        />
        {bottom_part}
      </ScrollView>
    );
  }
});
