const navToggleBtn = document.getElementById("navToggleBtn");
const defaultModal = document.getElementById("defaultModal");
const successModal = document.getElementById("successModal");
const defaultModalCloseBtn = document.querySelector(".modal__close-btn--default");
const successModalCloseBtn = document.querySelector(".modal__close-btn--success");
const buttons = document.querySelectorAll(".btn:not(.btn--submit)");
const submitBtns = document.querySelectorAll(".btn--submit");
const modalCards = document.querySelectorAll(".card--modal");

// Events
navToggleBtn.addEventListener("click", toggleNavMenu);
defaultModalCloseBtn.addEventListener("click", () => closeModal(defaultModal));
successModalCloseBtn.addEventListener("click", () => closeModal(successModal));

modalCards.forEach((card) => card.addEventListener("click", handleModalEvents));
buttons.forEach((button) => button.addEventListener("click", handleButtonClick));
submitBtns.forEach((button) =>
	button.addEventListener("click", () => {
		closeModal(defaultModal);
		displayModal(successModal);
	})
);

// Expands navigation menu open/close (only on small screen sizes)
function toggleNavMenu(event) {
	const { currentTarget } = event;
	const isMenuExpanded = JSON.parse(currentTarget.getAttribute("aria-expanded"));

	currentTarget.setAttribute("aria-expanded", !isMenuExpanded);
}

// Handles button clicks for every button
function handleButtonClick(event) {
	const { currentTarget } = event;
	const isBookMarked = JSON.parse(currentTarget.getAttribute("data-bookmarked"));

	if (currentTarget.classList.contains("btn--bookmark")) {
		currentTarget.setAttribute("data-bookmarked", !isBookMarked);
	} else {
		displayModal(defaultModal);
	}
}

function displayModal(modalEl) {
	modalEl.setAttribute("aria-expanded", true);
	modalEl.setAttribute("aria-hidden", false);
}

function closeModal(modalEl) {
	modalEl.setAttribute("aria-expanded", false);
	modalEl.setAttribute("aria-hidden", true);
}

function handleModalEvents(event) {
	const { currentTarget } = event;
	const cardRadioEl = currentTarget.querySelector(".modal__input");
	const cardFooterEl = currentTarget.querySelector(".card__footer");
	const isChecked = cardRadioEl.checked;
	const pledgeActionEls = document.querySelectorAll(".card--modal .card__footer");

	pledgeActionEls.forEach((pledgeEl) => pledgeEl.classList.remove("active"));

	modalCards.forEach((card) => {
		if (card !== currentTarget) {
			card.setAttribute("data-selected", false);
		}
	});

	if (cardFooterEl && isChecked) {
		currentTarget.setAttribute("data-selected", true);
		cardFooterEl.classList.add("active");
	}
}
