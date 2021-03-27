import Event from 'events';

export class SocketClient {
  #serverConection = {};
  #serverListener = new Event();

  constructor({ host, port, protocol }) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;
  }

  sendMessage(event, message) {
    this.#serverConection.write(JSON.stringify({ event, message }));
  }

  attachEvents(events) {
    this.#serverConection.on('data', data => {
      try {
        data
          .toString()
          .split('\n')
          .filter(line => !!line)
          .map(JSON.parse)
          .map(({ event, message }) => {
            this.#serverListener.emit(event, message);
          });
      } catch (error) {
        console.log('Invalid: ', data.toString(), error);
      }
    });

    this.#serverConection.on('end', () => console.log('Idisconnected'));
    this.#serverConection.on('error', (error) => console.error('Error: ', error));

    for (const [key, value] of events) {
      this.#serverListener.on(key, value);
    }
  }

  async createConnection() {
    const options = {
      port: this.port,
      host: this.host,
      headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
      }
    }

    const http = await import(this.protocol);
    const req = http.request(options);
    req.end();

    return new Promise(resolve => {
      req.once('upgrade', (res, socket) => resolve(socket));
    });
  }

  async initialize() {
    this.#serverConection = await this.createConnection();
    console.log('I connected to the server!');
  }
}