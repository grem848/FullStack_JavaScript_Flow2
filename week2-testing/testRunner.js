const calc = require("./calc");
const PORT = 666;

calc.calcServer(PORT, (s) => console.log("Server Started"));