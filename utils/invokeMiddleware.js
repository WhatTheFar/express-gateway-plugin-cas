const Q = require('q')
const _ = require('lodash')

function invokeMiddleware(middlewares, request, response) {
	var promise = _
		// Express automatically collapses all of the middleware into a flat array. As
		// such, we want to flatten the given collection before we reduce it.
		.flattenDeep([middlewares])
		.reduce(
			(chain, handler) => {
				// If the handler accepts four explicit arguments, it is an error handler;
				// append it to the promise chain as a catch().
				if (handler.length === 4) {
					var tail = chain.catch(error => {
						return invokeHandler(handler, [request, response, error])
					})

					// Otherwise, if the handler accepts three explicit arguments, it is a
					// normal handler; append it to the promise chain as a then().
				} else if (handler.length === 3) {
					var tail = chain.then(() => {
						return invokeHandler(handler, [request, response])
					})

					// If the handler accepts an unexpected number of arguments, just bypass
					// it, passing the existing chain onto the next handler.
				} else {
					var tail = chain
				}

				return tail
			},
			Q.when() // Initial promise chain.
		)

	return promise

	// I wrap the given handler invocation in a promise.
	function invokeHandler(handler, handlerArgs) {
		var deferred = Q.defer()

		// NOTE: We don't need to worry about synchronous errors during invocation
		// because the handler is already being invoked inside of the Promise handler
		// in the above reduction.
		handler.call(null, ...handlerArgs, deferred.makeNodeResolver())

		return deferred.promise
	}
}

module.exports = invokeMiddleware