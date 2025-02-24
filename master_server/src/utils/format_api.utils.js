export const formatResponse = (success, data, errorCode, errorMessage) => ({
    Success: success,
    Data: success ? data : null,
    Error: success
        ? null
        : {
            Code: errorCode,
            Message: errorMessage,
        },
});