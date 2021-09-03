const flashcards = document.getElementsByClassName("flashcards")[0]
const createBox = document.getElementsByClassName("create-box")[0]
const question = document.getElementById("question")
const answer = document.getElementById("answer")
const modal = document.getElementsByClassName('modal')[0]
let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
// Escutadores nos botões
document.getElementById("newCard").addEventListener("click", toggleCreateBox)
document.getElementById("delCards").addEventListener("click", delFlashcards)
document.getElementById("save").addEventListener("click", addFlashcard)
document.getElementById("close").addEventListener("click", toggleCreateBox)

function delFlashcards(){
    let confirmation = confirm("Do you really want to delete all your flashcards?")
    if(confirmation){
        localStorage.clear()
        flashcards.innerHTML = ''
        contentArray = []
    }
}
contentArray.forEach(divMaker);

function divMaker(text){
    let div = document.createElement("div")
    let h2_question = document.createElement("h2")
    let h2_answer = document.createElement("h2")

    div.className = 'flashcard'

    h2_question.setAttribute('style', "border-bottom:1px solid var(--roxo); font-size: 2.5rem;padding: 1.5rem; margin-bottom:1.5rem;text-align: center")

    h2_question.innerHTML = text.my_question

    h2_answer.setAttribute("style", "text-align: left; display:none; padding: 0 3rem; font-weight: 400")
    h2_answer.innerHTML = text.my_answer

    div.appendChild(h2_question)
    div.appendChild(h2_answer)

    div.addEventListener("click", function(){
        if(h2_answer.style.display == "none")
            h2_answer.style.display = "block"
        else
            h2_answer.style.display = "none"
    })
    flashcards.appendChild(div)
}
function addFlashcard(){
    question.setAttribute("data-invalid","false")
    answer.setAttribute("data-invalid","false")
    document.getElementById("question-error").innerText= ""
    document.getElementById("answer-error").innerText= ""
    const errors = {
        my_question : "",
        my_answer : ""
    }
    const flashcard_info = {
        my_question : question.value,
        my_answer : answer.value
    }
    if(!flashcard_info.my_question.trim()){
        errors.my_question = "The question field can't be empty"
        question.setAttribute("data-invalid","true")
        document.getElementById("question-error").innerText= errors.my_question
    }
    if(!flashcard_info.my_answer.trim()){
        errors.my_answer = "The answer field can't be empty"
        answer.setAttribute("data-invalid","true")
        document.getElementById("answer-error").innerText= errors.my_answer
    }
    console.log(errors)
    if(errors.my_question || errors.my_answer){
        return
    }
    contentArray.push(flashcard_info)
    localStorage.setItem('items', JSON.stringify(contentArray))
    divMaker(contentArray[contentArray.length - 1])
    question.value = ''
    answer.value = ''
    toggleCreateBox()
}
function toggleCreateBox(){
    let newExpanded = modal.getAttribute("aria-expanded") === "false" ? "true" : "false"
    modal.setAttribute("aria-expanded", newExpanded)

    
    setTimeout(()=>{
        let newTransition = modal.getAttribute("data-transition") === "false" ? "true" : "false"
        modal.setAttribute("data-transition", newTransition)
        resetError()
    }, 300)
}
modal.addEventListener("click",toggleCreateBox)
createBox.addEventListener("click",(event)=>{
    event.stopPropagation()
})
function resetError(){
    question.setAttribute("data-invalid","false")
    answer.setAttribute("data-invalid","false")
    document.getElementById("question-error").innerText= ""
    document.getElementById("answer-error").innerText= ""
}