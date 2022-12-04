# My Workout Planner REST API

## About:

- This is a REST API built in Express + MongoDB with Nodejs.
- The repo for the frontend; built with Reactjs, can be found here: [https://github.com/ptiry02-co/my-workout-frontend](url)

## Instructions:

To run locally...

- clone repo
- run `npm install` or `yarn` to install dependencies.
- create a `.env` file with:
  - `HTTP_PORT=<set a port number> defaults to 8080`
  - `TOKEN_SECRET=<create your own token secret> defaults to: MySuperSecretTokenSecret_01`
  - `ORIGIN=<your frontend url> defaults to: http://localhost:3000`
  - `DATABASE=<your database uri> defaults to mongodb://localhost:27017/development`

<br>

- run `yarn dev` to start the server locally.

## Endpoints

<table>
    <thead>
        <tr>
            <th style='text-align: center;'>Method</th>
            <th style='text-align: center;'>Endpoint</th>
            <th style='text-align: center;'> Body keys </th>
            <th style='text-align: center;'>Auth</th>
            <th style='text-align: center;'>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=4>GET</td>
            <td>/verify</td>
            <td></td>
            <td>Bearer Token or none</td>
            <td>Checks for logged user</td>
        </tr>
        <tr>
            <td>/plans</td>
            <td></td>
            <td>Bearer Token</td>
            <td>User plans</td>
        </tr>
        <tr>
            <td>/plans/:planId</td>
            <td></td>
            <td>Bearer Token</td>
            <td>One of the users plan</td>
        </tr>
        <tr>
            <td>/exercises</td>
            <td></td>
            <td>Bearer Token</td>
            <td>The exercises of each user plans</td>
        </tr>
        <!-- <tr>
            <td>/exercises/:exerciseId</td>
            <td></td>
            <td>Bearer Token</td>
            <td>A specific exercise</td>
        </tr> -->
        <tr>
            <td rowspan=4>POST</td>
            <td>/signup</td>
            <td>email & password</td>
            <td>none</td>
            <td>Sign in a new user</td>
        </tr>
        <tr>
            <td>/login</td>
            <td>email & password</td>
            <td>none</td>
            <td>Log in User</td>
        </tr>
        <tr>
            <td>/plans</td>
            <td>name, type*, description, day**, </td>
            <td>Bearer Token</td>
            <td>Creates new Plan for logged in user</td>
        </tr>
        <tr>
            <td>/exercises</td>
            <td>planId, name, gif, bodyPart, sets, reps </td>
            <td>Bearer Token</td>
            <td>Creates new Plan for logged in user</td>
        </tr>
        <tr>
            <td>PUT</td>
            <td>/plans/:planId</td>
            <td>either: name, type*, description or day**</td>
            <td>Bearer Token</td>
            <td>Change one or more of the plan values</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/exercises/:exerciseId</td>
            <td></td>
            <td>Bearer Token</td>
            <td>Delete an exercise from a plan</td>
        </tr>
    </tbody>
</table>

<br>

## Demo

Try it here: [https://api.my-workout-plans.com](url)
