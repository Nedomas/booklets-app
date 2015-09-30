'use strict';

var React = require('react-native');
var _ = require('lodash');

var Url = require('./url');
var ShowVenue = require('./show_venue');

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
  label: {
    paddingBottom: 20,
    fontSize: 20,
  },
  step: {
    paddingBottom: 20,
    fontSize: 12,
    textAlign: 'center',
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
  openVenue(id, name) {
    this.props.navigator.push({
      title: name,
      component: ShowVenue,
      passProps: {
        id: id,
        step: this.props.step,
      },
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.step}>
          Step {this.props.step} of 16
        </Text>
        <Text style={styles.label}>
          What is your favorite Cafe?
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={this.changeQuery}
          value={this.state.query}
        />
        {this.state.loading ? <Text>Loading...</Text> : <Text></Text> }
        <ScrollView style={styles.venueList}>
          {_.map(this.state.venues, (venue) => {
            return (
              <TouchableHighlight key={venue.id} onPress={(e) => { this.openVenue(venue.id, venue.name) }}>
                <View style={styles.venueItem}>
                  <Image
                    style={styles.venueLogo}
                    source={{uri: venue.photo_urls[0]}}
                  />
                  <Text>{venue.name}</Text>
                  <Text>{venue.address}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }
});
