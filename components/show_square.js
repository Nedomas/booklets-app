'use strict';

var React = require('react-native');
var _ = require('lodash');
var Subscribable = require('Subscribable');

var Url = require('./url');
var Color = require('./color');
var SaveButton = require('./save_button');
var VenueDetail = require('./venue_detail');
var TextDetail = require('./text_detail');
var CoverDetail = require('./cover_detail');

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
    paddingBottom: 220,
  },
  progress: {
    paddingBottom: 16,
    fontSize: 11,
    textAlign: 'center',
  },
});

module.exports = React.createClass({
  mixins: [Subscribable.Mixin],
  getInitialState() {
    return {
      editing: false,
      name: this.props.square.name,
      address: this.props.square.address,
      description: this.props.square.description,
      phone: this.props.square.phone,
      website: this.props.square.website,
      photo_url: this.props.square.photo_url,
    };
  },
  componentDidMount() {
    this.addListenerOn(this.props.events, 'rightButtonPress', (e) => this.startEditing());
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
      venue_id: this.props.square.venue_id,
      description: this.state.description,
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      website: this.state.website,
      photo_url: this.state.photo_url,
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
    return fetch(Url.updateSquare(this.props.square.id), opts);
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
  detail() {
    let Component = VenueDetail;

    if (this.props.square.category == 'text') {
      Component = TextDetail;
    } else if (this.props.square.category == 'cover') {
      Component = CoverDetail;
    }

    return <Component {...this.state} onChange={this.change} />
  },
  render: function() {
    return (
      <ScrollView
        style={styles.container}
        ref='scrollView'
        keyboardDismissMode='on-drag'
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps={false}>

        {this.detail()}

        <SaveButton text='Save' onPress={this.save}/>
      </ScrollView>
    );
  }
});
