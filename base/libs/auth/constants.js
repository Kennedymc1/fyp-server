const successResponse = (data) => {
    let success = { success: true };
    if (data) {
        return { ...success, ...data };
    } else {
        return success;
    }
};

const failResponse = (message) => {
    let success = { success: false };
    if (message) {
        return { ...success, message };
    } else {
        return success;
    }
};

module.exports = {
    ERROR: 0,
    SUCCESS: 1,
    NOT_LOGGED_IN: 2,
    EMAIL_NON_EXIST: 3,
    USER_ALREADY_EXISTS: 5,
    WRONG_PASSWORD: 9,
    successResponse: successResponse,
    failResponse: failResponse
}