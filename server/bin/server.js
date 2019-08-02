require('console-stamp')(console, '[HH:MM:ss.l]');

const app = require('../app');

app.set('port', (process.env.PORT || 3005));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port',
    app.get('port'));
});