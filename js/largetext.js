const alltext = document.querySelector('.regexp');
document.getElementById('reg').addEventListener('click', () => alltext.innerHTML = alltext.textContent.replace(/\B'/g, '"'));