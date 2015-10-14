'use strict';

var React = require('react-native');
var _ = require('lodash');
var Subscribable = require('Subscribable');

var Url = require('./url');
var Color = require('./color');
var SquareInfoBox = require('./square_info_box');

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
  email: {
    height: 40,
    borderColor: Color.light_blue,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});

module.exports = React.createClass({
  getInitialState() {
    return {
      email: '',
    };
  },
  changeEmail(email) {
    this.setState({ email });
  },
  print() {
    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    var booklet_id = 1;

    console.log('start');
    fetch(Url.print(booklet_id), opts).then((resp) => {
      alert('done');
    });
  },
  render: function() {
    console.log('renderin');
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.email}
          placeholder='Email'
          onChangeText={(e) => this.changeEmail(e)}
          value={this.state.email}
        />
        <TouchableHighlight onPress={this.print} >
          <Text>Send it to me!</Text>
        </TouchableHighlight>
      </View>
    );
  }
});
