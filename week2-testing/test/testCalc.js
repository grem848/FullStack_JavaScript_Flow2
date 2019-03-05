const expect = require("chai").expect;
const calc = require("../calc");
const fetch = require("node-fetch");
const PORT = 2345;
const URL = `http://localhost:${PORT}/api/calc/`;
let server;

describe("Calculator API", function () {

    describe("Testing the basic Calc API", function () {
        it("Add 4 + 3 should return 7", function () {
            const result = calc.add(4, 3);
            expect(result).to.be.equal(7);
        })

        it("Subtract 4 - 3 should return 1", function () {
            const result = calc.subtract(4, 3);
            expect(result).to.be.equal(1);
        })

        it("Multiply 4 * 3 should return 12", function () {
            const result = calc.multiply(4, 3);
            expect(result).to.be.equal(12);
        })

    })

    describe("Testing the REST Calc API", function () {
        before(function (done) {
            calc.calcServer(PORT, function (s) {
                server = s;
                done();
                console.log("Server Started")
            })
        })
        after(function () {
            server.close();
            console.log("Server Closed")
        })
        it("Add 4 + 3 should return 7", async function () {
            const result = await fetch(URL + "add/4/3").then(r => r.text());
            expect(result).to.be.equal('7');
        })
        it("Subtract 4 - 3 should return 1", async function () {
            const result = await fetch(URL + "subtract/4/3").then(r => r.text());
            expect(result).to.be.equal('1');
        })
        it("Multiply 4 * 3 should return 12", async function () {
            const result = await fetch(URL + "multiply/4/3").then(r => r.text());
            expect(result).to.be.equal('12');
        })
    })


})