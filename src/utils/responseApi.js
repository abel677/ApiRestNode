class ClientError extends Error {
    constructor(message, status = 400){
        super(message)
        this.statusCode = status
    }
}

const ClientResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
        error: false,
        data
    })
}

export { ClientError, ClientResponse } 