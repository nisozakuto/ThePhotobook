console.log("start");
const likedButton = document.querySelectorAll('#likedButton');
const likedStatus = document.querySelectorAll('#likedStatus');
likedStatus.innerText = '';

let liked = false;
for (let i = 0; i < likedButton.length; i++) {
    likedStatus[i].innerText = '';

    likedButton[i].addEventListener('click', function () {
        if (liked == false) {
            likedButton[i].setAttribute('src', '/liked.png')
            likedStatus[i].innerText = 'Liked'
            liked = true;
        }
        else {
            likedButton[i].setAttribute('src', '/notLiked.png')
            likedStatus[i].innerText = ''
            liked = false;
        }
    })

}

function likedFunction() {
    if (liked == false) {
        likedButton.setAttribute('src', '/liked.png')
        console.log(likedButton);
        liked = true;
    }
    else {
        likedButton.setAttribute('src', '/notLiked.png')
        console.log(likedButton);
        liked = false;

    }
}


const categories = ['Holding Hands', 'Wedding', 'People', 'Family', 'Couple', 'Love', 'Dark background', 'Happy birthday', 'Strategy'];
const albumsContainer = document.querySelector('.albums-container');
const col25 = document.querySelector('.col-25');
if (albumsContainer) {
    for (let category of categories) {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        li.innerHTML = '';
        li.innerHTML = '<form method="POST" action="/albums">' +
            '<input class= "add-a-new-album" type = "submit" value = "' + category + '">' +
            '<input type="hidden" name="name" value = "' + category + '">' +
            '</form >';
        ul.appendChild(li);
        col25.appendChild(ul);
    }
}

if (albumsContainer) { likedButton.addEventListener("click", likedFunction); }
