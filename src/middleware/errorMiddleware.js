// middleware/errorMiddleware.js
const errorMiddleware = function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
export default errorMiddleware;
