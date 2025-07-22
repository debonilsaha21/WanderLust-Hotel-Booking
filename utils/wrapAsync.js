
//a better way to handle/write try catch block

function wrapAsync(func) {
    return function (req, res, next) {
        Promise.resolve(func(req, res, next)).catch(next);
    };
}

module.exports = wrapAsync;