# **ELECTON**
Electon allows registered users to cast their votes as well as nominate themselves for any topic of discussion, image or idea. Our Administrators will initiate and moderate the elections.
Our users can upload text or media and allow other users to cast their votes on it. The results of every “election” will be displayed at the end of the time-limit.
This inludes both web and mobile interfaces of our application. Currently this application is running on cluster **fortune22** hosted by Hasura.

## **How it works?**
Admin can start an election like "Who's got the best selfie?" and anyone can nominate themselves with a valid selfie of theirs within a nomination deadline. After nomination deadline, the voting process starts and anyone can vote till the voting deadline. After said deadline the ultimate result will be displayed. After this the nominees are free to compete in other elections. A nominee in one election cannot nominate himself for any other election until the former is finished.

## **Overview**
We will have a 4 screen plan:

1. Login Form: We have used Hasura's authentication API and authentication kit. We have also modified said authentication kit with custom color theme.
2. A Listing of all currently running events. This will be called the **Vote** screen, where registered users can upvote on their desired choice in each event.
3. **Nominate** screen which will include a submission form to take part in the open events.
4. **Results** screen for each user subscribed events.

## **How is it built?**
#### **For the mobile interface-**
- The front-end is built using **React Native** 
- The Authentication pages are built using pure React Native. React Native uses the same fundamental UI building blocks as regular iOS and Android apps. Those building blocks are put together using JavaScript and React. This also uses an open source module tcomb-form-native for the forms, wrapped around Hasura's Auth API. The main app is divided into several screens and each of them are linked into the Navigation chain, using React Navigation. 
#### **For the web interface-**
- The front-end of the web application using **React**. React (sometimes styled React.js or ReactJS) is a JavaScript library for building user interfaces. It is maintained by Facebook, Instagram and a community of individual developers and corporations. This coupled with **Material-UI** (React Components that Implement Google's Material Design) make up the core of our front-end development. This uses Hasura's Auth API. We have used tab-based navigation. 
#### **Back-end-**
- The backend development has been done using **Flask**. Flask is a micro web framework written in Python and based on the Werkzeug toolkit and Jinja2 template engine.


## **Deployment instructions**
### **Basic deployment:**
Firstly get the application by running the command
`$ hasura quickstart devs76/electon`
The `hasura quickstart` command clones the project repository to your local computer, and also creates a *free Hasura cluster*, where the application will be hosted for free.
A git remote (called hasura) is created and initialized with your application directory.
Then run the following commands-
- `$ git add .`
- `$ git commit -m "First commit"`
- `$ git push hasura master`

Run the below command to open your shiny new deployed Electon app.
 -  `$ hasura microservice open ui`
  
### **Making changes and deploying:**
To make changes to the web-app, edit the files in `src` folder according to your app.
Add and commit the changes, and perform `git push hasura master` to deploy the changes.

The mobile-app can be found in the `react-native-app` directory. You can take it out into a separate directory and develop independently. Follow [this](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) guide for making a standalone app.

### **Local development:**
- To test and make changes to this app locally, follow the below instructions.
- Open Terminal and `cd` into the project folder
- Run `npm install` to install all the project dependencies
- Run `npm start` for the dev mode app which will automatically open in the browser (web-app) or give you the QR code to scan using the [Expo Client](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) (mobile-app). This mode supports hot module replacement and live reload.
- Make changes to the app, and see the changes in the browser/client.
- For a more production optimized app, execute `npm run build` in the terminal to build and serve it with a module like Serve.
 `npm i serve && serve -s build`


## **Resources/Documentation used:**
- [Hasura Docs](https://docs.hasura.io/0.15/manual/getting-started/index.html)
- [NPM docs](https://docs.npmjs.com/)
- [ReactJS Docs](https://reactjs.org/docs/hello-world.html)
- [Create-React-App](https://github.com/facebookincubator/create-react-app)
- [ReactNative Docs](https://facebook.github.io/react-native/docs/getting-started.html)
- [Flask Docs](http://flask.pocoo.org/docs/0.12/)
- [tcomb-form-native](https://github.com/gcanti/tcomb-form-native/tree/master/lib)
- [Material-UI](http://www.material-ui.com/#/get-started/required-knowledge)
- [React-Dropzone-Component]( https://github.com/felixrieseberg/React-Dropzone-Component)
- [React-Media](https://github.com/ReactTraining/react-media)

## **Contributors:**
#### React.js:
- [Harshith Thota](https://github.com/Hyperclaw79)
- [Sneha](https://github.com/itmesneha)
#### React-Native:
- [Ganesh Ramkumar](https://github.com/Science001)
- [Hari Shankar](https://github.com/HariShankarNU)
#### Python-Flask:
- [Ashwani Gupta](https://github.com/ashwani99)
- []()
