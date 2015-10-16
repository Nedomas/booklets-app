var React = require('react-native');
var _ = require('lodash');

var Color = require('./color');

var {
  StyleSheet,
  Text,
  View,
} = React;

var ProgressBar = React.createClass({
  complete() {
    const total = this.props.squares.length;

    const squares_count = _.countBy(this.props.squares, { empty: false });
    const filled = squares_count.true || 0;

    return (filled + 1) / (total + 1) * 100;
  },
  incomplete() {
    return Math.abs(this.complete() - 100);
  },
  render: function () {
    return (
      <View style={[styles.container]}>
        <View style={[styles.complete, {flex: this.complete()}]}></View>
        <View style={[styles.incomplete, {flex: this.incomplete()}]}></View>
      </View>
    );

  }
});

var radius = 4;
var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 10,
    borderRadius: radius,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },

  complete: {
    backgroundColor: Color.red,
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
  },

  incomplete: {
    backgroundColor: Color.white,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
  }
});

module.exports = ProgressBar;
