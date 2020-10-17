const ip = 'http://3.16.151.194:3000';

//don't we need user id
function getTime(){//find a way to get the utc time
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    console.log(`${hours}:${minutes}:${seconds}`);
    return `${hours}:${minutes}:${seconds}`;
}

//when calculate age use utc time as well

export function getQuestionList(setQuestionList){
    const url = ip + '/api/v1.0/browse/question-list?time='+getTime();
    fetch(url,{ method: 'GET'})
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            setQuestionList(json);
        })
        .catch((error) => {
            console.log(error);
            return {};
        });
}

export function getAnswerList(qid){
    const url = ip + `/api/v1.0/browse/answer-list?time${getTime()}&qid=${qid}`;
    fetch(url, { method: 'GET' })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
            return {};
        });
}

export function postAnswer(qid, answer){
    const url = ip + "/api/v1.0/browse/answer/post";
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'qid': qid,
            'answer': answer,
            'time': getTime()
        })
    });
}

//why do I need my_answer_id? Shouldn't it be the other person's answer id?
export function postResponse(qid, aid, response){
    const url = ip + "/api/v1.0/browse/response/post";
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'qid': qid,
            'aid': aid,
            'response': response,
            'time': getTime()
        })
    });
}