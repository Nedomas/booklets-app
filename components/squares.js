var React = require('react-native');
var _ = require('lodash');

var SearchStep = require('./search_step');
var Color = require('./color');
var Square = require('./square');
var ProgressBar = require('./progress_bar');

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
        <ProgressBar squares={this.props.squares} />
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
        </View>
      </View>
    );
  }
});
