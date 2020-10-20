const searchForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const elementSearch = searchElement.value

    messageOne.textContent = 'Loading. . .'
    messageTwo.textContent = ''

    fetch('/weather?address=' + elementSearch).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error

            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})