# **ELECTON**
Electon allows registered users to cast their votes as well as nominate themselves for any topic of discussion, image or idea. Our Administrators will initiate and moderate the elections.
Our users can upload text or media and allow other users to cast their votes on it. The results of every “election” will be displayed at the end of the time-limit.
This inludes both web and mobile interfaces of our application. Currently this application is running on cluster **fortune22** hosted by Hasura.


## **How it works?**
Admin can start an election like "Who's got the best selfie?" and anyone can nominate themselves with a valid selfie of theirs within a nomination deadline. After nomination deadline, the voting process starts and anyone can vote till the voting deadline. After said deadline the ultimate result will be displayed. After this the nominees are free to compete in other elections. A nominee in one election cannot nominate himself for any other election until the former is finished.

## **Overview**
We will have a 4 screen plan:

1. Login Form: We have used Hasura's authentication API and authentication kit. We have also modified said authentication kit with custom color theme.
2. A Listing of all currently running events. This will be called the **Vote** screen, where registered users can upvote their desired candidates.
3. A dynamically **Nominate** screen created page for each event which will initially include a submission form.
4. A dynamically created **Results** page for each event. Dynamically created meaning, it will basically be a template page which will be filled with details obtained throughout the event. This will ensure uniformity.


## **How is it built?**
- **For the mobile interface-**
- The front-end is built using **React Native** 
- The Authentication pages are built using pure React Native. React Native uses the same fundamental UI building blocks as regular iOS and Android apps. Those building blocks are put together using JavaScript and React. This also uses an open source module tcomb-form-native for the forms, wrapped around Hasura's Auth API. The main app is divided into several screens and each of them are linked into the Navigation chain, using React Navigation. 
- **For the web interface-**
- The front-end of the web application using React. React (sometimes styled React.js or ReactJS) is a JavaScript library for building user interfaces. It is maintained by Facebook, Instagram and a community of individual developers and corporations. This coupled with Material-UI (React Components that Implement Google's Material Design) make up the core of our front-end development. This uses Hasura's Auth API. We have used tab-based navigation. 
- **Back-end-**
- The backend development has been done using Flask. Flask is a micro web framework written in Python and based on the Werkzeug toolkit and Jinja2 template engine.

## **Resources/Documentation used:**
- [Hasura Docs] (https://docs.hasura.io/0.15/manual/getting-started/index.html)
- [ReactJS Docs] (https://reactjs.org/docs/hello-world.html)
- [ReactNative Docs] (https://facebook.github.io/react-native/docs/getting-started.html)
- [Flask Docs] (http://flask.pocoo.org/docs/0.12/)
- [NPM docs] (https://docs.npmjs.com/)
- [tcomb-form-native] (https://github.com/gcanti/tcomb-form-native/tree/master/lib)
