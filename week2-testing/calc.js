const express = require("express");
const http = require("http");

/* Basic Calculator API */
function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}
/* End of Basic Calculator API */

/* REST Calculator API */
function calcServer(port, isStartedCb) {
    const app = express();
    app.get("/api/calc/add/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(add(n1, n2).toString())
    })
    app.get("/api/calc/subtract/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(subtract(n1, n2).toString())
    })
    app.get("/api/calc/multiply/:n1/:n2", (req, res) => {
        const n1 = Number(req.params.n1);
        const n2 = Number(req.params.n2);
        res.send(multiply(n1, n2).toString())
    })

    let server = http.createServer(app);
    setTimeout(() =>
        server.listen(port, () => {
            isStartedCb(server);
        }), 1400);

}

/* End of REST Calculator API */

module.exports = {
    add,
    subtract,
    multiply,
    calcServer
}