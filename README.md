# IOM FRONTEND
This project is the React JS Application as User Interface of the IOM Portal Website to visualized the open data of the IOM Project Activities.

## Background Setup & Configuration
This UI has been created & configuration using [create-react-app](https://github.com/facebook/create-react-app) is easy way to creating a React App with no  build configuration.   

## React UI Framework
This application is using [Ant Design](https://ant.design) as main UI Framework with some customize style using [JSS](http://cssinjs.org) *abstraction CSS* & [SASS](https://sass-lang.com) *CSS extension*.

## Charting Library
Charting is most important UI on this application, we use [Rechart](http://recharts.org) *redefined chart library built with React and D3*.    

## Data Rest API
This application is just the UI application without contain any data, and the data comes from [OIPA](http://oipa.nl) specific for the *IOM Project*. 

To fetching data from *OIPA*, we use [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is an interface resources (including across the network), this is the standard module in every modern browser currently available in the market.    

As we know the model of React App is SPA (Single Page Application), when a user clicks to other pages actually just move to the same page. And the problem how about data? If the same page actually must be the same data too, and [Redux](https://redux.js.org) is the solution to make it different data in SPA as a predictable state container for JavaScript Apps.

**Redux** is difficult to implemented for some developer, then we use [Redux Saga](https://redux-saga.js.org) is a library to make application side effects asynchronous things, like data fetching and impure things like accessing the browser cache and very easy to manage, more efficient to execute, and better at handling failures.

## How to run on localhost 
Download or clone this repository:

``
git clone https://github.com/zimmerman-zimmerman/iom-frontend
``

``
cd iom-frontend
``

Install all dependencies library:

``
yarn install
``

Run application:

``
yarn start
``

Finally on your browser open this link [http://localhost:3000](http://localhost:3000).


## Note
The important thing how this application connect to the *OIPA* is environment file. To check the content of the file, follow bellow command:

``
cd iom-frontend
``

Show the content of file *.env* with *cat*:

``
cat .env
``

The content of the file *.env* something like bellow:

``
REACT_APP_OIPA_HOST=https://iom-oipa.zz-demos.net
REACT_APP_REPORTING_ORGANISATION_IDENTIFIER=XM-DAC-47066
REACT_APP_HOSTNAME=https://www.iom.int
REACT_APP_GOOGLE_MAP_KEY=AIzaSyCa5x8w9ZoopjQeEwQmfSCDT4fWaNgIEA4
``

And *REACT_APP_OIPA_HOST* is the URL web server of the *OIPA*. 
