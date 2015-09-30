module.exports = class Url {
  static serverUrl() {
    // return 'https://booklets.herokuapp.com';
    return 'http://localhost:3000';
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

  static findVenue(venue_id) {
    return `${this.serverUrl()}/venues/${venue_id}`;
  }
}
