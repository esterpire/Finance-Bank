// Get references to form elements and result container
const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

// Function to recommend a plan based on user input
function recommendPlan(responses) {
    const { userType, investment, reports, tools } = responses;

    if (userType === "Basic") {
        if (investment === "Yes" && reports === "Yes") {
            return "We recommend the Standard Plan for you.";
        } else {
            return "We recommend the Basic Plan for you.";
        }
    } else if (userType === "Intermediate") {
        if (investment === "Yes" && tools === "Yes") {
            return "We recommend the Premium Plan for you.";
        } else {
            return "We recommend the Standard Plan for you.";
        }
    } else if (userType === "Advanced") {
        return "We recommend the Premium Plan for you.";
    }
}

// Function to reset the form and local storage
function resetQuiz() {
    // Clear local storage
    localStorage.removeItem('quizResponses');
    
    // Uncheck all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Hide the result
    quizResult.style.display = 'none';
    quizResult.innerHTML = '';
}

// Event listener for form submission
quizForm.addEventListener('submit', function (event) {
    event.preventDefault();  // Prevents the page from refreshing on submit

    // Get the selected answers
    const userType = document.querySelector('input[name="userType"]:checked')?.value;
    const investment = document.querySelector('input[name="investment"]:checked')?.value;
    const reports = document.querySelector('input[name="reports"]:checked')?.value;
    const tools = document.querySelector('input[name="tools"]:checked')?.value;

    // Check if all questions are answered
    if (!userType || !investment || !reports || !tools) {
        alert("Please answer all questions!");
        return;
    }

    // Save the responses to local storage
    const responses = { userType, investment, reports, tools };
    localStorage.setItem('quizResponses', JSON.stringify(responses));

    // Get the result message
    const resultMessage = recommendPlan(responses);

    // Display the result with a reset button
    quizResult.innerHTML = `
        <h3>Your Recommended Plan:</h3>
        <p>${resultMessage}</p>
        <button id="reset-quiz-btn" class="reset-btn">Take Quiz Again</button>
    `;
    quizResult.style.display = 'block';

    // Add event listener to reset button
    const resetBtn = document.getElementById('reset-quiz-btn');
    resetBtn.addEventListener('click', resetQuiz);
});

// Check for saved responses on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedResponses = JSON.parse(localStorage.getItem('quizResponses'));
    if (savedResponses) {
        // If there are saved responses, pre-select the radio buttons
        document.querySelector(`input[name="userType"][value="${savedResponses.userType}"]`).checked = true;
        document.querySelector(`input[name="investment"][value="${savedResponses.investment}"]`).checked = true;
        document.querySelector(`input[name="reports"][value="${savedResponses.reports}"]`).checked = true;
        document.querySelector(`input[name="tools"][value="${savedResponses.tools}"]`).checked = true;
    }
});