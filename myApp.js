const express = require('express');
const helmet = require('helmet');
const app = express();

// app.use(helmet.hidePoweredBy()); // Hides 'X-Powered-By' header to reduce exposure of Express, enhancing security
// app.use(helmet.frameguard({action:'deny'}));  // Prevents the site from being embedded in iframes, protecting against clickjacking
// app.use(helmet.xssFilter());  // Enables X-XSS-Protection header in older browsers to reduce reflected XSS attacks
// app.use(helmet.noSniff());  // Sets X-Content-Type-Options to 'nosniff' to prevent MIME type sniffing and code execution
// app.use(helmet.ieNoOpen()); // Prevents IE from executing downloads in your site's context to reduce XSS risk
// const timeInSeconds = 90*24*60*60;
// app.use(helmet.hsts({maxAge: timeInSeconds, force: true})); // Enforces HTTPS by setting HSTS header for 90 days to prevent protocol downgrade attacks
// app.use(helmet.dnsPrefetchControl()); // Controls DNS prefetching to reduce privacy leaks and improve performance predictability
// app.use(helmet.noCache());  // Disables client-side caching to prevent sensitive data from being stored in the browser
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//   defaultSrc: ["'self'"],
//   scriptSrc: ["'self'", 'trusted-cdn.com']
//   }
// }));  // Restricts content sources to protect against XSS by allowing only self-hosted and trusted CDN scripts

app.use(helmet({
  contentSecurityPolicy: {   
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com']
    }
  },
  noCache: true    
}));


































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
