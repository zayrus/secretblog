var mongoose  = require('mongoose')
var Schema    = mongoose.Schema

var ArticlesSchema = new Schema({
  title: String,
  body: String
})

const ArticleModel = mongoose.model('Article', ArticlesSchema)

module.exports.Article = ArticleModel


