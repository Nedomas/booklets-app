var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');
var Color = require('./color');
var Square = require('./square');
var SaveButton = require('./save_button');

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
    justifyContent: 'flex-start',
  },
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
  getInitialState: function() {
    return {
      editing_id: 0,
    };
  },
  handleLongPress: function(square) {
    this.setState({ editing_id: square.id });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.squaresContainer}>
          {_.map(this.props.squares, (square) => {
            return (
              <Square
                key={square.id}
                onPress={this.props.onPress}
                onLongPress={(e) => this.handleLongPress(square)}
                editing={square.id == this.state.editing_id}
                onDestroy={this.props.destroySquare}
                addVenue={this.props.addVenue}
                {...square}
              />
            );
          })}

          <SaveButton onPress={this.props.print} text='Print my map'/>
        </View>
      </View>
    );
  }
});
