# REST API DOCUMENTATION


Note: User IDs (uids) are not included in any of these endpoints' inputs because they will be pulled from Firebase Auth.

### Profile

***/profile/info/get***

Input:

```
{
    "uid": <uid>
}
```

Response: 

```
{
    "info": {
        "uid": <uid>,
        "email": <email>,
        "phone_number": <number>,
        "profile_pic": <image_id>,
        "gender": <text>,
        "first_name": <text>,
        "full_name": <text>,
        "birthday": <time>,
        "zipcode": <number>,
        "looking_for_friend": <boolean>,
        "looking_for_relationship": <boolean>,
        "mile_distance": <number>,
        "age_low": <number>,
        "age_high": <number>,
        "about": <text>,
        "bible_verse": <text>,
    }
}
```

***/profile/info/post***

Input:

```
{
    "token": <token>,
    "updating_info": {
        "looking_for_friend": <boolean>,
        "looking_for_relationship": <boolean>,
        "mile_distance": <number>,
        "age_low": <number>,
        "age_high": <number>,
        "about": <text>,
        "bible_verse": <text>,
    }
}
```

Response: 

```
{
    "time": <TimeFormatTBD>
}
```

***/profile/create/post***

Input:

```
{
    "token": <token>,
    "new_user_info": { 
        "email": <email>,
        "phone_number": <number>,
        "profile_pic": <image_id>,
        "gender": <text>,
        "first_name": <text>,
        "full_name": <text>,
        "birthday": <time>,
        "zipcode": <number>,
        "looking_for_friend": <boolean>,
        "looking_for_relationship": <boolean>,
        "mile_distance": <number>,
        "age_low": <number>,
        "age_high": <number>,
    }
}
```

Response: 

```
{
    "new_uid": <uid>        // uid of new user
}
```

***/profile/recent-answers/get***

Input:

```
{
    "uid": <uid>,
    "time": <TimeFormatTBD>
}
```

Response: 

```
{
    "answers": {
        "my_answer_id1": {
            "aid": "my_answer_id1", 
            "qid": "my_question_id1",
            "answer": <string>,
            "created": <TimeFormatTBD>,
            "creator": <string> // uid
        }, 
        "my_answer_id2": {
            "aid": "my_answer_id2", 
            ...
        }, 
        ...
    }
}
```

***/profile/interests/get***

Input:

```
{
    "uid": <uid>
    "time": <TimeFormatTBD>
}
```

Response: 

```
{
    "interests": [
        <string1>,
        <string2>,
        ...
    ]
}
```

***/profile/interests/post***

Input:

```
{
    "token": <token>,
    "interests": [
        <string1>,
        <string2>,
        ...
    ],
    "time": <TimeFormatTBD>
}
```

Response: 

```
{
    "time": <TimeFormatTBD>
}
```
