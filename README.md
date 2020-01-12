# Middy Maintance Mode

## Usage

```
const maintenanceMode = require('middy-maintenance-mode')
middy(handler).use(maintenanceMode({
	envVariable: 'MAINTENANCE_MODE',
	envVariableValue: 'on',
	isEnabled: () => {
		const isActive = true
		return isActive
	},
	message: 'service in maintainance mode'
}))
```

## Options

```
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
```