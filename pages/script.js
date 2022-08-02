const content = document.querySelector(".content");
const profile = document.querySelector(".profile");
const profileContainer = document.querySelector(".profile-container");
const elements = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const profilePencil = document.querySelector(".profile__pencil");
const popup = document.querySelector('.popup');
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupTypeInput = document.querySelector(".popup_type_input");
const popupTypeImage = document.querySelector(".popup_type_image");
const nameInput = popupTypeInput.querySelector(".popup__name");
const descriptionInput = popupTypeInput.querySelector(".popup__description");
const popupButtonSave = popupTypeInput.querySelector(".popup__button-save");
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function eraseCard(evt) {

    evt.target.parentNode.parentNode.remove();

};

function AddCard(name, link, flag) {
    const elementTemplate = document.querySelector('#element-template').content;
    const Element = elementTemplate.querySelector('.element').cloneNode(true);
    const Image = Element.querySelector('.element__image-main');
    Image.setAttribute("src", link);
    Element.querySelector('.element__caption').textContent = name;
    Element.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    Image.addEventListener('click', viewPicture);
    Element.querySelector(".element__urn2").addEventListener('click', eraseCard);

    if (flag) {
        elements.append(Element);
    } else { elements.prepend(Element); };
};


function viewPicture(evt) {
    const popupImage = popupTypeImage.querySelector(".popup__image");
    const popupImageCaption = popupTypeImage.querySelector(".popup__image-caption");
    const closeIcon = popupTypeImage.querySelector('.popup__close-icon');
    popupTypeImage.classList.remove('popup_closed');
    popupTypeImage.classList.remove('popup_opened');
    popupTypeInput.classList.remove('popup_closed');
    popupTypeInput.classList.remove('popup_opened');
    popupTypeImage.classList.add('popup_opened');
    popupImage.setAttribute("src", evt.target.src);
    popupImageCaption.textContent = evt.target.nextSibling.nextSibling.firstElementChild.innerText;
    closeIcon.addEventListener('click', closeImage);
};


initialCards.forEach(function(elem) {
    AddCard(elem.name, elem.link, true);
});


function formSubmitHandler(evt) {
    evt.preventDefault();
    if (nameInput.value == "" || descriptionInput.value == "") {
        alert('Поля формы не заполнены!');
    } else {
        if (popupTypeInput.querySelector(".popup__header").textContent == "Редактировать профиль") {
            profileName.textContent = nameInput.value;
            profileDescription.textContent = descriptionInput.value;
        } else {
            AddCard(nameInput.value, descriptionInput.value, false);
        };

        popupTypeInput.classList.add('popup_closed');
    };
};


addButton.addEventListener('click', function() {
    const closeIcon = popupTypeInput.querySelector('.popup__close-icon');
    popupTypeInput.classList.remove('popup_closed');
    popupTypeInput.classList.remove('popup_opened');
    popupTypeInput.classList.add('popup_opened');
    popupTypeInput.querySelector(".popup__header").textContent = "Новое место";
    popupTypeInput.querySelector(".popup__name").setAttribute("placeholder", "Название");
    popupTypeInput.querySelector(".popup__description").setAttribute("placeholder", "Ссылка на картинку");
    nameInput.value = "";
    descriptionInput.value = "";
    popupButtonSave.addEventListener('submit', formSubmitHandler);
    closeIcon.addEventListener('click', closeInput);
});

profilePencil.addEventListener('click', function() {
    const closeIcon = popupTypeInput.querySelector('.popup__close-icon');
    popupTypeInput.classList.remove('popup_closed');
    popupTypeInput.classList.remove('popup_opened');
    popupTypeInput.classList.add('popup_opened');
    popupTypeInput.querySelector(".popup__header").textContent = "Редактировать профиль";
    popupTypeInput.querySelector(".popup__name").setAttribute("placeholder", "");
    popupTypeInput.querySelector(".popup__description").setAttribute("placeholder", "");
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popupButtonSave.addEventListener('submit', formSubmitHandler);
    closeIcon.addEventListener('click', closeInput);
});

function closeInput() {
    popupTypeInput.classList.add('popup_closed');
}

function closeImage() {
    popupTypeImage.classList.add('popup_closed');
}


popup.addEventListener('submit', formSubmitHandler);