require('./dotenv');

const { server } = require('./server');

server.listen()
  .then(() => console.log('Server running at port http://localhost:4000'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
