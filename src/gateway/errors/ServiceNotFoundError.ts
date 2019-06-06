export class ServiceNotFoundError extends Error {
    constructor(message: string) {
        super(message)
    }
}