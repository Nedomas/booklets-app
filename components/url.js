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

  static createBooklet() {
    return `${this.serverUrl()}/booklets/create`;
  }

  static allSquares() {
    return `${this.serverUrl()}/squares/${this.booklet_id}/all`;
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

  static print() {
    return `${this.serverUrl()}/booklets/${this.booklet_id}/print`;
  }
}
