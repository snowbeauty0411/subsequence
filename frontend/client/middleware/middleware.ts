import type { IncomingMessage, ServerResponse } from 'http';

const isAuthenticated = true;

export default (req: IncomingMessage, res: ServerResponse, next) => {
  if (isAuthenticated && req.url === '/login') {
    res.writeHead(301, { Location: '/' });
    res.end();
  } else if (isAuthenticated || req.url === '/login') {
    next();
  } else {
    res.writeHead(301, { Location: '/login' });
    res.end();
  }
};

