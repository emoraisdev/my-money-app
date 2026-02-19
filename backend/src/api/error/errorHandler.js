export default function handleError(err, req, res, next) {

    let statusCode = err.statusCode ?? 500;
    let errors = [];

    // 🔹 Lista de erros já formatada
    if (Array.isArray(err.errors)) {
        errors = err.errors;
    }

    // 🔹 Erro único customizado
    else if (err.code && err.message) {
        errors = [
            {
                code: err.code,
                message: err.message,
                field: err.field,
            },
        ];
    }

    // 🔹 Mongoose ValidationError
    else if (err.name === "ValidationError") {
        statusCode = 400;

        errors = Object.values(err.errors).map(e => ({
            code: "VALIDATION_ERROR",
            message: e.message,
            field: e.path,
        }));
    }

    // 🔹 Mongoose CastError
    else if (err.name === "CastError") {
        statusCode = 400;

        errors = [
            {
                code: "INVALID_ID",
                message: "ID inválido",
                field: err.path,
            },
        ];
    }

    // 🔹 Duplicate key (unique)
    else if (err.code === 11000) {
        statusCode = 409;

        errors = Object.keys(err.keyValue).map(field => ({
            code: "DUPLICATE_FIELD",
            message: `${field} já está em uso`,
            field,
        }));
    }

    // 🔹 Fallback
    else {
        statusCode = 500;

        errors = [
            {
                code: "INTERNAL_SERVER_ERROR",
                message: "Erro interno do servidor",
            },
        ];
    }

    return res.status(statusCode).json({
        statusCode,
        timestamp: new Date().toISOString(),
        errors,
    });
}