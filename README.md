# apolloRootError
An Apollo error template adaptation that shows an error when querying related data 

## Start
```npm install```
```npm start```

## Behavior it shows:
The list of people that is downloaded to the cache cannot be retrieved with a nested query attempting to get the same data out of the cache.

## Question:
Is this intended behavior? This is important because if one uses one large query to retrieve lots of information at one time (nested queries - like friends/posts for the current user), this information cannot be retrieved later with queries on individual parts - eg., when creating updates for modifiers.