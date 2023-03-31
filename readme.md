# Project Folder Structures

## **controllers**

### here we will put the handlers of our routes. As we’ll see in the routes/ component of the Node.js project, when the client “pings” our routes for the different CRUD operations , we create handlers to represent each one of those operations. In the controllers we use the services’ logic to handle responses to the client. A good naming convention is the entity associated to that specific controller followed by controller (statistics-controller.js, contact-controller.js).

1.  ### **auth.js**

    #### authjs contains functionallty which responsible for handling the auth routes.

        register
        login

2.  ### **thread.js**

    #### threadjs contains functionalities which responsible for handling the thread realted routes

        createThread
        getThreads
        getUserFeed
