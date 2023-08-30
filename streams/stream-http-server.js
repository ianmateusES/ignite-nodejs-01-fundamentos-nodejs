import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    const buf = Buffer.from(String(transformed));

    console.log(transformed);

    callback(null, buf);
  }
}

const server = http.createServer(async (req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res);
});

server.listen(3334);
