let secondTemplate = document.querySelector('#second-template').innerHTML;
let specialTemplate = document.querySelector('#special-template').innerHTML;
let productDiv = document.querySelector('#product-div');
let specialOfferRow = document.querySelector('#spec-row');
let rand = 0;
let randArray = [];


window.addEventListener('beforeunload', function () {
  save();
})
if (localStorage.db) {
  var db = JSON.parse(localStorage.db)


} else {
  var db = [];
}

//taking from LocalStorage
window.addEventListener('load', function () {
  let n = localStorage.getItem('db');
  let num = JSON.parse(n)
  if (num.length == 1) {
    console.log(num);
    detailed(num)
  } else if (num.length >= 2) {
    let nn = num.length - 1;
    let number = [num[nn]];
    detailed(number)
  }
})




// starting function for detailed articles
function detailed(num) {
  $.ajax({
    url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
    type: 'get',
    dataType: 'json',
  })
    .done(function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].number = i;
      }
      display(data, num);
      displaySpecialOffer(data, num)

    });
}



//function for main article
function display(data, num) {
  let article = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i].imgSrc
    let product = [data[i]]
    if (item == num[0].id) {
      product.forEach(el => {
        let productTlt = new RegExp('{{productTitle}}', 'gi');
        let models = new RegExp('{{model}}', 'gi');
        text = secondTemplate.replace("{{imgSrc}}", el.imgSrc)
          .replace("{{number}}", el.number)
          .replace(productTlt, el.productTitle)
          .replace(models, el.model)
          .replace("{{price}}", el.price);
        for (let i = 0; i < el.colors.length; i++) {
          text = text.replace('{{colors}}', el.colors[i]);
        };
        productDiv.innerHTML += text;
      });
    }
  }
}


//function for special offer articles
function displaySpecialOffer(data, num) {
  let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  for (let i = 0; i < 4; i++) {
    a = Math.floor(Math.random() * random.length);
    let rand = random[a];
    randArray.push(data[random[a]]);
    random.splice(a, 1);
  }

  randArray.forEach(el => {
    let productTlt = new RegExp('{{productTitle}}', 'gi');
    text = specialTemplate.replace("{{imgSrc}}", el.imgSrc)
      .replace("{{number}}", el.number)
      .replace(productTlt, el.productTitle)
      .replace("{{model}}", el.model)
      .replace("{{price}}", el.price);
    specialOfferRow.innerHTML += text;
  });
  addToStorage(data)
}




//adding to memory
function addToStorage(data) {
  let specialArticles = document.querySelectorAll('.spec-articles');
  for (var i = 0; i < specialArticles.length; i++) {
    specialArticles[i].addEventListener('click', function (e) {
      let spec = this.children[0].children[0].children[0];
      let src = spec.getAttribute('src');
      for (let i = 0; i < data.length; i++) {
        let picture = data[i].imgSrc;
        let art = "img/" + picture + ".jpg"
        if (art == src) {
          let article = data[i].imgSrc;

          let item = {
            id: article
          };
          db.push(item);
        }

      }

    })
  }
}
// memory
function save() {
  localStorage.db = JSON.stringify(db)
}