
# Hi there! We are Clone Team 👋

You are the ![](https://visitor-badge.glitch.me/badge?page_id=TrNgTien.Facebook_Clone)! Thanks for your visit!

## Contributor
Here is our team, you can connect us through our Linkedin:
- [Tran Ngoc Tien (Team Leader)](https://www.linkedin.com/in/trngtien/)
- [Duong Thien Phuc (Front-end Developer)](https://www.linkedin.com/in/phucduongthien/)
- [Nguyen Quoc viet (Back-end Developer)](https://www.linkedin.com/in/viet-nguyen-4b6391195/)
# Facebook Clone

    1. Facebook as know as the most popular social media in  the world through more than 18 years since 2004.
    2. Facebook was created the famous Front-end framework until now, which is React.JS.
    3. We clone Facebook because we want to improve our skills when apply new knowledge to solve strange problems from existed production.


## INTRODUCTION
   1. Motivation:
        -   Facebook as known as the most popular social media in the world through more than 18 years since 2004.
        -   Facebook was created the famous Front-end framework until now, which is React.JS.
        -   We clone Facebook because we want to improve our skills when apply new knowledge to solve strange problems from existed production.
   2. Problem Statement:
        - 	We realized that the transferring among the social media have problem which have the limit.
        - 	Developing the connection, chatting feature through web.
        - 	Have the knowledge of pain point of Facebook when using RESTful API and improve to GraphQL.
   3. Scope:
        -   Propose to establish a social networking site for everyone connect to others. Work must be completed to finish the project of completing the website. As a             result, the scope of the project of building Facebook clone, coordination, and administration operations to guarantee the product scope is met. These                   efforts are included into the project management plan, which in turn is incorporated into the scope management plan. At the end of the project or phase,               the work accomplished is compared to the scope baseline in the project management plan to assess if the scope was effectively completed.
 ## LITERATURE REVIEW:
   1. Similar Application/System:
        -   Facebook is a social networking site that makes it easy for everyone to connect and share with family and friends online. It initially designed for college             students; Facebook was founded in 2004 by Mark Zuckerberg while he was enrolled at Harvard University. By 2006, anyone who over the age of 13 with a valid             email address could join Facebook. Today, Facebook is the world's largest social network, with more than 1 billion users worldwide
   2.	Platform and Tools Reviews:
        -   Platform: Web application (Web app) is an application program that is stored on a remote server and delivered over the Internet through a browser interface
        - Tools:
IDE tool: VSCode – The tool help developing more effectively with many use extension.
            	
API Testing: Postman – The tool help checking the API during building a web app.
            	
DB management GUI: MongoDB Compass – The tool help managing MongoDB database
            	
Cloudserver management: AWS Management Console – The tool help managing the services of AWS such as AWS S3
            	
Proxy: nginx – The open-source software for web serving, reverse proxying, catching, load balancing.
            	
DNS management: Cloudflare – help us manage DNS record
 ## SYSTEM DESIGN:
   1. System Requirement Specification:
        
        •	Functional Requirements:
            
    o	React.JS: This is the free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta                   and a community of individual developers and companies.
            
    o	Axios: Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same                         codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests.
            
    o	Redux: Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different                           environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing                   combined with a time traveling debugger.
            
    o	MongoDB: is a document-oriented NoSQL database used for high volume data storage. Instead of using tables and rows as in the traditional relational                     databases, MongoDB makes use of collections and documents. Documents consist of key-value pairs which are the basic unit of data in MongoDB.                           Collections contain sets of documents and function which is the equivalent of relational database tables. MongoDB is a database which came into light                   around the mid-2000s.
            
    o	Node.JS: Node.JS í an open source server environment, it free, also runs on various platforms (Window, Linux, Unix, Mac OS X, …). Node.JS uses                         JavaScript on the server.
            
    o	Express.JS: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
            
    o	Socket.io: is an event-driven JavaScript library for real-time web applications. It enables real-time, bi-directional communication between web clients                 and servers. It has two parts: a client-side library that runs in the browser, and a server-side library for Node.js. Both components have a nearly                     identical API.
        

•	Non-functional Requirements:
            
    o	AWS: Amazon Web Services, Inc. (AWS) is a subsidiary of Amazon that provides on-demand cloud computing platforms and APIs to individuals, companies,                   and governments, on a metered pay-as-you-go basis. These cloud computing web services provide distributed computing processing capacity and software                   tools via AWS server farms

    o	Cloudflare: Cloudflare, Inc. is an American content delivery network and DDoS mitigation company, founded in 2010. It primarily acts as a reverse proxy                 between a website's visitor and the Cloudflare customer's hosting provider. Its headquarters are in San Francisco, California.
            
    o	NGINX: an open-source web server that, since its initial success as a web server, is now also used as a reverse proxy, HTTP cache, and load balancer.
        
•	Requirements Analysis:

o	Business requirements:

    	These include high-level statements of goals, objectives, and needs. Business requirements do not include any details or specific features. They                       just state the problem and the business objective to be achieved such as:
                    •	Increased revenue/throughput/customer reach,
                    •	Reduced expenses/errors,
                    •	Improved customer service
o	User requirements:
    
    	The needs of discrete stakeholder groups (top-level managers, nonmanagement staff, customers, etc.) are specified to define what they expect from a                     particular solution. This group serves as a bridge between the generalized business requirements and specific solution requirements. They are                           outlined in a User Requirements Specification and can include, for example, ability to create various reports, view order history and status,                           manage customer databases, etc.

o	Transition requirements:
    
    	An additional group of requirements defines what is needed from an organization to successfully move from its current state to its desired state                       with the new product. They are only necessary for the short period of time while the transition takes place. Examples can be “users must be trained                     to operate the system” or “previous data must be migrated to the cloud storage.”
                
   2. System Design Specification:
 
   •	Use-cases Diagram:
        
![image](https://user-images.githubusercontent.com/69331659/172518855-61278229-3a84-4fd9-be4f-af404f4283f0.png)
  
  •	Sequence Diagram: 
        
![This is an image](https://user-images.githubusercontent.com/69331659/172477414-9327aecf-2a86-4a89-af78-e458d8c5a70b.png)
![This is an image](https://user-images.githubusercontent.com/69331659/172477440-4fc9aca1-b406-4cd0-aeb3-f29e7d23bfc9.png)
![This is an image](https://user-images.githubusercontent.com/69331659/172477479-b98afb42-a80a-4143-a7c0-b65d3025caed.png)


   •	Activity Diagram:
        
        
![This is an image](https://user-images.githubusercontent.com/69331659/172477527-15cd9c73-444b-4d57-99d5-c926fb748a61.png)
![This is an image](https://user-images.githubusercontent.com/69331659/172477539-85396c05-0767-4d64-85a5-b9027613953c.png)
![This is an image](https://user-images.githubusercontent.com/69331659/172477552-d372090c-13c7-4c55-a654-13f2bf5e4953.png)


## 🛠 Skills Applied
Programming Languages: Javascript, Typescript.

Front-end: React.JS, SCSS, Redux/ Redux Toolkit, axios, Socket.io.

Back-end:  Node.JS, Express.JS, JWT, Socket.io.

Database: MongoDB.

Storage: AWS S3.

Cloud Server: AWS EC2.

IDE Tool: Visual Studio Code.

API Testing: Postman.



## 🔗Our system design for this project

[Database Design](https://app.diagrams.net/#G1jOkO6GnPS2UvqOe3rX46RnKTnSuKjA1w)

## Demo

[FacebookClone](https://fb.iuweb.online/)
## Features

- Login/ Register/ Logout.
- Post to your NewsFeed and your wall. 
- See your friends' post on NewsFeed.
- Chatting.
- Profile Page/ Edit Profile.
- Add Friends.
- Remember login.
- Story (future).

## Strength and Weakness:
   o	Strength: We completely control the web app and clone nearly all feature of Facebook
   o	Weakness: Too much feature to handle and do not complete feature which listed when planning

## Acknowledgements
- [React.JS](https://reactjs.org/)
- [axios](https://axios-http.com/docs/intro)
- [Redux](https://redux.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [Node.JS](https://nodejs.org/en/) 
- [Express.JS](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [AWS](https://aws.amazon.com/)
- [CloudFlare](https://dash.cloudflare.com/login)
- [Nginx](https://www.nginx.com/)
## Future Features
- Story
