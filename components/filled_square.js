var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');
var Color = require('./color');
var DestroyButton = require('./destroy_button');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  square: {
    padding: 5,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    width: 90,
    height: 90,
    backgroundColor: Color.white,
    borderColor: Color.light_blue,
    borderWidth: 1,
  },
  squarePhoto: {
    height: 50,
  },
  squareName: {
    paddingTop: 5,
    fontSize: 10,
    color: Color.black,
  },
});

module.exports = React.createClass({
  destroy: function() {
    this.props.onDestroy(this.props.id);
  },
  pressIn: function() {
    console.log('press in');
  },
  pressOut: function() {
    console.log('press out');
  },
  render: function() {
    return (
      <View>
        <TouchableHighlight
          style={styles.square}
          onPress={(e) => this.props.onPress(this.props.id)}
          onLongPress={this.props.onLongPress}
          onPressIn={this.pressIn}
          onPressOut={this.pressOut}
         >
          <View>
            <Image
              style={styles.squarePhoto}
              source={{uri: this.props.photo_url}}
            />

            <Text style={styles.squareName}>
              {this.props.name}
            </Text>
          </View>
        </TouchableHighlight>

        <DestroyButton
          show={this.props.editing}
          onPress={(e) => this.destroy()}
        />
      </View>
    );
  }
});
