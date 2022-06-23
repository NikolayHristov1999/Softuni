const notificationEl = document.querySelector('.notification');
const output = notificationEl.querySelector('span');

export function notify(message){
    output.textContent = message;
    notificationEl.style.display = 'block';
    setTimeout(() => notificationEl.style.display = 'none', 3000)
}