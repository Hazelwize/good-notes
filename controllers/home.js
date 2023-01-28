module.exports = {
    getIndex : (req, res) => {
        console.log(req.user)
        res.send('index.html')
    }
}