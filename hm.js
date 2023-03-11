var postApi = 'https://jsonplaceholder.typicode.com/todos/1'
const login_btn = document.querySelector('.login_btn');
const register = document.querySelector('.register');
const login = document.querySelector('.login');
const welcome = document.querySelector('.welcome');
const register_btn = document.querySelector('.register_btn');

login_btn.addEventListener('click', () => {
    login.classList.add('active');
    welcome.classList.add('active');
    login_btn.classList.add('active');
    register_btn.classList.add('active');
    register.classList.add('active');
})

register_btn.addEventListener('click', () => {
    login.classList.remove('active');
    welcome.classList.remove('active');
    login_btn.classList.remove('active');
    register_btn.classList.remove('active');
    register.classList.remove('active');
});
function signup(e){
    event.preventDefault();
    //console.Log ('working');

    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;


    var user = {
        email: email,
        username: username,
        password: pass,
    };

    var json = JSON.stringify(user);
localStorage.setItem(username,json);
alert("Đăng Ký Thành Công");
window.location.assign('hm.html')
};


function loginFunc(e){
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var result = document.getElementById('result');

    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    console.log(data);
    

    if(user = null){
        alert("Tên đăng nhập không hợp lệ") ;
    }else if(username ==data.username && pass == data.password){
        alert("Đăng Nhập Thành Công");
        window.location.assign('hm.html')
    }else{
        alert("Sai mật khẩu");
    };
};
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}