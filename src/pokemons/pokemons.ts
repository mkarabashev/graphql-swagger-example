import { ServerRoute } from '@hapi/hapi'
import * as Joi from '@hapi/joi'

export const pokemons: ServerRoute = {
    method: 'GET',
    path: '/pokemon/{id}',
    options: {
        handler: req => ({ 
            id: req.params.id, 
            name: 'pickachu' 
        }),
        description: 'Get a pokemon',
        tags: ['api'],
        validate: {
            params: {
                id: Joi
                    .number()
                    .required()
                    .description('The pokemon ID')
            }
        },
        response: {
            status: {
                200: Joi.object({
                    id: Joi.number().required(),
                    name: Joi.string().required(),
                }).label('Pokemon')
            }
        }
    }
}