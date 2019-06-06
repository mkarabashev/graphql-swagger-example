import { GraphQLSchema } from 'graphql'
import * as graphQLSchema from 'swagger-to-graphql'

import { ServiceNotFoundError } from './errors/ServiceNotFoundError'
import { MicroserviceType, Microservice } from './microserviceRecord'
import { mergeSchemas } from 'graphql-tools'
import { resolve } from 'url'

const schemaToHandlerMap: Record<MicroserviceType, (url: string) => Promise<GraphQLSchema>> = {
    swagger: getSchemaForSwaggerService,
    graphql: getRemoteGraphqlSchema,
}

export async function getSchemaForSwaggerService(url: string): Promise<GraphQLSchema> {
    try {
        return await graphQLSchema(resolve(url, 'swagger.json'), url)
    } catch (e) {
        throw new ServiceNotFoundError(`Swagger not found at ${url}`)
    }
}

export async function getRemoteGraphqlSchema(url: string): Promise<GraphQLSchema> {
    // TODO: implement
    return 
}

export async function mergeGatewaySchemas(microservices: Microservice[]): Promise<GraphQLSchema> {
    // Add here any additional links btw schemas, resolvers, etc

    const schemas = await Promise.all(microservices.map(microservice => {
        const handler = schemaToHandlerMap[microservice.type]
        return handler(microservice.url)
    }))

    return mergeSchemas({ schemas })
}
