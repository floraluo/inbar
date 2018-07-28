// import $ from 'jquery'

function setToken(options, callback) {
  // callback();
  // {"access_token":"c9fcdb7c-f2de-4ffb-84ed-bd02d14ad560","token_type":"Bearer","refresh_token":"65869346-db92-4356-a30e-d0f96f02759f","expires_in":38269,"scope":"basic"}
  // oauth2 = $.extend(oauth2, options);
  // oauth2['expires_at'] = new Date().getTime();
  return new Promise(resolve => {
    let tokenObj = options;
    tokenObj['expires_at'] = new Date().getTime();
    localStorage.setItem('token', JSON.stringify(tokenObj));
    resolve();
  })
}
function getToken() {
  return JSON.parse(localStorage.getItem('token'))
}
export { setToken }
export default getToken()
