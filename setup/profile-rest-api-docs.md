# REST API DOCUMENTATION


Note: User IDs (uids) are not included in any of these endpoints' inputs because they will be pulled from Firebase Auth.

### Profile

***/browse/question-list/get***


profile info:
email, phone number, password, profile pic, gender, name, birthday, zipcode, friendship vs relationship, mile distance, age range

changeable profile info:
friendship vs relationship, mile distance, age range

about, bible verse, interests, recent activity

interests and recent activity can be toggled off


"/browse/question-list/get": "/api/v1.0/browse/question-list/",
"/browse/question/get": "/api/v1.0/browse/question/",
"/browse/answer-list/get": "/api/v1.0/browse/answer-list/",
"/browse/answer/get": "/api/v1.0/browse/answer/",
"/browse/answer/post": "/api/v1.0/browse/answer/",
"/browse/response/post": "api/v1.0/browse/response/",
"/browse/response-limit/get": "api/v1.0/browse/response-limit/"

Input:

```
{
    "time": <TimeFormatTBD>
}
```

Response: 

```
{
    "qids": [
        {
            "qid": "my_question_id1", 
            "question": <string>,
            "created": <TimeFormatTBD>,
            "userAnswered": <boolean>,
            "creator": <string> // not sure if we need this
        }, 
        {
            "qid": "my_question_id2", 
            ...
        }, 
        ...
    ]
}
```

***/browse/question/get***

Input:

```
{
    "qids": [
        "my_question_id1", 
        "my_question_id2",
        ...
    ]
}
```

Response: 

```
{
    "questions": {
        "my_question_id1": {
            "qid": "my_question_id1",
            "question": <string>,
            "created": <TimeFormatTBD>,
            "userAnswered": <boolean>,
            "creator": <string> // not sure if we need this
        }, 
        "my_question_id2": {
            "qid": "my_question_id2", 
            ...
        }, 
        ...
    }
}
```

***/browse/answer-list/get***

Input:

```
{
    "time": <TimeFormatTBD>,
    "qid": "my_question_id1"
}
```

Response: 

```
{
    "aids": [
        {
            "aid": "my_answer_id1", 
            "qid": "my_question_id1",
            "answer": <string>,
            "created": <TimeFormatTBD>,
            "creator": <string> // uid
        }, 
        {
            "aid": "my_answer_id2", 
            ...
        }, 
        ...
    ]
}
```

***/browse/answer/get***

Input:

```
{
    "qid": "my_question_id1",
    "aids": [
        "my_answer_id1", 
        "my_answer_id2",
        ...
    ]
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

***/browse/answer/post***

Input:

```
{
    "qid": "my_question_id1",
    "answer": <string>,
    "time": <TimeFormatTBD>
}
```

Response: 

```
{
    "answer": {
        "aid": "my_answer_id1", 
        "qid": "my_question_id1",
        "answer": <string>,
        "created": <TimeFormatTBD>,
        "creator": <string> // uid
    }
}
```

***/browse/response/post***

Input:

```
{
    "qid": "my_question_id1",
    "aid": "my_answer_id1",
    "response": <string>,
    "time": <TimeFormatTBD>
}
```

Response: 

```
{
    "qid": "my_question_id1",
    "aid": "my_answer_id1",
    "time": <TimeFormatTBD>, 
    "responsesLeft": <int>
}
```

***/browse/response-limit/get***

Input:

```
{
    "time": <TimeFormatTBD>
}
```

Response: 

```
{
    "responsesLeft": <int>
}
```


