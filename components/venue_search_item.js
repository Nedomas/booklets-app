'use strict';

var React = require('react-native');
var _ = require('lodash');
var EventEmitter = require('EventEmitter');

var Url = require('./url');
var Color = require('./color');
var ProgressBar = require('./progress_bar');

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
  render: function() {
    return (
      <TouchableHighlight key={this.props.id} onPress={(e) => { this.props.onPress(this.props.venue_id, this.props.name) }}>
        <View style={styles.venueItem}>
          <Image
            style={styles.venuePhoto}
            source={{uri: this.props.photo_url}}
          >
            <View style={styles.insideVenuePhoto}>
              <Text style={styles.venueName}>
                {this.props.name}
              </Text>
              <Text style={styles.venueAddress}>
                {this.props.address}
              </Text>
            </View>
          </Image>
        </View>
      </TouchableHighlight>
    );
  }
});
