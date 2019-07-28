$(".slider").slick({

    // normal options...
    infinite: true,
    dots: true,
    speed: 500,
    fade: true,
    arrows: true,
    swipe: true,
    touchMove: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,

    // the magic
    responsive: [{
        breakpoint: 300,
        settings: {
            slidesToShow: 1,
        }
    }]
});
let cards = [];
for (let i = 0; i < 5; i++) {
    const card = new Card({
        container: document.querySelector(`#interactive_block_${i + 1}`),
        itemCount: 20,
    });
    card.build();
    cards.push(card);
}
document.querySelector('.wrapper_interactive__block').addEventListener('click', function (e) {
    const invalid = cards.some((c) => {
        return !c.isValid
    });
    if (invalid) {
        document.querySelector('.button_submit').disabled = true
    }
    else {
        document.querySelector('.button_submit').disabled = false
    }
});

document.querySelector('.button_submit').addEventListener('click', function (e) {

    const validNumbers = generateNumbers();
    let totalScore = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const numbers = validNumbers[i];

        totalScore += card.validateNumbers(numbers);
    }

    alert(`Total score: ${totalScore}`);
    e.target.classList.add('invisible');
    document.querySelector('.button_refresh').classList.remove('invisible');


});
document.querySelector('.button_refresh').addEventListener('click', function (e) {
    e.target.classList.add('invisible');
    cards.forEach(c => c.rebuild());
    document.querySelector('.button_submit').classList.remove('invisible')
});

function generateNumbers() {
    const arrayRandomNumber = [];
    for (var j = 0; j < 5; j++) {

        let randomNumbers = [];
        for (let i = 0; i < 5; i++) {
            randomNumbers.push(Math.floor(Math.random() * (20 - 1) + 1))

        }
        arrayRandomNumber.push(randomNumbers);
    }

    return arrayRandomNumber;

}