function createdResponse(res, payload) {
    res.status(201);
    return res.json({ payload });
}

function updatedResponse(res, payload) {
    res.status(204);
    return res.json({ payload });
}

function listResponse(res, payload) {
    res.status(200);
    return res.json({ payload });
}

function errorResponse(res, status, message) {
    res.status(status);
    return res.json({ error: message });
}

module.exports = {
    createdResponse,
    listResponse,
    errorResponse,
    updatedResponse
}