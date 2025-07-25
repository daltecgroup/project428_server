import colors from 'colors';

const logger = (req, res, next) => {
  const methodColors = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
    PATCH: 'magenta',
  };

  const color = methodColors[req.method] || 'white';

  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[
      color
    ]
  );
  console.log(req.ip);
  next();
};

export default logger;