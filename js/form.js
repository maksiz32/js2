document.querySelector('button[name="btnForm"]').addEventListener('click', (el) => {
    const name = document.querySelector('input[name="name"]');
    const phone = document.querySelector('input[name="phone"]');
    const mail = document.querySelector('input[name="mail"]');
    const textBlock = document.querySelector('input[name="textBlock"]');
    document.querySelectorAll('span').forEach((elem) => {
        elem.innerText = '';
    });
    [name, phone, mail, textBlock].forEach(el => el.classList.remove('red'));
    if(!/^[a-zа-я\s]+$/i.test(name.value)) {
        el.preventDefault();
        name.classList.add('red');
        document.getElementById('name').insertAdjacentText('afterbegin', 'Можно использовать только русские и латинские символы и пробелы');
        boleanT = false;
    }
    if(!/^(\+7|8)\d{10}/.test(phone.value)) {
        el.preventDefault();
        phone.classList.add('red');
        document.getElementById('phone').insertAdjacentText('afterbegin', 'Телефон в формате +70000000000 или 80000000000');
        boleanT = false;
    }
    if(!/^[a-z0-9\._-]+@[a-z0-9_-]+\.[a-z]{2,4}$/.test(mail.value)) {
        el.preventDefault();
        mail.classList.add('red');
        document.getElementById('mail').insertAdjacentText('afterbegin', 'Введите корректный email');
        boleanT = false;
    }
    if(!/[a-zа-я\s]+$/.test(textBlock.value)){
        el.preventDefault();
        textBlock.classList.add('red');
        document.getElementById('textBlock').insertAdjacentText('afterbegin', 'Никаких цифр! Только текст');
        boleanT = false;
    }
})
