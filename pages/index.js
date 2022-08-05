const content = document.querySelector(".content");
const profile = document.querySelector(".profile");
const profileContainer = document.querySelector(".profile-container");
const profileEdit = document.querySelector(".profile__pencil");
const profileAddButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".elements");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupTypeAddCard = document.querySelector(".popup_type_add-card");
const popupTypeViewImage = document.querySelector(".popup_type_view-image");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const elementTemplate = document.querySelector('#element-template').content;
const popupTypeViewImageCloseIcon = popupTypeViewImage.querySelector('.popup__close-icon');
const popupTypeProfileCloseIcon = popupTypeProfile.querySelector('.popup__close-icon');
const popupTypeAddCardCloseIcon = popupTypeAddCard.querySelector('.popup__close-icon');
const popupTypeProfileSaveButton = popupTypeProfile.querySelector(".popup__button-save");;
const popupTypeAddCardSaveButton = popupTypeAddCard.querySelector(".popup__button-save");
const popupTypeViewImageSaveButton = popupTypeViewImage.querySelector(".popup__button-save");
const popupTypeAddCardHeader = popupTypeAddCard.querySelector(".popup__header");
const popupTypeAddCardInputName = popupTypeAddCard.querySelector(".popup__name");
const popupTypeAddCardInputDescription = popupTypeAddCard.querySelector(".popup__description");
const popupTypeProfileHeader = popupTypeProfile.querySelector(".popup__header");
const popupTypeProfileInputName = popupTypeProfile.querySelector(".popup__name");
const popupTypeProfileInputDescription = popupTypeProfile.querySelector(".popup__description");
const popupTypeViewImageElementImage = popupTypeViewImage.querySelector(".popup__image");
const popupTypeViewImageElemenImageCaption = popupTypeViewImage.querySelector(".popup__image-caption");
const elementFromTemplate = elementTemplate.querySelector('.element');


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
    evt.target.closest(".element").remove();
};

function creatCard(name, link) {
    const element = addCard(name, link);
    cardsContainer.prepend(element);
};

function renderCard(name, link) {
    const element = addCard(name, link);
    cardsContainer.append(element);
};

function addCard(name, link) {
    const element = elementFromTemplate.cloneNode(true);
    const image = element.querySelector('.element__image-main');
    image.setAttribute("src", link);
    image.setAttribute("alt", name);
    element.querySelector('.element__caption').textContent = name;
    element.querySelector('.element__like').addEventListener('click', setLike);
    image.addEventListener('click', viewPicture);
    element.querySelector(".element__urn2").addEventListener('click', eraseCard);
    return element;
}

function setLike(evt) {
    evt.target.classList.toggle('element__like_active');
}

function viewPicture(evt) {
    const elementCaption = evt.target.alt;
    popupTypeViewImageElementImage.setAttribute("src", evt.target.src);
    popupTypeViewImageElementImage.setAttribute("alt", elementCaption);
    popupTypeViewImageElemenImageCaption.textContent = elementCaption;
    openPopup(popupTypeViewImage);
};

function popupProfileSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupTypeProfileInputName.value;
    profileDescription.textContent = popupTypeProfileInputDescription.value;
    closePopup(popupTypeProfile);
};


function popupAddCardSubmitHandler(evt) {
    evt.preventDefault();
    creatCard(popupTypeAddCardInputName.value, popupTypeAddCardInputDescription.value);
    closePopup(popupTypeAddCard);
};

profileAddButton.addEventListener('click', function() {
    openPopup(popupTypeAddCard);
});

profileEdit.addEventListener('click', function() {
    openPopup(popupTypeProfile);
    popupTypeProfileInputName.value = profileName.textContent;
    popupTypeProfileInputDescription.value = profileDescription.textContent;

});

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopupOnClickCross(evt) {
    evt.target.closest(".popup").classList.remove('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

popupTypeProfile.addEventListener('submit', popupProfileSubmitHandler);
popupTypeProfileCloseIcon.addEventListener('click', closePopupOnClickCross);
popupTypeAddCard.addEventListener('submit', popupAddCardSubmitHandler);
popupTypeAddCardCloseIcon.addEventListener('click', closePopupOnClickCross);
popupTypeViewImageCloseIcon.addEventListener('click', closePopupOnClickCross);

initialCards.forEach(function(elem) {
    renderCard(elem.name, elem.link);
});