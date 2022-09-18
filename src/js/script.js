const navToggleBtn = document.getElementById("navToggleBtn");
navToggleBtn.addEventListener("click", toggleNavMenu);

function toggleNavMenu(event) {
	const { currentTarget } = event;
	const isMenuExpanded = JSON.parse(currentTarget.getAttribute("aria-expanded"));

	currentTarget.setAttribute("aria-expanded", !isMenuExpanded);
}
