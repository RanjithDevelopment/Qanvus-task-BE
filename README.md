# Task-App-BE
1) => this is the Backend (api) for the application
2) => build by node js , Express js and MongoDb Atlas
3) => if you want to run the application Locally follow the steps
4) => clone the repo in your machine
5) => run the command (npm install) it will installl all required packages
6) => create a env file , in that file specify the variables , MONGODB_URL = " your connection string" , PORT = 5000 ,SECRET_KEY = HelloWorld
7) => all set just  hit the command (npm start)
8) => it has two api's
9)  one =>  https://digital-avenue-task-api.onrender.com
10)   endpoints :- /api/user/signup (post)  
11)                /api/user/signin (post)
12)   second api =>  https://digital-avenue-task-api.onrender.com
13)    endpoints:- /api/tasks/add   (post) 
14)                /api/tasks/get   (Get) 
15)                /api/tasks/getById  (Get) 
16)                  /api/tasks/update/:id  (Put) 
17)               /api/tasks/delete/:id  (Delete) 
