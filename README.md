# Online Voting System

## Project Description
Fingerprint-based Voting is an application where the user (a voter) is recognized by his fingerprint. Since the fingerprint pattern for each human being is different, the voter can be easily authenticated. The system allows the voter to vote by using his fingerprint. A voter can vote for the candidate only once, the system will not allow the user to vote a second time. The system will allow the admins to add elections, and add the candidates’ names and photos (those who are nominated for an election). Admins only have the right to add candidates’ names and photos.

Admins will register the voter’s name by verifying the voter/user through his/her identity proof (and then the admin will register the voter). The candidates added to the system by the admins will be automatically deleted after the completion of an election. Admins have to add the date on which an election is going to end. Once a user has received the user ID and password from the admin, the user can log in and vote for a candidate from those who are nominated.

The system will allow the user to vote for only one candidate. The system will allow the user to vote once in a particular election. Admins can add any number of candidates when a new election is announced. Admins can also view an election’s result by using the election ID. A user can also view an election’s result.

## Tools
- Backend should be in (`node.js` & `Express.js`)
- Database (`MySQL`)

## To Use the project
After downloading the project repository and making sure that NodeJS is installed 
- Navigate to the project folder on your terminal and run this command `npm i` to install backend end dependencies.
- Run this command `npm run dev` to execute the project.

## APIs
You can find all system APIs in this [VotingSystem.postman_collection.json](VotingSystem.postman_collection.json)



