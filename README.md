# Project-C Buurtboer/ Team 1


## Run this project locally 

To run this project you need the following software installed

    docker - https://www.docker.com/products/docker-desktop/
    nodejs - https://nodejs.org/en/download version 18.0.0 +


## Set-up web-app

When the repository is first cloned some dependencies still need to be installed:

    - On open the command line (cmd) or the terminal on mac at the project-c folder 

    - paste and run this command into the terminal: 'cd .\buurtboer-webapp\'

    - paste and run 'npm install', if this does not work try running 'npm --force install'

Next we will initialize the database

    - navigate back to the project-c folder

    - paste and run 'docker-compose up'

The pgadmin software will now be running a postgres database on the following address 'localhost:8080'

    - type the address into a browser, you will see a pgadmin login screen you can login with email:admin@ad.min and password:admin

    - You will see an object explorer on the left where you have a list of servers, right click here -> register -> server, there are some fields here that have to be filled in

    - Under general -> name = BuurtBoer
    - Under Connection -> Host name/address = postgres, port = 5432, Maintenance database = postgres, Username = postgres
    
    - This will finish setting up the server, now when you try to access this it will probably ask for a password, you can just click ok as we did not set a password

    - you should be able to fold out the buurtboer server on the left and see Databases(1), right click -> create -> database

    - under general name the database "Buurtboer" and save


    - Finally return to the the command screen and paste and run the following command: 'node .\LocalDatabase\InitDb.js'

        this will initialize the tables + table relations with some test data in them.


Run these commands each in their own terminal starting from the project-c folder:

    cd buurtboer-webapp && npm start

    node '.\API Code\server.js'

    docker-compose up (if your docker container was not still running)

    node '.\Email Server\EmailServer.js'


The web-app should now be available at 'localhost:3000', type this in your webbrowser to start using the application

The credentials for the test accounts are:

                    email             password

    - superadmin: 'admin@admin.com' -   'hashed'
    - companyadmin: 'company@example.com' - 'hashed'


# Set-up Mobile App

Before starting make sure you have Android studio installed. 
You can find the download at this link: https://developer.android.com/studio 
To help you understand on what to do for Android studio, this video will give you a step by step tutorial: https://www.youtube.com/watch?v=oorfevovPWw 


When the repository is first cloned some dependencies still need to be installed:

    - On open the command line (cmd) or the terminal on mac at the project-c folder 

    - paste and run this command into the terminal: 'cd .\BuurtBoerApp\'

    - paste and run 'npm install', if this does not work try running 'npm --force install'


Next we will initialize the database

    - navigate back to the project-c folder

    - paste and run 'docker-compose up'


The pgadmin software will now be running a postgres database on the following address 'localhost:8080'

    - type the address into a browser, you will see a pgadmin login screen you can login with email:admin@ad.min and password:admin

    - You will see an object explorer on the left where you have a list of servers, right click here -> register -> server, there are some fields here that have to be filled in

    - Under general -> name = BuurtBoer
    - Under Connection -> Host name/address = postgres, port = 5432, Maintenance database = postgres, Username = postgres
    
    - This will finish setting up the server, now when you try to access this it will probably ask for a password, you can just click ok as we did not set a password

    - you should be able to fold out the buurtboer server on the left and see Databases(1), right click -> create -> database

    - under general name the database "Buurtboer" and save

    - Finally return to the the command screen and paste and run the following command: 'node .\LocalDatabase\InitDb.js'
      this will initialize the tables + table relations with some test data in them.


Run these commands each in their own terminal starting from the project-c folder:

    cd '.\BuurtBoerApp\' && 'npm start'

    node '.\API Code\server.js'

    docker-compose up (if your docker container was not still running)

    node '.\Email Server\EmailServer.js'


The app should now be available on the emulator, type this in your emulator to start using the application

The credentials for the test account is:

                        v email                             v password

    - employee:     'john.doe@example.com'                  'Test12!'


## Server Problem

Due to some trouble concerining the school servers this project is only able to be ran locally,
some functionalities are designed to work with this in mind.

- Invite Company

    When a company get invited they receive an email on the given email address containing a link for finishing the registration.

    This link will only be functional if the receiver also has this project and all other services running

