const button1 = document.querySelector('.search')
const button2 = document.querySelector('.favorite')


button1.addEventListener('click', function () {
    window.location.href = '/search.html'
})

button2.addEventListener('click', function(){
    window.location.href = '/favorites.html'
})

