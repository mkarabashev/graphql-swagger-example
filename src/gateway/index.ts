import { ApolloServer } from 'apollo-server-koa'

import * as Koa from 'koa'

import { microservices } from './microserviceRecord'
import { mergeGatewaySchemas } from './schema'

const PORT = 4003

async function addGraphQLServer(app: Koa): Promise<void> {
    const schema = await mergeGatewaySchemas(microservices)
    const server = new ApolloServer({
        schema,
    })

    server.applyMiddleware({ app })
}

const launchServer = async (): Promise<void> => {
    const app = new Koa()

    await addGraphQLServer(app)

    await app.listen(PORT, () => console.info(`server listening on port ${PORT}`))
}

launchServer()
    .catch(err => {
        console.error('Error: \n', err)
        process.exit(1)
    })