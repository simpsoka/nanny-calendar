document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('my-button');
    button.addEventListener('click', () => {
        localStorage.setItem('newItem', 'A new item');
        window.location.reload();
    });

    const newItem = localStorage.getItem('newItem');
    if (newItem) {
        const list = document.getElementById('my-list');
        const li = document.createElement('li');
        li.textContent = newItem;
        list.appendChild(li);
        localStorage.removeItem('newItem');
    }
});
