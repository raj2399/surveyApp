## survey app
simple app for getting a survey and use auth function for middleware.
Using SQLite database


## How to Run
$ npm install
$ node index.js

Yes You are getting Server Listening at http://localhost:3000

It will be running on port 3000

## Run Image Thumbnail

1) Post call : http://localhost:3000/createThumbnail

Request will contain only public image url

2) downloaded on example images store in 

## public\images\original

3) resize image stores in

## public\images\resized

resulting thumbnail will store on this


## How to use  Survey

1) Register if new:-http://localhost:3000/register 
2) login :-http://localhost:3000/login

from 1 and 2 you will get token

3) create survey
 Post call   http://localhost:3000/surveyForm


4) add questions for perticular survey

post call    http://localhost:3000/questioAdd


5) Getting data form survey if user give it form

post call   http://localhost:3000/addTask


6) if user attempt servey then result

get call   http://localhost:3000/result



## sqlite version

    sqlite3: 5.0.0
