console.log("start");
const likedButton = document.querySelector('#likedButton');
console.log(likedButton)
let liked = false;

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

likedButton.addEventListener("click", likedFunction);
