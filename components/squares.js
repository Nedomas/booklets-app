var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var dark_gray = '#B4BCCC';
var white = '#fff';
var red = '#FF3266';

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
    backgroundColor: white,
  },
  squarePhoto: {
    height: 30,
  },
  addVenuePlus: {
    textAlign: 'center',
    height: 30,
    fontSize: 25,
    color: dark_gray,
  },
  addVenueText: {
    fontSize: 10,
    textAlign: 'center',
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

                <Text>
                  {square.order}
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
