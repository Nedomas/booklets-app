var React = require('react-native');

var {
  AsyncStorage,
} = React;

module.exports = class Url {
  static serverUrl() {
    // return 'https://booklets.herokuapp.com';
    return 'http://localhost:3000';
    // return 'http://192.168.1.3:3000';
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

  static newSquare(booklet_id, venue_id) {
    return `${this.serverUrl()}/squares/${this.booklet_id}/new/${venue_id}`;
  }

  static createSquare(booklet_id, venue_id) {
    return `${this.serverUrl()}/squares/${this.booklet_id}/create/${venue_id}`;
  }

  static updateSquare(booklet_id, square_id) {
    return `${this.serverUrl()}/squares/${this.booklet_id}/update/${square_id}`;
  }

  static destroySquare(square_id) {
    return `${this.serverUrl()}/squares/1/destroy/${square_id}`;
  }

  static print(booklet_id) {
    return `${this.serverUrl()}/booklets/${this.booklet_id}/print`;
  }
}
