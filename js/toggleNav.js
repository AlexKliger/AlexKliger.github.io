const header = document.querySelector('header')
const toggleBtns = document.querySelectorAll('.toggle-nav-btn')
for (var btn of toggleBtns) {
    btn.addEventListener('click', toggleNav)
}

function toggleNav() {
    if (header.classList.contains('hidden-nav')) header.classList.remove('hidden-nav')
    else header.classList.add('hidden-nav')
}