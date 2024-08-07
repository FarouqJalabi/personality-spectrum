import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // global vars
    this.order = Number(this.element.dataset.order);
    this.totalQuestions = Number(this.element.dataset.total);
    this.localStorageId = "question_"+this.order.toString()



    this.handleSavedAnswers()
    
    let lastQuestion = this.order === this.totalQuestions
    if (lastQuestion) {
      let hasCheckedRadio = this.element.querySelector('input[type="radio"]:checked')
      if (hasCheckedRadio) {
        document.querySelector("input[type=\"submit\"]").classList.remove("hidden")
      }
    }
  }

  radio_clicked(event) {
    if (this.order !== this.totalQuestions){
      // this.element.style.visibility = "hidden"
      this.element.style.transform = "translateX(-100vw)"

      setTimeout(() => {
        this.element.style.visibility = "hidden"
      }, "502"); // Reason for 502 is because animation lasts is 500

    }
    let lastQuestion = this.order === this.totalQuestions
    if (lastQuestion){
      document.querySelector("input[type=\"submit\"]").classList.remove("hidden")
    }

    // Next question visible
    let nextQuestion = document.querySelector('.question[data-order="' + (Number(this.order)+1) + '"]');
    if (nextQuestion){
      nextQuestion.style.visibility = "visible"
      nextQuestion.style.transform = "translateX(0vw)"

      // Select next question first radio button
      setTimeout(() => {
        nextQuestion.querySelector("input[type='radio']").focus()
      }, "502"); // Reason for 502 is because animation lasts is 500


    }

    this.update_progress_bar();
  }

  back_clicked() {
    let targetIndex = this.order-1 ;

    this.element.style.transform = "translateX(100vw)"
    
    this.element.style.visibility = "hidden"

    let targetQuestion = document.querySelector('.question[data-order="' + targetIndex + '"]');
    targetQuestion.style.visibility = "visible"
    targetQuestion.style.transform = "translateX(0vw)"

    setTimeout(() => {
      targetQuestion.querySelector("input[type='radio']").focus()
    }, "502"); // Reason for 502 is because animation lasts is 500

  }

  update_progress_bar() {

    let number_of_question = document.querySelectorAll('.question ').length
    let questions_answered = document.querySelectorAll('.question input:checked').length || 0

    let progress = (questions_answered / number_of_question) * 100;

    let progressBarFill = document.querySelector('.progress');
    progressBarFill.value = progress;
  }


  // Saving answer change to local storage
  save_change() {
    const checked_radio = this.element.querySelector('input[type="radio"]:checked')
    localStorage.setItem("question_"+this.order.toString(), checked_radio.id)
  }

  handleSavedAnswers() {
    let viewed_answers = localStorage.getItem("viewed_result") !== null
    if (viewed_answers){
      localStorage.clear()
    }

    let hasAnsweredQuestion = localStorage.getItem(this.localStorageId) !== null


    if (hasAnsweredQuestion){
      this.element.style.visibility = "hidden"
      this.element.style.transform = "translateX(-100vw)"
      this.element.querySelector("#"+localStorage.getItem(this.localStorageId)).checked = true
    }

    let previousQuestionOrder= this.order-1
    let previousQuestionLocalStorageId= "question_"+previousQuestionOrder.toString()
    let hasAnsweredPreviousQuestion = localStorage.getItem(previousQuestionLocalStorageId) !== null
    let lastQuestion = this.order === this.totalQuestions

    if ((!hasAnsweredQuestion || lastQuestion) &&  hasAnsweredPreviousQuestion){
      this.element.style.visibility = "visible"
      this.element.style.transform = "translateX(0vw)"
    }

    this.update_progress_bar()
  }

}
