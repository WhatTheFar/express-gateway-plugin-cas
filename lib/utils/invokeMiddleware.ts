import * as _ from 'lodash';
import * as Q from 'q';
import {
	Request,
	RequestHandler,
	Response
} from '../../node_modules/@types/express-serve-static-core';

function invokeMiddleware(
	middlewares: RequestHandler[],
	request: Request,
	response: Response
) {
	const promise = _
		// Express automatically collapses all of the middleware into a flat array. As
		// such, we want to flatten the given collection before we reduce it.
		.flattenDeep([middlewares])
		.reduce(
			(chain: Q.Promise<any>, handler: RequestHandler) => {
				// If the handler accepts four explicit arguments, it is an error handler;
				// append it to the promise chain as a catch().
				let tail: Q.Promise<any>;
				if (handler.length === 4) {
					tail = chain.catch(error => {
						return invokeHandler(handler, [request, response, error]);
					});

					// Otherwise, if the handler accepts three explicit arguments, it is a
					// normal handler; append it to the promise chain as a then().
				} else if (handler.length === 3) {
					tail = chain.then(() => {
						return invokeHandler(handler, [request, response]);
					});

					// If the handler accepts an unexpected number of arguments, just bypass
					// it, passing the existing chain onto the next handler.
				} else {
					tail = chain;
				}
				return tail;
			},
			Q.when() // Initial promise chain.
		);

	return promise;

	// I wrap the given handler invocation in a promise.
	function invokeHandler(handler: RequestHandler, handlerArgs: any[]) {
		const deferred = Q.defer();

		// NOTE: We don't need to worry about synchronous errors during invocation
		// because the handler is already being invoked inside of the Promise handler
		// in the above reduction.
		handler.call(null, ...handlerArgs, deferred.makeNodeResolver());

		return deferred.promise;
	}
}

export default invokeMiddleware;
