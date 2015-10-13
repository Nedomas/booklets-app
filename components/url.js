module.exports = class Url {
  static serverUrl() {
    // return 'https://booklets.herokuapp.com';
    return 'http://localhost:3000';
    // return 'http://192.168.1.3:3000';
  }

  static allSquares(booklet_id) {
    return `${this.serverUrl()}/squares/${booklet_id}/all`;
  }

  static addSquare(booklet_id) {
    return `${this.serverUrl()}/squares/${booklet_id}/add`;
  }

  static venuesSearch() {
    return `${this.serverUrl()}/venues/search`;
  }

  static findSquare(square_id) {
    return `${this.serverUrl()}/squares/find/${square_id}`;
  }

  static newSquare(booklet_id, venue_id) {
return `${this.serverUrl()}/squares/${booklet_id}/new/${venue_id}`;
  }

  static print(booklet_id) {
    return `${this.serverUrl()}/booklets/${booklet_id}/print`;
  }
}
