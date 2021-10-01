let APIURL = '';

switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break;
    case 'sugar-sidekick-client.herokuapp.com':
        APIURL = 'https://sugar-sidekick.herokuapp.com'
}

export default APIURL;