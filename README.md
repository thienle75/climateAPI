# Weather simple API

Weather API is a simple API writting using Node.js and Express. The intent is to allow a developer to get a weather api up and running
quickly with minimal setup.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

Node.js

NPM or Yarn

### Installation
Via yarn:

```
yarn install 
```

Via npm:
```
npm install
```

### Starting the API

Via yarn:

```
yarn start
```

Via npm:

```
npm start
```

You should now see that the server is live and listening on port 9001. You can test that it is working by opening the below URL in a browser.

```
http://localhost:9001/weather
```

### Documentation

When the server is running you can visit `/docs` to view generated documentation regarding the endpoints that can be called. This provides the routes, parameters, response signatures, and descriptions of each endpoint.

`http://localhost:9001/docs`

### Calling the API

A tool such as postman is recommended to test API Calls.

get Weather procast by date

it should return the list of all urban in canada with mean temperation and provide the total median 

#### Assumtion

Definition for urban is city which population > 1000 and desity has to be greater than 1 . In reality the density has to be greate than 400
API key is static for authentication 
APIkey = 'thisisatestfortealbook'
Median = sum all mean temperature divide by number of urban 
the function to calculate between two points is correct

### How it works

1. Get all station information has mean temperature for that day
2. Get all urban of canada base on assumption above
3. For each urban find the distance to each station
4. Find smallest distance between weather station and urban
5. Output the list of urban with the mean temperature
6. Calculate the median 


## Running the tests

yarn test 

npm run test


## Built With

* [Express](https://expressjs.com/) - Web framework for Node.js

## Authors

* **Thien Le** - *Initial work* - [Thien Le](https://github.com/thienle75)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
