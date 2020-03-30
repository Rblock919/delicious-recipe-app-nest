import * as helmet from 'helmet';

export const AppHeaderSecurity = app => {
  console.log('in header security');
  const remote = process.env.REMOTE || false;
  if (remote) {
    app.use(helmet());
  } else {
    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
  }

  // always keep
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          'http://code.jquery.com',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        imgSrc: [
          "'self'",
          'data:',
          'https://img.hellofresh.com',
          'https://media.blueapron.com',
          'https://homechef.imgix.net',
        ],
        fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
        connectSrc: [
          // TODO: update these now that it will only be this server and the client
          // TODO: add in resources for gql playground
          "'self'",
          'https://delicious-recipe-app.herokuapp.com/api/',
          'http://localhost:3000/',
        ],
        // reportUri: '/cspviolation'
      },
    })
  );
};
