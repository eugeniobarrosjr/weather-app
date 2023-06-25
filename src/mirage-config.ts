import { createServer, Model } from 'miragejs';
import { City } from './app/interfaces/city';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      city: Model.extend<Partial<City>>({}),
    },

    routes() {
      this.namespace = 'api';

      this.get('city');
      this.post('city');
    
      this.passthrough('http://api.weatherapi.com/v1/**');
      this.pretender.get('svg/*', this.pretender.passthrough);
    },
    seeds(server) {
      server.db.loadData({
        cities: ['Sorocaba', 'Curitiba', 'Barueri', 'Amesterdã'].map((city, index) => ({
          id: index + 1,
          name: city,
        })),
      });
    },
  });
}
