'use strict';

var React = require('react-native');
var _ = require('lodash');
var Subscribable = require('Subscribable');

var Url = require('./url');
var Color = require('./color');

var {
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
    paddingTop: 85,
    backgroundColor: Color.gray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  progress: {
    paddingBottom: 16,
    fontSize: 11,
    textAlign: 'center',
  },
  venuePhoto: {
    height: 150,
  },
  venueCard: {
    backgroundColor: Color.white,
  },
  venueInfo: {
    padding: 20,
    flex: 1,
  },
  venueName: {
    color: Color.black,
    paddingBottom: 10,
    fontSize: 16,
  },
  venueInfoBox: {
    width: 250,
    paddingBottom: 10,
  },
  venueInfoLabel: {
    color: Color.black,
    fontSize: 11,
  },
  venueInfoValue: {
    color: Color.black,
    fontSize: 11,
  },
  description: {
    height: 100,
    borderColor: Color.light_blue,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 20,
    marginTop: 0,
    fontSize: 14,
  },
});

module.exports = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState() {
    this.getVenue();

    return {
      current_photo_url: '',
      description: '',
    };
  },
  componentDidMount() {
    this.addListenerOn(this.props.events, 'rightButtonPress', this.save);
  },
  changeDescription(description) {
    this.setState({ description });
  },
  save() {
    var data = {
      venue_id: this.props.id,
      order: this.props.step,
      description: this.state.description,
    }

    var opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }

    var booklet_id = 1

    fetch(Url.addSquare(booklet_id), opts).then((resp) => {
      this.props.navigator.popToTop();
    });
  },
  getVenue() {
    var opts = {
      method: 'GET'
    }

    fetch(Url.findVenue(this.props.id), opts).then((resp) => {
      var venue = JSON.parse(resp._bodyText).venue

      this.setState({
        name: venue.name,
        address: venue.address,
        phone: venue.phone,
        photo_urls: venue.photo_urls,
        website: venue.website,
        accepts_credit_card: venue.accepts_credit_card,
        current_photo_url: venue.photo_urls[0],
      });
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.venueCard}>
          <Image
            style={styles.venuePhoto}
            source={{uri: this.state.current_photo_url}}
          />

          <View style={styles.venueInfo}>
            <Text style={styles.venueName}>
              {this.state.name}
            </Text>
            <View style={styles.venueInfoBox}>
              <Text style={styles.venueInfoLabel}>
                ADDRESS
              </Text>
              <Text style={styles.venueInfoValue}>
                {this.state.address}
              </Text>
            </View>
            <View style={styles.venueInfoBox}>
              <Text style={styles.venueInfoLabel}>
                PHONE
              </Text>
              <Text style={styles.venueInfoValue}>
                {this.state.phone}
              </Text>
            </View>
            <View>
              <Text style={styles.venueInfoLabel}>
                WEBSITE
              </Text>
              <Text style={styles.venueInfoValue}>
                {this.state.website}
              </Text>
            </View>
          </View>

          <TextInput
            style={styles.description}
            placeholder='Tips and tricks for your guests here.'
            onChangeText={this.changeDescription}
            value={this.state.description}
            multiline={true}
          />

        </View>
      </View>
    );
  }
});
