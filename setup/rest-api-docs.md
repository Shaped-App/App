# REST API DOCUMENTATION


Note: User IDs (uids) are not included in any of these endpoints' inputs because they will be pulled from Firebase Auth.

### Browse

***/browse/question-list/get***

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


