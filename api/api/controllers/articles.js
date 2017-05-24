/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "promise" }]*/
'use strict'
function articles(main){
  return {
    add: (req, res, next) => {
      main.libs.Articles.add(req.body)
      .then( hotel => {
        res.json(article)
      }) 
      .catch( err => {
        next(err)
      })
    },
    list: ( req, res, next) => {
      main.libs.Articles.list(req.body)
      .then( articles => {
        res.json(articles)
      })
      .catch( err => {
        next(err)
      })
    },
    search: (req, res, next) => {
      const id = req.swagger.params.id.value
      
      main.libs.Articles.search(id)
      .then( article => {
        res.json(article)
      })
      .catch( err => {
        next(err)
      })
    },
    update: (req, res, next) => {
      const id = req.swagger.params.id.value
     
      const promise = new Promise ( (resolve) => {
        const authToken = main.libs.Tokens.getToken(req.headers)
        resolve(authToken)
      })
      .then( (token) => {
        return main.libs.Users.find(token)
      })
      .then( () => {
        return main.libs.Articles.update(id, req.body)
      })
      .then( (article) => {
        res.json(article)
      })
      .catch( err => {
        next(err)
      })

    },
    remove: (req, res, next) => {
      const id = req.swagger.params.id.value
      
      const promise = new Promise ( (resolve) => { 
        const authToken = main.libs.Tokens.getToken(req.headers)
        resolve(authToken)
      })
      .then( (token) => {
        return main.libs.Users.find(token)
      })
      .then( () => {
        return main.libs.articles.delete(id)
      })
      .then( () => {
        res.json({msg: 'article deleted'})
      })
      .catch( err => {
        next(err)
      })
    
    }
  }
}

module.exports = articles

