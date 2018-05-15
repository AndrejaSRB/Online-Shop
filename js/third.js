console.log(brands);

let brandsTemplate = document.querySelector('#brands-template').innerHTML;
let divBrands = document.querySelector('.brands-holder');
let brandBtns = document.querySelectorAll('.brandBtn');
let allbtn = document.querySelector('#all');
let lifestyleBtn = document.querySelector('#lifestyle');
let sportBtn = document.querySelector('#sportBtn');
let underwearBtn = document.querySelector('#underwear');
let makeUpBtn = document.querySelector('#makeUp');


//removing active class
function removeClass(element) {
    allbtn.classList.remove("active");
    lifestyleBtn.classList.remove("active");
    sportBtn.classList.remove("active");
    underwearBtn.classList.remove("active");
    makeUpBtn.classList.remove("active");
    element.classList.add("active");
  }

for (let i = 0; i < brandBtns.length; i++) {
    brandBtns[i].addEventListener('click', function (e) {
        e.preventDefault();
        let self = this;
        filteredBrands(self);
    })

}


function filteredBrands(self) {
    if (self.children[0].innerHTML == "All") {
        bTemplate(brands)
        
    }
    if (self.children[0].innerHTML == "Lifestyle") {
        let lifestyle = brands.filter(function (el) {
            return el.category == "lifestyle";
        })
        bTemplate(lifestyle);

    }
    if (self.children[0].innerHTML == "Sport") {
        let sport = brands.filter(function (el) {
            return el.category == "sport";
        })
        bTemplate(sport);

    }
    if (self.children[0].innerHTML == "Underwear") {
        let underwear = brands.filter(function (el) {
            return el.category == "underwear";
        })
        bTemplate(underwear);

    }
    if (self.children[0].innerHTML == "Make-up") {
        let makeUp = brands.filter(function (el) {
            return el.category == "make-up";
        })
        bTemplate(makeUp);
    }
}

function bTemplate(colection) {
    let text = "";
    divBrands.innerHTML = text;
    colection.forEach(el => {
        let title = new RegExp('{{title}}', 'gi');
        text = brandsTemplate.replace(title, el.title)
            .replace(title, el.number)
        divBrands.innerHTML += text;
        
    });
};

bTemplate(brands);
