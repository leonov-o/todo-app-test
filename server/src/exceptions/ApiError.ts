export class ApiError extends Error {
    status;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    static BadRequest(message: string) {
        return new ApiError(400, message);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Користувач не авторизований')
    }

    static NotFound() {
        return new ApiError(404, 'Not found');
    }

    static ForbiddenError() {
        return new ApiError(403, 'Недостатньо прав');
    }
}
