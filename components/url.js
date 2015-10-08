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

  static findVenue(venue_id, type) {
    return type == 'local' ? this.findLocalVenue(venue_id) : this.findExternalVenue(venue_id);
  }

  static findLocalVenue(venue_id) {
    return `${this.serverUrl()}/venues/${venue_id}/local`;
  }

  static findExternalVenue(venue_id) {
    return `${this.serverUrl()}/venues/${venue_id}`;
  }
}
