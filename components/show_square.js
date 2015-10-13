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
    this.load();

    return {
      photo_url: '',
      description: '',
    };
  },
  componentDidMount() {
    this.addListenerOn(this.props.events, 'rightButtonPress', this.save);
  },
  changeDescription(description) {
    this.setState({ description });
  },
  saveUrl() {
    var booklet_id = 1;

    if (this.props.square_id) {
      return Url.updateSquare(booklet_id, this.props.square_id);
    } else {
      return Url.createSquare(booklet_id, this.props.venue_id);
    }
  },
  save() {
    this.execSave().then((resp) => {
      this.props.navigator.popToTop();
    });
  },
  saveData() {
    return {
      venue_id: this.props.venue_id,
      order: this.props.step,
      description: this.state.description,
    };
  },
  execSave() {
    var opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.saveData())
    }

    return fetch(this.saveUrl(), opts);
  },
  dataUrl() {
    if (this.props.square_id) {
      return Url.findSquare(this.props.square_id);
    } else {
      var booklet_id = 1;
      return Url.newSquare(booklet_id, this.props.venue_id);
    }
  },
  load() {
    var opts = {
      method: 'GET'
    }

    fetch(this.dataUrl(), opts).then((resp) => {
      var square = JSON.parse(resp._bodyText).square

      this.setState({
        name: square.name,
        address: square.address,
        phone: square.phone,
        photo_url: square.photo_url,
        photo_urls: square.photo_urls,
        website: square.website,
        description: square.description,
      });
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.venueCard}>
          <Image
            style={styles.venuePhoto}
            source={{uri: this.state.photo_url}}
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
