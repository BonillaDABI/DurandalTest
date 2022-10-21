const tokenHandler = () => {
    return (req, res, next) => {
        return next();
    }
}

module.exports = tokenHandler;