const DEFAULT_VARIABLE = 'MAINTENANCE_MODE'
const DEFAULT_VARIABLE_VALUE = 'on'

const defaults = {
	envVariable: DEFAULT_VARIABLE, // env variable to check for
	envVariableValue: DEFAULT_VARIABLE_VALUE, // value to check for maintainance mode
	stageVariable: DEFAULT_VARIABLE,
	stageVariableValue: DEFAULT_VARIABLE_VALUE,
	isEnabled: undefined,
	statusCode: 503, // service unavailable
	headers: {
		'Retry-After': 60 * 15 // 15 minutes
	},
	message: undefined
}

const isEnabled = (options, event) => {
	if (typeof options.isEnabled === 'function') {
		return options.isEnabled() === true
	}

	if (event && event[stageVariable] === options.stageVariableValue) {
		return true
	}

	return process.env[options.envVariable] === options.envVariableValue
}

const checkForMaintainanceMode = (opts, handler, next) => {
	const options = Object.assign({}, defaults, opts)

	if (isEnabled(options)) {
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