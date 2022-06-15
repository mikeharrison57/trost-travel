# _Trost Travel_

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Abstract](#abstract)
- [Illustration](#illustration)          
- [Technologies Used](#technologies-used)
- [Context and Features](#context-and-features)
- [Lessons Learned](#lessons-learned)         
- [Future Features](#future-features)
- [Application Set-Up](#application-set-up)           
- [Contributor LinkedIn and GitHub](#contributor-linkedin-and-github)
- [Project Specs](#project-specs)

## Abstract

- Trost is a German word meaning, “a feeling of freedom from worry or disappointment”. This feeling is what _Trost Travel_ aims to capture for our users. It would like to make the process of tracking old, current, pending, and future trips easy and seamless. It was designed to test my abilities to implement Object Oriented Programing into my application, send and receive data from an API, practice the code review process, and incorporate Test Driven Development into the functionality of a client side application. 

## Illustrations

![Trost-travel-illustration](https://user-images.githubusercontent.com/95496577/173882768-7a59f45a-9d1f-4130-a3cb-2079761da326.gif)

## Technologies Used

- CSS
- Days.js
- HTML
- Fetch API
- JavaScript
- Mocha & Chai
- Webpack

## Context and Features

- _Trost Travel_ is a travel tracking application. It allows a user to track all of their trips. The trips are categorized into 4 sections: pending, past, present, and upcoming. Upon page load, the user is greeted with a login page. After logging in with their specific username (specified by user ID), and their password (travel for all users) they are greeted by their first name. The top banner of the application also showcases the user’s money spent on trips that particular year. After the user has looked over their current trips on the user dashboard, they are ready to book a new trip.

- The book trip form is right below the top banner of the page. The user is able to select the start date for the trip, the destination from a provided list of destinations, the amount of days for the trip, and the amount of travelers going on the trip. After making these selections, the user must press the estimated trip cost button. They must do this before being able to book the trip. After booking the trip, it will be sent to the travel agency (trip API) for approval. It will show up as a pending trip on the user dashboard, and it will also show up in the present or future sections depending on when the user booked the trip for. 


## Lessons Learned

- This was the toughest application that I’ve ever had to develop in my short time as a software developer. Coming up with the initial class structure to accommodate and interact with the provided API server was extremely challenging. I initially worked on some individual object classes, but soon decided that based on the provided data a class repo structure would better accommodate said data. I designed and developed three repo classes: TravelerRepo, DestinationRepo, and TripRepo. These three repositories would be the foundation for how I would structure my entire application. I tested them on many different array related tests given that they would be holding all of the objects from their respective API’s. I also gave my trip repo methods for converting dates (leveraging `Days.js ` to do so), sorting all of the trips into past, present, pending, and upcoming categories, and for calculating trip costs. Lastly, my traveler and destination classes both had methods for finding travelers and destinations by their respective ids. This allowed me to locate and connect trips to travelers and destinations by said ids. 

- Another very challenging aspect of this application was connecting the GET and POST requests to the API’s and class instances. Thankfully, my repository classes connected very seamlessly with the data for the GET requests. However, in order to create my objects for my POST requests I did have to put a lot of thought and effort into designing this object, and making sure all of its values were compatible with the trip API. I did so by breaking down the properties of said object very conscientiously and carefully. I found this to be a very unique challenge, particularly the fact that so many of the values were numbers, but came through as strings from the respective data input boxes on the book trip form. The final challenge for me was restructuring my application to accommodate the use of the login page. This did require much alteration of how I was previously fetching data, but ultimately tied everything from the application together. 

## Future Features

Some future features I’d like to add to this application are:

- Implementing admin access and travel agent interaction. 

- Allow the travel agent to POST suggestedActivities for user trips based off of a user’s “travelerType” value.

- Implement an animation using CSS and/or make your application responsive on smaller screen sizes.

## Application Set-Up

1. Fork repository on GitHub.

2. `Git clone` the repository to your local machine.

3. `Cd` into the directory.

4. Run `npm install` in your terminal to install project dependencies.

5. Go to this [repository](https://github.com/turingschool-examples/travel-tracker-api)  

6. Follow instructions in the travel-tracker-api repository from the previous step. 

7. Run `npm start` in the terminal to see the application. 

8. When finished with the application, be sure to type `Control + C` to stop running the travel-tracker-api and this application. 

## Contributor LinkedIn and GitHub

- [Michael Harrison: LinkedIn](https://www.linkedin.com/in/michael-harrison-b476a498/) 
- [Michael Harrison: GitHub](https://github.com/mikeharrison57)   

## Project Specs

- The specs for this application can be found 
[here](https://frontend.turing.edu/projects/travel-tracker.html)  
