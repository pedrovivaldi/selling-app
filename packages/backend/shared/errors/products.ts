export class CreateProductError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CreateProductError.prototype);
    }
}
