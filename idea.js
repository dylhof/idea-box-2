class Idea{
  constructor(title, body, id, quality) {
    this.body = body;
    this.id = id;
    this.title = title;
    this.quality = quality || 'swill';
  }
}