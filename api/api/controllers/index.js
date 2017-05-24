/* eslint-disable semi */
'use strict'

/**
 * wrap all controllers (redefine the 'next'. If next has argument, throw error (redis and res.json.end).
 * @param {function} handler - The function for controller.
 * @returns {Function} - the wrap function.
 */
function wrapHandler(handler) {
  return  (req, res, next) => {
    try {
      handler(req, res, (err) => {
        if (err) {
          console.error(err.stack)
          res.status(503).json({
            code: 'controller_error',
            message: typeof(err) === 'string' ? err : err.message
          }).end()
        }
        else {
          next()
        }
      })
    } catch (e) {
      res.status(503).json({
        code: 'controller_error',
        message: typeof(e) === 'string' ? e : e.message
      }).end()
    }
  }
}


/**
 * each the controllers function and call to wrap function.
 * @param {object} controllers - The controllers list (object)
 * @returns {*}
 */
function wrapControllers(controllers) {
  for (var k in controllers) {
    controllers[k] = wrapHandler(controllers[k])
  }

  return controllers
}

/**
 * Create and return the controllers Object for swagger & routers.
 * @param {object} main - The main object create by Application instance (app.js)
 * @returns {object} - Controller object
 */
function makeControllers(main){
  let controllers = {
    Users: require('./users.js')(main),
    Auth: require('./auth.js')(main),
    Articles: require('./articles.js')(main)
  }

  return wrapControllers({
    'users.add_postuser': controllers.Users.add,
    'users.find_postauth': controllers.Auth.login,
    'articles.add_postarticle': controllers.Articles.add,
    'articles.list_getarticles': controllers.Articles.list,
    'articles.search_getarticle': controllers.Articles.search,
    'articles.update_putarticle': controllers.Articles.update,
    'articles.remove_delarticle': controllers.Articles.remove

  })
}

module.exports = makeControllers

