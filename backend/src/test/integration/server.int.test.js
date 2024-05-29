const request = require('supertest');
const { createServer } = require('http');
const app = require('../../app'); // Asegúrate de que la ruta sea correcta
const port = 8081;

describe('Test for hello endpoint', () => {
let server;

beforeAll(() => {
  server = createServer(app);
  server.listen(port,() => {
    // eslint-disable-next-line no-console
    console.log('Esta funcionando en ' + port);
  });
});

afterAll((done) => {
  server.close(done);
});

describe('GET /ping', () => {
  it('should return pong', async () => {
    const res = await request(server).get('/ping');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('pong');
  });
});

describe('Server Listening', () => {
  it('should be listening on the given port', (done) => {
    request(server)
      .get('/ping')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toBe(200);
        done();
      });
  });
});
});
