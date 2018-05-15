

// back-to-top dugme
$(".back-to-top").click(function () {
  $("html, body").animate({
    scrollTop: 0
  }, 1000);
});

//contact-opacity
$(document).ready(function () {
  $('.contact-opacity').click(function () {
    $(this).fadeOut(600);
  })
});

var fromTop;
var scrollTop = $('.back-to-top');
$(window).on('scroll', function () {
  fromTop = $(window).scrollTop();
  if (fromTop > 600) {
    scrollTop.addClass('block');
  } else {
    scrollTop.removeClass('block');
  }
});



//code for articles
let template = document.querySelector('#template').innerHTML,
  productRow = document.querySelector('#product-row'),
  allBtn = document.querySelectorAll('.button'),
  allSpans = document.querySelectorAll('.text'),
  productArticles = document.querySelectorAll('.prod'),
  femaleCol = document.querySelector('#female-btn'),
  maleCol = document.querySelector('#male-btn'),
  newCol = document.querySelector('#new-colection'),
  popular = document.querySelector('#popular'),
  smallNav = document.querySelectorAll('.sm-nav'),
  logo = document.querySelector('.logo'),
  action = document.querySelector('#action');

//saving process before you leave the page
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
  console.log(num);
  
})



// starting function for index articles
function start() {
  $.ajax({
    url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
    type: 'get',
    dataType: 'json',
  })
    .done(function (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].number = i;
      }
      articlesTemplate(data);
      for (let i = 0; i < allBtn.length; i++) {
        const element = allBtn[i];
        element.addEventListener('click', function (e) {
          e.preventDefault();
          filterData(data, this);
        })
      }
      setIds();
      addToStorage(data);

    });
}

start();

// function with filtered data
function filterData(data, clicked) {
  if (clicked.children[1] == allSpans[0]) {
    let femaleColection = data.filter(function (el) {
      return el.colection == "female";

    });
    removeClass(femaleCol);
    articlesTemplate(femaleColection);
    addToStorage(data)
  } else if (clicked.children[1] == allSpans[1]) {
    let maleColection = data.filter(function (el) {
      return el.colection == "male";
    });
    removeClass(maleCol);
    articlesTemplate(maleColection);
    addToStorage(data,femaleColection)
  } else if (clicked.children[0] == allSpans[2].children[0]) {
    let newColect = data.filter(function (el) {
      return el.newCol
    });
    removeClass(newCol);
    articlesTemplate(newColect);
    addToStorage(data,newColect)
  } else if (clicked.children[0] == allSpans[3].children[0]) {
    let pop = data.filter(function (el) {
      return el.popular
    });
    removeClass(popular);
    articlesTemplate(pop);
    addToStorage(data)
  } else if (clicked.children[0] == allSpans[4].children[0]) {
    let actionCol = data.filter(function (el) {
      return el.action
    });
    removeClass(action);
    articlesTemplate(actionCol);
    addToStorage(data)
  }
}



//removing active class
function removeClass(element) {
  popular.classList.remove("active");
  newCol.classList.remove("active");
  action.classList.remove("active");
  element.classList.add("active");
}



//grid for articles
function articlesTemplate(colection) {
  db = [];
  lastColection = [];
  let text = "";
  productRow.innerHTML = text;
  colection.forEach(el => {
    let imgSrc = new RegExp('{{imgSrc}}', 'gi');
    text = template.replace(imgSrc, el.imgSrc)
      .replace("{{number}}", el.number)
      .replace("{{productTitle}}", el.productTitle)
      .replace("{{model}}", el.model)
      .replace("{{price}}", el.price);
    for (let i = 0; i < el.colors.length; i++) {
      text = text.replace('{{colors}}', el.colors[i]);
    };
    productRow.innerHTML += text;
  });

};


// memory
function save() {
  localStorage.db = JSON.stringify(db);
  localStorage.lastColection = JSON.stringify(lastColection);
}

//adding to memory
function addToStorage(data,colection) {
  let allArticles = document.querySelectorAll('.prod');
  for (var i = 0; i < allArticles.length; i++) {
    allArticles[i].addEventListener('click', function () {
      let id = this.getAttribute('id');
      src = data[id].imgSrc;
      console.log(src);
      let item = {
        id: src,
        colect: colection
      };
      db.push(item);
    })
  }
}
//adding Ids to articles
function setIds() {
  let allArticles = document.querySelectorAll('.prod');
  for (var i = 0; i < allArticles.length; i++) {
    allArticles[i].setAttribute('id', i);
  }
}

