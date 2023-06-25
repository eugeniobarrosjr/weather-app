// @ts-nocheck
import { createServer, Model } from 'miragejs';
import { Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models: {
      cities: Model,
    },

    routes() {
      this.namespace = 'api';

      this.get('cities', () => {
        return this.schema.all('cities');
      });

      this.post('cities', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const name = data.name;

        const city = schema.cities.findBy({ name });

        if (city) {
          return new Response(
            400,
            { some: '' },
            { error: 'Cidade já cadastrada' }
          );
        }

        return this.schema.create('cities', data);
      });

      this.del('cities/:name', (schema, request): any => {
        const name = request.params['name'];
        const city = schema.cities.findBy({ name });

        if (city) {
          city.destroy();

          return { ok: true };
        }
      });

      this.passthrough('http://api.weatherapi.com/v1/**');
      this.pretender.get('svg/*', this.pretender.passthrough);
    },
    seeds(server) {
      server.db.loadData({
        cities: ['Sorocaba', 'Curitiba', 'Barueri', 'Amesterdã'].map(
          (city, index) => ({
            id: index + 1,
            name: city,
          })
        ),
      });
    },
  });
}
