// Mobile Menu Toggle Functionality
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});

// Function to Clone and Move Logos (Ensure this is in the correct place)
const logos = document.querySelector(".rotating-logos__track").cloneNode(true);
document.querySelector(".rotating-logos").appendChild(logos);

// Function to Toggle Between Monthly and Yearly Pricing Plans
function switchPricing() {
    const checkbox = document.getElementById("pricing-toggle-checkbox");
    const monthlyPrices = document.querySelectorAll(".monthly-price");
    const yearlyPrices = document.querySelectorAll(".yearly-price");
    const yearlyDiscount = document.querySelector(".save-percentage");

    if (checkbox.checked) {
        // Show yearly prices and discount, hide monthly prices
        monthlyPrices.forEach((price) => price.classList.add("hidden"));
        yearlyPrices.forEach((price) => price.classList.remove("hidden"));
        yearlyDiscount.style.display = "inline";
    } else {
        // Show monthly prices, hide yearly prices and discount
        monthlyPrices.forEach((price) => price.classList.remove("hidden"));
        yearlyPrices.forEach((price) => price.classList.add("hidden"));
        yearlyDiscount.style.display = "none";
    }
}

// Set Current Year in Footer or Relevant Element
window.addEventListener("load", () => {
    const yearElement = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
});

