import * as HapiSwagger from 'hapi-swagger'

import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'

import { pokemons } from './pokemons'

const swaggerPlugin = (HapiSwagger as any).plugin
console.log(swaggerPlugin)

;(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '1',
        },
    }

    await server.register([
        Inert,
        Vision,
        HapiSwagger
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }

    server.route(pokemons);
})();