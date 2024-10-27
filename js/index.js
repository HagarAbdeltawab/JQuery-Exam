/// <reference types="../@types/jquery/">/>

// Aside Events 

$('#barIcon').on('click', function () {
    $(this).toggleClass('fa-bars fa-x');

    if ($('.left').outerWidth() === 0) {
        $('.left').animate({ width: '250px', paddingLeft: '20px' }, 600);
        $('main').animate({ marginLeft: '315px' }, 500);

        $('.left nav a').hide().each(function (index) {
            $(this).delay(100 * index).fadeIn(300);
        });
    } else {
        $('.left').animate({ width: '0', paddingLeft: '0' }, 500);
        $('main').animate({ marginLeft: '65px' }, 600);
        $('.left nav a').fadeOut(200);
    }
});


$('.left nav a').on('click', function () {
    $('.left').animate({ width: '0', paddingLeft: '0' }, 500);
    $('main').animate({ marginLeft: '65px' }, 600);
    $('.left nav a').fadeOut(200);
    $('#barIcon').toggleClass('fa-bars fa-x');
});




$(window).on('load', async function () {
    await getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
});


$('#searchLink').on('click', function () {
    $('#mainContainer').html('');
    $('.inputSearch').html(`
        <div class="row py-5 justify-content-between align-content-center">
            <div class="col-md-6">
                <input onkeyup="searchByName(event)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(event)" class="form-control bg-transparent text-white" type="text" maxlength='1' placeholder="Search By First Letter">
            </div>
        </div>`);
});


$('#categoryLink').on('click', async function () {
    $('.inputSearch').html('');
    await getCategories();
});


$('#areaLink').on('click', async function () {
    $('.inputSearch').html('');
    await getAreas();
});


$('#ingredientsLink').on('click', async function () {
    $('.inputSearch').html('');
    await getIngredients();
});


$('#contactLink').on('click', function () {
    $('#mainContainer').html('');
    $('.inputSearch').html(`
        <div class="container contact w-75 text-center py-5">
            <div class="row g-4 pt-5">
                <div class="col-md-6 pt-5">
                    <input id="nameInput" oninput="inputsValidation('#nameInput')" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6 pt-5">
                    <input id="emailInput" oninput="inputsValidation('#emailInput')" type="email" class="form-control" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *example@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" oninput="inputsValidation('#phoneInput')" type="text" class="form-control" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" oninput="inputsValidation('#ageInput')" type="number" class="form-control" placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" oninput="inputsValidation('#passwordInput')" type="password" class="form-control" placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" oninput="inputsValidation('#repasswordInput')" type="password" class="form-control" placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    `);
});



// Validation 

const namePattern = /^[A-Za-z\s]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^(?:\+2|002)?\s?01([0-9]{9})$/;
const agePattern = /^(1[0-9]|[1-9]?[1-9])$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function inputsValidation(inputId) {
    const inputValue = $(inputId).val();
    let isValid = true;

    switch (inputId) {
        case '#nameInput':
            if (inputValue && namePattern.test(inputValue)) {
                $('#nameAlert').addClass('d-none');
            } else {
                $('#nameAlert').removeClass('d-none');
                isValid = false;
            }
            break;

        case '#emailInput':
            if (inputValue && emailPattern.test(inputValue)) {
                $('#emailAlert').addClass('d-none');
            } else {
                $('#emailAlert').removeClass('d-none');
                isValid = false;
            }
            break;

        case '#phoneInput':
            if (inputValue && phonePattern.test(inputValue)) {
                $('#phoneAlert').addClass('d-none');
            } else {
                $('#phoneAlert').removeClass('d-none');
                isValid = false;
            }
            break;

        case '#ageInput':
            if (inputValue && agePattern.test(inputValue)) {
                $('#ageAlert').addClass('d-none');
            } else {
                $('#ageAlert').removeClass('d-none');
                isValid = false;
            }
            break;

        case '#passwordInput':
            if (inputValue && passwordPattern.test(inputValue)) {
                $('#passwordAlert').addClass('d-none');
            } else {
                $('#passwordAlert').removeClass('d-none');
                isValid = false;
            }
            break;

        case '#repasswordInput':
            const passwordInput = $('#passwordInput').val();
            if (inputValue && inputValue === passwordInput && inputValue.length > 0) {
                $('#repasswordAlert').addClass('d-none');
            } else {
                $('#repasswordAlert').removeClass('d-none');
                isValid = false;
            }
            break;
    }
    checkFormValidity();
}


function checkFormValidity() {
    const isFormValid =
        namePattern.test($('#nameInput').val()) &&
        emailPattern.test($('#emailInput').val()) &&
        phonePattern.test($('#phoneInput').val()) &&
        agePattern.test($('#ageInput').val()) &&
        passwordPattern.test($('#passwordInput').val()) &&
        $('#repasswordInput').val() === $('#passwordInput').val();

    $('#submitBtn').prop('disabled', !isFormValid);
}


$('#submitBtn').on('click', function () {
    $('#nameInput').val('');
    $('#emailInput').val('');
    $('#phoneInput').val('');
    $('#ageInput').val('');
    $('#passwordInput').val('');
    $('#repasswordInput').val('');
    $('.alert').addClass('d-none');
    $(this).prop('disabled', true);
});



// Api Data

const getData = async (api) => {
    spinner();

    const response = await fetch(api);
    const data = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (data) hideSpinner();
    return data;
};


const spinner = () => $('#mainContainer').html(`
    <div div class= "d-flex justify-content-center align-items-center w-100 vh-100" >
    <span class="loader"></span>
    </div > `);


const hideSpinner = () => $('#mainContainer').html(``);


async function searchByName(event) {
    const name = event.target.value;
    if (!name) return;
    await getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
};


async function searchByLetter(event) {
    const letter = event.target.value[0];
    if (!letter || letter.length > 1) return;
    await getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
};


async function getCategories() {
    let content = '';
    const data = await getData('https://www.themealdb.com/api/json/v1/1/categories.php');
    for (let item of data.categories) {
        content += `
        <div class="col-md-3">
            <div onclick="getMeals('https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.strCategory}');" class="category overflow-hidden position-relative">
                <img class="w-100" src="${item.strCategoryThumb}" alt="${item.strCategory}">
                <div class="content position-absolute">
                    <h4>${item.strCategory}</h4>
                    <p>${item.strCategoryDescription ? item.strCategoryDescription.split(' ').slice(0, 20).join(' ') : ''}</p>
                </div>
            </div>
        </div>`;
    }
    $('#mainContainer').html(content);
};


async function getAreas() {
    let content = '';
    const data = await getData('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    for (let item of data.meals) {
        content += `
        <div class="col-md-3">
            <div onclick="getMeals('https://www.themealdb.com/api/json/v1/1/filter.php?a=${item.strArea}');" class="area text-white text-center overflow-hidden position-relative">
                <i class="fa-solid fa-house-laptop fa-4x"></i> 
                <h3>${item.strArea}</h3> 
            </div>
        </div>`;
    }
    $('#mainContainer').html(content);
};


async function getIngredients() {
    let content = '';
    const data = await getData('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const displayData = data.meals.slice(0, 20);
    for (let item of displayData) {
        content += `
            <div class="col-md-3">
                <div onclick="getMeals('https://www.themealdb.com/api/json/v1/1/filter.php?i=${item.strIngredient}');" class="ingredient text-white text-center overflow-hidden position-relative">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${item.strIngredient}</h3> 
                    <p>${item.strDescription ? item.strDescription.split(' ').slice(0, 20).join(' ') : ''}</p> 
                </div>
            </div>`;
    }
    $('#mainContainer').html(content);
};


async function getMeals(api) {
    let content = '';
    const data = await getData(api);
    const displayData = data.meals.slice(0, 20);
    for (let item of displayData) {
        content += `
        <div div class= "col-md-3" >
        <div onclick="$('.inputSearch').html(''); spinner(); getMealIngredients(${item.idMeal});" class="meal overflow-hidden  position-relative">
            <img class="w-100" src="${item.strMealThumb}" alt="${item.strMeal}">
                <div class="content position-absolute d-flex justify-content-center align-items-center">
                    <h4>${item.strMeal}</h4>
                </div>
        </div>
    </div > `;
    }
    $('#mainContainer').html(content);
};


async function getMealIngredients(id) {
    const data = await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const item = data.meals[0];
    let Recipes = '';
    let tags = '';
    const strTags = `${item.strTags}`;
    for (let i = 1; i <= 20; i++) {
        const ingredient = item[`strIngredient${i}`];
        const measure = item[`strMeasure${i}`];
        if ((ingredient && ingredient.trim() !== '') && (measure && measure.trim() !== '')) {
            Recipes += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
        }
    }
    if (!strTags) {
        strTags.split(',').forEach(tag => {
            tags += `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`;
        });
    }

    let content = `
            <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${item.strMealThumb}" alt="">
                    <h2>${item.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${item.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${item.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${item.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${Recipes}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tags}
                </ul>
                <a target="_blank" href="${item.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${item.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        </div>
        `;

    $('#mainContainer').html(content);
};
