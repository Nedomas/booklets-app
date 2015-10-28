'use strict';

var React = require('react-native');
var EventEmitter = require('EventEmitter');
var Subscribable = require('Subscribable');
var SideMenu = require('react-native-side-menu');

var Url = require('./url');
var Cards = require('./cards');
var Sidebar = require('./sidebar');

var {
  NavigatorIOS,
  StyleSheet,
  ScrollView,
  Text,
  AsyncStorage,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const USER_STORAGE_KEY = '@booklets:user_id';

module.exports = React.createClass({
  getInitialState() {
    return {
      current_booklet_id: null,
    };
  },
  componentWillMount() {
    this.event_emitter = new EventEmitter();
  },
  handleRightButtonPress(data) {
    this.event_emitter.emit('rightButtonPress', {});
  },
  handleLeftButtonPress(data) {
    this.refs.sidebar.openMenu()
  },
  onNewMap() {
    this.createBooklet();
    this.refs.sidebar.openMenu()
  },
  onChangeMap(booklet_id) {
    console.log('ch');
  },
  menu() {
    return (
      <Sidebar
        touchToClose={true}
        onNew={this.onNewMap}
        onChange={this.onChangeMap}
        booklets={this.state.booklets}
      />
    );
  },
  componentDidMount() {
    this.getBooklets();
  },
  async ensureUser() {
    var id = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (id) return Url.user_id = id;

    Url.user_id = await this.createUser();
  },
  async createBooklet() {
    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    let a = await fetch(Url.createBooklet(), opts);
    return 'Hello';
  },
  async createUser() {
    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const resp = await fetch(Url.createUser(), opts);
    var user_id = JSON.parse(resp._bodyText).user_id;

    await this.saveUserId(user_id);
    return user_id;
  },
  async saveUserId(user_id) {
    return AsyncStorage.setItem(USER_STORAGE_KEY, String(user_id));
  },
  async getBooklets() {
    await this.ensureUser();

    var opts = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }

    fetch(Url.allBooklets(), opts).then((resp) => {
      var booklets = JSON.parse(resp._bodyText).booklets;

      this.setState({
        loading: false,
        booklets: booklets,
        current_booklet_id: this.state.current_booklet_id || booklets[0].id,
      });
    });
  },
  render: function() {
    if (!this.state.current_booklet_id) return <View/>

    return (
      <SideMenu ref='sidebar' menu={this.menu()}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Your Guide',
            leftButtonTitle: 'Maps',
            rightButtonTitle: 'Clear',
            component: Cards,
            onLeftButtonPress: this.handleLeftButtonPress,
            onRightButtonPress: this.handleRightButtonPress,
            passProps: {
              events: this.event_emitter,
              booklet_id: this.state.current_booklet_id,
            }
          }}
        />
      </SideMenu>
    );
  }
});
