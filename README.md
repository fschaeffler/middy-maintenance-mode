# Middy Maintance Mode

## Usage

```
const maintenanceMode  = require('middy-maintenance-mode')
middy(handler).use(maintenanceMode())
```

## Options

```
envVariable: 'MAINTENANCE_MODE', // env variable to check for
envVariableValue: 'on', // value to check for maintainance mode
inMaintainanceMode: undefined,
statusCode: 503, // service unavailable
headers: {
	'Retry-After': 60 * 15 // 15 minutes
}
```