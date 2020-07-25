# REST API DOCUMENTATION


Note: User IDs (uids) are not included in any of these endpoints' inputs because they will be pulled from Firebase Auth.

### Browse

***/browse/question-list/get***

Input:

```JSON
{
    "time": <int>
}
```

Response: 

```JSON
{
    "qids": [
        {
            "qid": "my_question_id1", 
            "question": <string>,
            "created": <TimeFormatTBD>,
            "user-answered": <boolean>,
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

```json
{
    "qids": [
        "my_question_id1", 
        "my_question_id2",
        ...
    ]
}
```

Response: 

```JSON
{
    "questions": {
        "my_question_id1": {
            "qid": "my_question_id1",
            "question": <string>,
            "created": <TimeFormatTBD>,
            "user-answered": <boolean>,
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

```JSON
{
    "qid": "my_question_id1"
}
```

Response: 

```JSON
{
    "aids": [
        {
            "aid": "my_answer_id1", 
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

```JSON
{
    "aids": [
        "my_answer_id1", 
        "my_answer_id2",
        ...
    ]
}
```

Response: 

```JSON
{
    "answers": {
        "my_answer_id1": {
            "aid": "my_answer_id1", 
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

```JSON
{
    "qid": "my_question_id1",
    "answer": <string>,
    "time": <TimeFormatTBD>
}
```

Response: 

```JSON
{
    "qid": "my_question_id1",
    "aid": "my_answer_id1",
    "time": <TimeFormatTBD>
}
```

***/browse/response/post***

Input:

```JSON
{
    "qid": "my_question_id1",
    "aid": "my_answer_id1",
    "response": <string>,
    "time": <TimeFormatTBD>
}
```

Response: 

```JSON
{
    "qid": "my_question_id1",
    "aid": "my_answer_id1",
    "time": <TimeFormatTBD>, 
    "responses-left": <int>
}
```

***/browse/response-limit/get***

Input:

```JSON
{
    "time": <TimeFormatTBD>
}
```

Response: 

```JSON
{
    "responses-left": <int>
}
```


