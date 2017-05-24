'use strict'

let ArticlesModel = require('../api/models/article').Article

function Articles(main) {
  this.db = main.db
}

Articles.prototype.add = function(obj) {
  let addArticle= new ArticlesMode(obj)
  let promise = addArticle.save()
    
  return promise
}

Articles.prototype.list = function(obj) {
  let query = ArticlesModel.find({}, {_id: 0, __v: 0})
  
  return query
}

Articles.prototype.search = function(id) {
  let query = ArticlesModel.findOne({ _id: id })
  return query
}

Articles.prototype.update = function(id, article) {
  let promise = ArticlesModel.update({_id: id}, article)
  return promise
}

Articles.prototype.delete = function(id) {
  let promise = ArticlesModel.remove({_id: id})
  return promise
  
}

module.exports = Articles

