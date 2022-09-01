const notFound = (req,res) => {
    res.status(404).send("URL NOT FOUND")
}

module.exports = notFound