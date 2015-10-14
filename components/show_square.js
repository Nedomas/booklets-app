'use strict';

var React = require('react-native');
var _ = require('lodash');
var Subscribable = require('Subscribable');

var Url = require('./url');
var Color = require('./color');
var SquareInfoBox = require('./square_info_box');
var SquareNameBox = require('./square_name_box');

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
    paddingBottom: 200,
  },
  venueInfo: {
    padding: 20,
    flex: 1,
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
      editing: false,
    };
  },
  componentDidMount() {
    this.addListenerOn(this.props.events, 'rightButtonPress', this.save);
  },
  changeDescription(description) {
    this.setState({ description });
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
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      website: this.state.website,
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

    var booklet_id = 1;
    return fetch(Url.updateSquare(this.props.square_id), opts);
  },
  load() {
    var opts = {
      method: 'GET'
    }

    fetch(Url.findSquare(this.props.square_id, this.props.venue_id), opts).then((resp) => {
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
  change: function(type) {
    return (value) => {
      var new_state = this.state;
      new_state[type] = value;
      this.setState(new_state);
    };
  },
  startEditing: function() {
    this.setState({ editing: true });
  },
  image() {
    if (!this.state.photo_url) return false;

    return (
      <Image
        style={styles.venuePhoto}
        source={{uri: this.state.photo_url}}
      />
    );
  },
  handleFocus(type) {
    setTimeout((e) => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      React.findNodeHandle(this.refs[type]),
        110, //additionalOffset
        true
      );
    }, 50);
  },
  render: function() {
    return (
      <ScrollView style={styles.container} ref='scrollView' keyboardDismissMode='on-drag' keyboardShouldPersistTaps={false}>
        <View style={styles.venueCard}>
          {this.image()}

          <View style={styles.venueInfo}>
            <SquareNameBox
              value={this.state.name}
              onChange={this.change('name')}
              editing={this.state.editing}
            />

            <TouchableHighlight style={styles.edit} onPress={(e) => this.startEditing()}>
              <Text style={styles.venueName}>
                Edit
              </Text>
            </TouchableHighlight>
            <SquareInfoBox
              label='ADDRESS'
              value={this.state.address}
              onChange={this.change('address')}
              editing={this.state.editing}
            />
            <SquareInfoBox
              label='PHONE'
              value={this.state.phone}
              onChange={this.change('phone')}
              editing={this.state.editing}
            />
            <SquareInfoBox
              label='WEBSITE'
              value={this.state.website}
              onChange={this.change('website')}
              editing={this.state.editing}
            />
          </View>

          <TextInput
            style={styles.description}
            placeholder='Tips and tricks for your guests here.'
            onChangeText={this.changeDescription}
            value={this.state.description}
            ref='description'
            onFocus={this.handleFocus('description')}
          />

        </View>
      </ScrollView>
    );
  }
});
