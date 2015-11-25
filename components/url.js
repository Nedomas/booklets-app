var React = require('react-native');

var {
  AsyncStorage,
} = React;

module.exports = class Url {
  static serverUrl() {
    // return 'https://booklets.herokuapp.com';
    return 'http://localhost:3000';
    // return 'http://7da9610b.ngrok.com';
  }

  static createUser() {
    console.log('cr');
    return `${this.serverUrl()}/users/create`;
  }

  static allBooklets() {
    return `${this.serverUrl()}/booklets/${this.user_id}/all`;
  }

  static createBooklet() {
    return `${this.serverUrl()}/booklets/${this.user_id}/create`;
  }

  static allSquares(booklet_id) {
    return `${this.serverUrl()}/squares/${booklet_id}/all`;
  }

  static venuesSearch() {
    return `${this.serverUrl()}/venues/search`;
  }

  static findSquare(square_id, venue_id) {
    return `${this.serverUrl()}/squares/find/${square_id}/${venue_id}`;
  }

  static updateSquare(square_id) {
    return `${this.serverUrl()}/squares/update/${square_id}`;
  }

  static destroySquare(square_id) {
    return `${this.serverUrl()}/squares/destroy/${square_id}`;
  }

  static clearAll(booklet_id) {
    return `${this.serverUrl()}/squares/${booklet_id}/clear_all`;
  }

  static print(booklet_id) {
    return `${this.serverUrl()}/booklets/${booklet_id}/print`;
  }
}
