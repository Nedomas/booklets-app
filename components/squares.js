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
  squaresContainer: {
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  square: {
    padding: 5,
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
  squareTitle: {
    paddingTop: 10,
    fontSize: 10,
    color: Color.black,
  },
  addVenuePlus: {
    textAlign: 'center',
    height: 30,
    fontSize: 25,
    color: Color.dark_gray,
  },
  addVenueText: {
    paddingTop: 5,
    fontSize: 10,
    textAlign: 'center',
    color: Color.black,
  },
});

module.exports = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.squaresContainer}>
          {_.map(this.props.squares, function(square) {
            return (
              <View style={styles.square} key={square.id}>
                <Image
                  style={styles.squarePhoto}
                  source={{uri: square.photo_url}}
                />

                <Text style={styles.squareTitle}>
                  {square.title}
                </Text>
              </View>
            );
          })}
          <TouchableHighlight style={styles.square} onPress={this.props.addVenue}>
            <View>
              <Text style={styles.addVenuePlus}>
                +
              </Text>
              <Text style={styles.addVenueText}>
                ADD YOUR FAVORITE PLACE
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});
