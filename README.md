A fullstack MERN app to upload and play audio in shuffle/repeat loop in the playlist or stop song once finished playing. 

# Usage
Below are steps to be followed to run the app 

## Backend
Step 1: Add config.json file in the root of backend folder
>config.json
>```
>{
>  "mongodb-uri": "your mongoDB uri",
>  "port": "2000"
>}
>```

Step 2: Install packages with npm i 

Step 3: Run the backend\
Move to `/backend` folder\
Run the app with the following command
```
node .
```

## frontend
Step 1: Add config.json file in the root of `frontend` folder
>config.json
>```
>{
>  "backend-server": "http://localhoat:2000"
>}
>```

Step 2: Install packages with `npm i` 

Step 3: Run the app with the command below
```
npm start
```