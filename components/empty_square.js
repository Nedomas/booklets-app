var React = require('react-native');
var _ = require('lodash');
var Icon = require('react-native-vector-icons/MaterialIcons');

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

const ICON_CATEGORY_MAPPINGS = {
  cafe: 'local-cafe',
  food: '',
  nightlife: '',
  outdoors: '',
  shop: '',
  camping: '',
  accomodation: '',
  sports: '',
  text: '',
};

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        style={styles.square}
        onPress={(e) => this.props.addVenue(this.props.id)}
      >
        <View>
          <Icon name={ICON_CATEGORY_MAPPINGS[this.props.category]} size={30} color="#900" />
        </View>
      </TouchableHighlight>
    );
  }
});
