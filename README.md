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

* ### Ensure that you Node-process restarts after a (potential) exception that closed the application

To ensure my application will work I would use nodemon at least for development, nodemon is a utility that restarts the server or the application if it crashes or after something. Or you could use a process manager like PM2.


* ### Ensure that you Node-process restarts after a server (Ubuntu) restart

Here I could for development also use nodemon.


* ### Ensure that you can take advantage of a multi-core system

Use the web api's SetTimeout or similar to delegate tasks to the browsers multi-threading capabilities. Or one could use the cluster module for node, which is probably the best solution.


* ### Ensure that you can run “many” node-applications on a single droplet on the same port (80)

You could configure a load balancer for this purpose. Nginx could also be used as a reverse proxy.


>## Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.

>## Demonstrate a system using application logging and “coloured” debug statements.

>## Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages 

>## Explain, using relevant examples, the Express concept; `middleware`
>## Explain, using relevant examples, how to implement sessions and the legal implications of doing this.

>## Compare the express strategy toward (server side) templating with the one you used with Java on second semester.

>## Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).

>## Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.

>## Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
>## Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.

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
