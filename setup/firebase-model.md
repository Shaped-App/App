# Firebase model

###Root level collections

#####questions: collection of Question documents

```
questionID: document {
  question: string,     // text of the question
  created: timestamp,   // time of creation
  creator: reference,   //? maybe just string, for admin/user
  answers: collection {
    questionAnswerID: document {
      answer: string,         // text of the answer, may need to change if size too small
      creator: reference,     // path/id to the user who made this answer
    }
  }
```

#####users: collection of User documents

```
userID: document {
  name: string                   //? add other parts of profile info
  answers: collection {
    usersAnswerID: document {
      questionRef: reference,    // path/id to question in questions collection
      answerRef: reference,      // path/id to answer in questionRef's answer collection
    }
  } 
}
```