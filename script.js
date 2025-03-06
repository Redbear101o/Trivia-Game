let answer = ""

async function getQuestion() {
    $('#app').hide()
    $('#loading').show()
    const URL = 'https://opentdb.com/api.php?amount=1&type=multiple'
    await fetch(URL)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        $('#question').text( decodeHtmlEntities(data.results[0].question))
        $('#category').text( decodeHtmlEntities(data.results[0].category))
        answer = data.results[0].correct_answer
        answers = [data.results[0].correct_answer, data.results[0].incorrect_answers[0], data.results[0].incorrect_answers[1], data.results[0].incorrect_answers[2]]
        answers.sort(() => Math.random() - 0.5)
        $('#answer1').text( decodeHtmlEntities(answers[0]))
        $('#answer2').text( decodeHtmlEntities(answers[1]))
        $('#answer3').text( decodeHtmlEntities(answers[2]))
        $('#answer4').text( decodeHtmlEntities(answers[3]))
        $('#loading').hide()
        $('#app').show()
    })
    .catch((error)=>{
        console.log(error)
        getQuestion()
    })
}
$("button").click(function() {
    let userAnswer = $(this).text();
    if (userAnswer == answer) {
        Toastify({
            text: "CORRECT!",
            duration: 3000,
            style: {
                background: "linear-gradient(to right,rgb(59, 176, 0),rgb(119, 201, 61))",
              }
        }).showToast();
        getQuestion()
    } else {
        Toastify({
            text: "INCORRECT!",
            duration: 3000,
            style: {
                background: "linear-gradient(to right,rgb(176, 38, 0),rgb(201, 117, 61))",
              }
        }).showToast();
    }
});

function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

getQuestion()