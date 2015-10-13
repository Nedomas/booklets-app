var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');
var Color = require('./color');

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
    margin: 5,
    width: 70,
    height: 90,
    marginTop: 10,
    backgroundColor: Color.white,
    borderColor: Color.light_blue,
    borderWidth: 1,
  },
  squarePhoto: {
    height: 30,
  },
  squareName: {
    paddingTop: 10,
    fontSize: 10,
    color: Color.black,
  },
});

module.exports = React.createClass({
  deletePrompt: function() {
    if (!this.props.editing) return;

    return <Text>Editing</Text>;
  },
  render: function() {
    console.log(this.props);
    return (
      <TouchableHighlight
        style={styles.square}
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
       >
        <View>
          <Image
            style={styles.squarePhoto}
            source={{uri: this.props.photo_url}}
          />

          <Text style={styles.squareName}>
            {this.props.name}
          </Text>

          {this.deletePrompt()}
        </View>
      </TouchableHighlight>
    );
  }
});
