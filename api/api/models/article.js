var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var ArticlesSchema = new Schema({
  writeDate: {
    type: Date,
    default: Date.now
  },
  title: String,
  body: String,
  images: [{
    url: String
  }],
  videos: [{
    url: String
  }],
  tags: [{
    name: String
  }],
  comments: [{
    date: {
      type: Date,
      default: Date.now
    },
    name: String,
    text: String
  }],
  likes: Number,
  relatedPosts: [{
    id: String
  }]
})

const ArticleModel = mongoose.model('Article', ArticlesSchema)

module.exports.Article = ArticleModel


