const defaults = {
	envVariable: 'MAINTENANCE_MODE', // env variable to check for
	envVariableValue: 'on', // value to check for maintainance mode
	inMaintainanceMode: undefined,
	statusCode: 503, // service unavailable
	headers: {
		'Retry-After': 60 * 15 // 15 minutes
	}
}

const inMaintainanceMode = options => {
	if (typeof options.inMaintainanceMode === 'function') {
		return options.inMaintainanceMode()
	}

	return process.env[options.envVariable] === options.envVariableValue
}

const checkForMaintainanceMode = (opts, handler, next) => {
	const options = Object.assign({}, defaults, opts)

	if (inMaintainanceMode(options)) {
		return handler.callback(null, {
			statusCode: options.statusCode,
			headers: options.headers,
			message: options.message
		})
	}

	next(handler.error)
}

module.exports = opts => ({
	before: checkForMaintainanceMode.bind(null, opts),
	onError: checkForMaintainanceMode.bind(null, opts)
})