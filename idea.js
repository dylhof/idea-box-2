class Idea{
  constructor(title, body, id, quality) {
    this.body = body;
    this.id = id;
    this.title = title;
    this.quality = quality || 0;
  }

  updateSelf(name, text) {
    this[name] = text
  }

  updateQuality(vote, length) {
    if(vote ==='up' && this.quality < length-1) {
      console.log('hey')
      this.quality++
    } else if ( vote === 'down' && this.quality > 0) {
      this.quality--
    }
  }
}