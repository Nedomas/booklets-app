var React = require('react-native');
var _ = require('lodash');
var Dimensions = require('Dimensions');

var SearchStep = require('./search_step');
var Color = require('./color');
var DestroyButton = require('./destroy_button');
var VenueItem = require('./venue_item');
var CoverItem = require('./cover_item');
var TextItem = require('./text_item');
var NumbersItem = require('./numbers_item');

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var part = (Dimensions.get('window').width - 50) / 3;

var styles = StyleSheet.create({
  square: {
    padding: 5,
    paddingBottom: 0,
    marginRight: 5,
    marginLeft: 5,
    width: part,
    height: part,
    backgroundColor: Color.white,
    borderColor: Color.light_blue,
    borderWidth: 1,
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
  item() {
    if (this.props.category == 'cover') {
      return <CoverItem {...this.props}/>
    } else if (this.props.category == 'text') {
      return <TextItem {...this.props}/>
    } else if (this.props.category == 'numbers') {
      return <NumbersItem {...this.props}/>
    } else {
      return <VenueItem {...this.props}/>
    }
  },
  onPress() {
    if (this.props.category == 'numbers') return;

    this.props.onPress(this.props);
  },
  render: function() {
    return (
      <View>
        <TouchableHighlight
          style={styles.square}
          onPress={(e) => this.onPress()}
          onLongPress={this.props.onLongPress}
          onPressIn={this.pressIn}
          onPressOut={this.pressOut}
         >

         <View>
           {this.item()}
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
