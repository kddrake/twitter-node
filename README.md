# twitter-project
Connecting to Twitter's Public Sample Stream using Node.js to calculate and display tweet data

###Dependencies:
- [node.js](https://nodejs.org/download/)

###Install:
- Ensure [node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (comes with node.js) are installed on your machine
- Create your [twitter credentials](https://apps.twitter.com/) and place each corresponding key in the commented out section of src/js/publicStream.js:
``` 
var client = new Twitter({
  consumer_key: /*Your Consumer Key goes here*/,
  consumer_secret: /*Your Secret Consumer Key goes here*/,
  access_token_key: /*Your Access Token goes here*/,
  access_token_secret: /*Your Secret Access Token goes here*/
})
```
- Clone this repo
- Run `npm install`

###Run:
####Default:
The default log interval is 10 seconds, which can be run this way:
- Navigate to the directory where the repo was cloned
- Run `node src/index.js`

####Custom Interval:
You can define the log interval, which can be run this way instead:
 `node src/index.js x`
- where `x` is some number larger than 5.
- At times, the twitter stream can be slow to respond which is why an interval smaller than five seconds will not be set.
- If the second argument (x) or subsequent arguments (anything after x) are numbers less than five or not numbers at all, the application will run with it's default log interval of 10 seconds.
