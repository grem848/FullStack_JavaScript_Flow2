# Assignment 2 FullStack JavaScript
## Period-2 Node.js, Express + JavaScript Backend Testing, NoSQL, MongoDB and Mongoose

# Explain and Reflect

>## Why would you consider a Scripting Language as JavaScript as your Backend Platform?

* It's easy and fast to build and setup a working network application with node.js, express, MongoDB, mongoose and Mocha tests. Very little code is required to make a fully functional application with a backend.

* It's very easy to work with since you use the same language both in frontend and in the backend.

* Not a lot of code is required for an application to run and it's easy to install and share.


>## Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat

## Pros
* You can make a good and responsive network application, pretty fast.

* Allows the use of data streaming, web sockets and fast file uploads.

* It's easy to set up a REST-API with express.

* It is efficient at handling thousands of concurrent requests (For example - a chat application).

* It is very simple to implement server middleware, that will be executed between all requests.

## Cons
* Java is good at handling CPU heavy tasks, Node.JS + Express is not. Because Node is, despite its asynchronous event model, by nature single threaded. When you launch a Node process, you are running a single process with a single thread on a single core. So your code will not be executed in parallel, only I/O operations are parallel because they are executed asynchronous. As such, long running CPU tasks will block the whole server and are usually a bad idea.

* Java integrates well with relational databases like MySQL. Node.JS + Express does not, they have mongoDB but that isn't relational.

* Java as oppposed to Node.JS + Express is a strictly typed language which provides a certain security.

* 500 errors in Node.JS and Express will crash the entire application, Java will not.


>## Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.

## Solution 1 (built it)

Node.js does not come with mutlithreading out of the box, since it's single threaded, but it is possible to build and program it yourself. We just haven't done that in class.

## Solution 2 (Multiple servers)

For scaling throughout on a webservice, you should run multiple Node.js servers on one or more machine/es, one per core and split request traffic between them. This provides excellent CPU-affinity and will scale throughout nearly linearly with core count. You could also put a load balancer in front of it. The load balancer will balance the load of incoming requests, thus achieving a multicore solution

>## Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems:

* ## Ensure that you Node-process restarts after a (potential) exception that closed the application

To ensure my application will work I would use nodemon at least for development, nodemon is a utility that restarts the server or the application if it crashes or after something.     

Another strategy is to use a process manager. When using a process manager, the process manager manages the starting of the application. You no longer start the application yourself, but instead instruct a process manager to do it for you. These process managers can be configured to automatically restart the application on crashes.

[Express on project managers](https://expressjs.com/en/advanced/pm.html)
 Useful process managers:
* Restart the app automatically if it crashes.
* Gain insights into runtime performance and resource consumption.
* Modify settings dynamically to improve performance.
* Control clustering.

Some popular process managers are:
* [forever](https://github.com/foreverjs/forever)
* [pm2](http://pm2.keymetrics.io/)
* [StrongLoop Process Manager](http://strong-pm.io/)

These can all be used.
<br>
<br>
* ## Ensure that you Node-process restarts after a server (Ubuntu) restart

Read above.


* ## Ensure that you can take advantage of a multi-core system

Use the web api's SetTimeout or similar to delegate tasks to the browsers multi-threading capabilities. Or one could use the cluster module for node, which is probably the best solution.


* ## Ensure that you can run “many” node-applications on a single droplet on the same port (80)

You could configure a load balancer for this purpose. Nginx could also be used as a reverse proxy.


>## Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

The problem with using `console.log` is that the output cannot easily be disabled when deployed to a production environment. Since `console.log` is a blocking call, the impact on the performance of the application will suffer. 

The `debug` package exposes a function that can be used to print debugging messages.

```js
const a = require('debug')('a') // Creates a debug function with the name a
const b = require('debug')('b') // Creates a debug function with the name b
const c = require('debug')('c') // Creates a debug function with the name c
a('Printed by a')
b('Printed by b')
c('Printed by c')
```

These messages can easily be enabled or disabled based on the `DEBUG` environment variable.

* when `DEBUG=*`, all debug statements are printed.
* when `DEBUG=a`, only the `a` debug statements are printed.
* when `DEBUG=*,-a`, all debug statements except `a` are printed.
* when `DEBUG=a,b`, only `a` and `b` debug statements are printed.

Names can also be enabled based on a regex like syntax.

```js
const a = require('debug')('name:a')
const b = require('debug')('name:b')
```

* when `DEBUG=name:a`, `a` debug statements are printed.
* when `DEBUG=name:*`, all debug statements starting with `name` are printed.


>## Demonstrate a system using application logging and “coloured” debug statements.
Logging using Winston:
```js
const app = express()
const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)
function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)
```

### Colored debug statements:

The debug module has a great namespace feature that allows you to enable or disable debug functions in groups. It is very simple–you separate namespaces by colons, like this:
```js
debug('app:meta')('config loaded')
debug('app:database')('querying db...');
debug('app:database')('got results!', results);
```
Enable debug functions in Node by passing the process name via the DEBUG environment variable. The following would enable the database debug function but not meta:
```
$ DEBUG='app:database' node app.js
```
To enable both, list both names, separated by commas:
```
$ DEBUG='app:database,app:meta' node app.js
```
Alternately, use the asterisk wildcard character (*) to enable any debugger in that namespace. For example, the following enables any debug function whose name starts with “app:":
```
$ DEBUG='app:*' node app.js
```
You can get as granular as you want with debug namespaces…
```
debug('myapp:thirdparty:identica:auth')('success!');
debug('myapp:thirdparty:twitter:auth')('success!');
```

>## Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages 

[Link to week 2 with testing](https://github.com/grem848/FullStack_JavaScript_Flow2/tree/master/week2-testing)

Testing a REST API is much easlier in JavaScript than in many other languages like Java. When using languages like Java, web services often need to be deployed to a dedicated server. Using JavaScript we can programmatically start our express server using the listen method. We can then use the node-fetch to make requests to the REST API. 

>## Explain, using relevant examples, the Express concept; `middleware`

* https://expressjs.com/en/resources/middleware.html
* https://expressjs.com/en/guide/using-middleware.html

A middleware with no mount path will be executed every time the app recieves a request
```js
var app = express()
app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})
```

>## Explain, using relevant examples, how to implement sessions and the legal implications of doing this.

```js
var cookieSession = require("cookie-session");
app.use(
    cookieSession({
        name: "session",
        secret: "I_should_never_be_visible_in_code",
        // Cookie Options
        maxAge: 30 * 60 * 1000 // 30 minutes
    })
);
```
GDPR (30) Natural persons may be associated with online identifiers provided by their devices, applications, tools and protocols, such as internet protocol addresses, cookie identifiers or other identifiers such as radio frequency identification tags.

This may leave traces which, in particular when combined with unique identifiers and other information received by the servers, may be used to create profiles of the natural persons and identify them. 
In short: when cookies can identify an individual via their device, it is considered personal data.



>## Compare the express strategy toward (server side) templating with the one you used with Java on second semester.

Both JSP and EJS uses tags to embed Java and JavaScript respectively in HTML code

JSP tags:
- `<%!` Variable declaration or method definition `%>`
- `<%=` Java valid expression `%>`
- `<%` Pure Java code `%>`

EJS tags:
- `<%` 'Scriptlet' tag, for control-flow, no output
- `<%_` ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
- `<%=` Outputs the value into the template (HTML escaped)
- `<%-` Outputs the unescaped value into the template
- `<%#` Comment tag, no execution, no output
- `<%%` Outputs a literal '<%'
- `%>` Plain ending tag
- `-%>` Trim-mode ('newline slurp') tag, trims following newline
- `_%>` ‘Whitespace Slurping’ ending tag, removes all whitespace after it

>## Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).

[API for REST end points](https://github.com/grem848/mini-project-fullstackjs2019/blob/master/routes/api.js)

This creates endpoints on the server, revealing users and locationbologs.

>## Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.

https://vegibit.com/mongoose-crud-tutorial/

https://github.com/grem848/mini-project-fullstackjs2019

>## Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
[Link to week 2 with testing](https://github.com/grem848/FullStack_JavaScript_Flow2/tree/master/week2-testing)

or 

https://github.com/grem848/mini-project-fullstackjs2019

>## Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.

We can use `nock` to mock a website
```js
const nock = require('nock');
describe("loadWiki()", function() {
    before(function() {
        //the website to be mocked
        nock("https://en.wikipedia.org")
            //the HTTP method and the path
            .get("/wiki/Abraham_Lincoln")
            //the response the mocked website should send
            .reply(200, "Mock Abraham Lincoln Page");
    });
    it("Load Abraham Lincoln's wikipedia page", function(done) {
        tools.loadWiki({ first: "Abraham", last: "Lincoln"}, function(html) {
            expect(html).to.equal("Mock Abraham Lincoln Page");
            done();
        });
    });
});
```

>## Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.




# NoSQL, MongoDB and Mongoose

>## Explain, generally, what is meant by a NoSQL database.

>## Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

>## Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB


>## Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.

This topic will be introduced in period-3

>## Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere

These two topics will be introduced in period-3

>## Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB

>## Explain the benefits of using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations

>## Explain the “6 Rules of Thumb: Your Guide Through the Rainbow” as to how and when you would use normalization vs. denormalization.

>## Demonstrate, using your own code-samples, decisions you have made regarding → normalization vs denormalization 

>## Explain, using a relevant example, a full JavaScript backend including relevant test cases to test the REST-API (not on the production database)
