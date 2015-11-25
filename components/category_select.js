var React = require('react-native');
var _ = require('lodash');
var Icon = require('react-native-vector-icons/MaterialIcons');

var Color = require('./color');
var Swiper = require('react-native-swiper')

var {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 20,
  },
  option: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: Color.dark_gray,
    fontSize: 35,
  },
  icon: {
    color: Color.dark_gray,
  }
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

const CATEGORIES = [
  'cafe',
  'food',
  'nightlife',
  'outdoors',
  'shop',
  'camping',
  'accomodation',
  'sports',
  'text',
];

module.exports = React.createClass({
  nextButton() {
    return (
      <Text style={styles.button}>›</Text>
    );
  },
  prevButton() {
    return (
      <Text style={styles.button}>‹</Text>
    );
  },
  icon(category) {
    return ICON_CATEGORY_MAPPINGS[category];
  },
  question(category) {
    return `What is your favorite ${category}?`;
  },
  initial() {
    return _.indexOf(CATEGORIES, this.props.category);
  },
  componentDidMount() {
    this.refs.swiper.scrollTo(this.initial());
    this.forceUpdate();
  },
  change(state) {
    this.props.onChange(CATEGORIES[state.index]);
  },
  render() {
    return (
      <View style={styles.wrapper} >
        <Swiper
          showsButtons={false}
          width={350}
          height={80}
          showsPagination={false}
          nextButton={this.nextButton()}
          prevButton={this.prevButton()}
          ref='swiper'
          onMomentumScrollEnd={(e, state) => this.change(state)}
        >
          {_.map(CATEGORIES, (category) => {
            return (
              <View style={styles.option} key={category}>
                <Icon style={styles.icon} name={this.icon(category)} size={30} />
                <Text>{this.question(category)}</Text>
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  }
});
