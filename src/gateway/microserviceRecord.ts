export type MicroserviceType = 'graphql' | 'swagger'

export interface Microservice {
    name: string
    url: string
    type: MicroserviceType
}

export const microservices: Microservice[] = [
    {
        name: 'pokemons',
        url: 'http://localhost:3000',
        type: 'swagger',
    }
]