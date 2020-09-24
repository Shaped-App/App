const ip = 'http://3.16.151.194:3000';

export function getQuestionList(setQuestionList){
    const url = ip+"/api/v1.0/browse/question-list/?time="+encodeURIComponent("190");
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
    const url = ip + '/api/v1.0/browse/answer-list/'+qid;
    fetch(url, { method: 'GET' })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
            return {};
        });
}