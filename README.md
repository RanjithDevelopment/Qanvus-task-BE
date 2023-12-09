# Task-App-BE
1) => this is the Backend (api) for the application
2) => build by node js , Express js and MongoDb Atlas
3) => if you want to run the application Locally follow the steps
 clone the repo in your machine
 run the command (npm install) it will installl all required packages
 create a env file , in that file specify the variables , MONGODB_URL = " your connection string" , PORT = 5000 ,SECRET_KEY = HelloWorld
 all set just  hit the command (npm start)
5) => it has two api's
 one =>  https://digital-avenue-task-api.onrender.com
    endpoints :- /api/user/signup (post)  
                /api/user/signin (post)
   second api =>  https://digital-avenue-task-api.onrender.com
    endpoints:- /api/tasks/add   (post) 
                /api/tasks/get   (Get) 
                /api/tasks/getById  (Get) 
                /api/tasks/update/:id  (Put) 
                /api/tasks/delete/:id  (Delete) 
