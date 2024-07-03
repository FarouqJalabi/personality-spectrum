import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.order = Number(this.element.dataset.order);
    this.totalQuestions = Number(this.element.dataset.total);
  }

  radio_clicked(event) {
    if (this.order !== this.totalQuestions){
      this.element.style.visibility = "hidden"
    }
    if (this.order === this.totalQuestions){
      document.querySelector("input[type=\"submit\"]").classList.remove("hidden")
    }

    // Next question visible
    let nextQuestion = document.querySelector('.question[data-order="' + (Number(this.order)+1) + '"]');
    if (nextQuestion){
      nextQuestion.style.visibility = "visible"
      // Select next question first radio button
      nextQuestion.querySelector("input[type='radio']").focus()

    }

    this.update_progress_bar();
  }

  back_clicked() {
    let targetIndex = this.order-1 ;

    this.element.style.visibility = "hidden"

    let targetQuestion = document.querySelector('.question[data-order="' + targetIndex + '"]');
    targetQuestion.style.visibility = "visible"
    targetQuestion.querySelector("input[type='radio']").focus()
  }

  update_progress_bar() {

    let number_of_question = document.querySelectorAll('.question ').length
    let questions_answered = document.querySelectorAll('.question input:checked').length || 0

    let progress = (questions_answered / number_of_question) * 100;

    let progressBarFill = document.querySelector('.progress');
    progressBarFill.value = progress;
  }
};
