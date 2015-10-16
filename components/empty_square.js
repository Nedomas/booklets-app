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
    height: 30,
  },
  squareName: {
    paddingTop: 10,
    fontSize: 10,
    color: Color.black,
  },
  icon: {
    color: Color.light_blue,
    textAlign: 'center',
    paddingTop: 15,
  },
});

const ICON_CATEGORY_MAPPINGS = {
  cafe: 'local-cafe',
  food: 'local-dining',
  nightlife: 'local-bar',
  outdoors: 'terrain',
  shop: 'local-grocery-store',
  camping: 'terrain',
  accomodation: 'local-hotel',
  sports: 'directions-run',
  text: 'text-format',
};

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        style={styles.square}
        onPress={(e) => this.props.addVenue(this.props.id)}
      >
        <View>
          <Icon style={styles.icon} name={ICON_CATEGORY_MAPPINGS[this.props.category]} size={50} />
        </View>
      </TouchableHighlight>
    );
  }
});
