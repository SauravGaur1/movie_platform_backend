const sendSuccessResp = (res, {
    status,
    data,
    ...rest
}) => {
    const resp =  {
        status: true,
        data: data,
        ...rest
    }

    status ??= 200;

    res.status(status)
       .json(resp);
}

const sendFailureResp = (res, {
    status,
    data,
    ...rest
}) => {
    const resp = {
        status: false,
        data: data,
        ...rest
    }

    status ??= 500;

    res.status(status)
       .json(resp);
}

module.exports = {
    sendSuccessResp,
    sendFailureResp
}