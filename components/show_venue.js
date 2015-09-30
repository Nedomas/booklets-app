'use strict';

var React = require('react-native');
var _ = require('lodash');

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
    margin: 20,
    marginTop: 80,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  venueList: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  venueItem: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  venueLogo: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

module.exports = React.createClass({
  getInitialState() {
    this.getVenue();

    return {
      current_photo_url: ''
    };
  },
  save() {
    var data = { venue_id: this.props.id, order: this.props.step }

    var opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }

    var SERVER_URL = 'http://localhost:3000'
    var booklet_id = 1

    fetch(SERVER_URL + '/squares/' + booklet_id + '/add', opts).then((resp) => {
      this.props.navigator.popToTop();
    });
  },
  getVenue() {
    var opts = {
      method: 'GET'
    }

    var SERVER_URL = 'http://localhost:3000'
    fetch(SERVER_URL + '/venues/' + this.props.id, opts).then((resp) => {
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
        <Text style={styles.label}>
          Step {this.props.step} of 16
        </Text>
        <Image
          style={styles.venueLogo}
          source={{uri: this.state.current_photo_url}}
        />
        <Text style={styles.label}>
          {this.state.name}
        </Text>
        <View>
          <Text style={styles.label}>
            Address
          </Text>
          <Text style={styles.label}>
            {this.state.address}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>
            Phone
          </Text>
          <Text style={styles.label}>
            {this.state.phone}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>
            Website
          </Text>
          <Text style={styles.label}>
            {this.state.website}
          </Text>
        </View>
        <TouchableHighlight onPress={this.save}>
          <Text>
            Continue
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});
