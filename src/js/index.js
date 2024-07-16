/// <reference types="../../@types/jquery"/>


// --------------------------- Aside Bar ------------------


let divLoding=$('.divLoding');

let bars=$('.bars');
let xmark=$('.xmark');
let aside=$('aside');
bars.on('click',function(e){
   
    $(aside).toggle({display: 'none'},1);
    $(xmark).toggle({display: 'none'},1);
    $(bars).toggle({display: 'none'},1);
    
})
xmark.on('click',function(e){

    $(aside).toggle({display: 'none'},1);
    $(xmark).toggle({display: 'none'},1);

    $(bars).toggle({display: 'none'},1);
    
})

let Categories=$('.Categories');
let Area=$('.Area');
let Ingredients=$('.Ingredients');
let Contact=$('.Contact');
let Searsh=$('.Searsh');
let row=$('.row');


function hiddenSection(){
    $(aside).toggle({display: 'none'},500);
    $(xmark).toggle({display: 'none'},0);
    $(bars).toggle({display: 'none'},0);
    $(Contact).attr('class','Contact hidden');
    $(Searsh).attr('class','Searsh pt-28 w-full hidden');

}
let divLodingS=$('.divLodingS')
$('ul .searsh').on('click',function(e){


    hiddenSection();
    $(row).html('')
    divLodingS.fadeIn(300);

    $(Searsh).removeClass('hidden');

    divLodingS.fadeOut(300);

})
$('ul .categories').on('click',async function(e){

   hiddenSection();
   $(row).html('')
    divLoding.fadeIn(300);

   await getcategories();
   divLoding.fadeOut(300);
   await  displayCategories();
   



   
})

$('ul .area').on('click',async function(e){
   
    hiddenSection();
    $(row).html('')
    divLoding.fadeIn(300);

    await getArea();
    divLoding.fadeOut(300);
    await displayArea();

})
$('ul .ingredients').on('click',async function(e){

    hiddenSection();
    $(row).html('')
    divLoding.fadeIn(300);

    await getIngredients();
    divLoding.fadeOut(300);
    await displayIngredients();


    
})
$('ul .contact').on('click',function(e){
    
    
    hiddenSection();
    $(row).html('')
    divLoding.fadeIn(300);
    $(Contact).removeClass('hidden');
    divLoding.fadeOut(300);

   
   
})

let data=[];
async function getMeals(link) {
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${link}`);
    response = await response.json();
    data.push(response)
    console.log(data)

    
    
}

let rowSearsh=$('.rowSearsh');
async function display(arr,row){
    let  cartona=``;
    for (let i = 0; i < arr[0].meals.length; i++) {
        
        cartona+=`<div  class="lg:w-1/4 sm:w-6/12  p-4 cursor-pointer">
                
                    <div onclick="strDetails(${arr[0].meals[i].idMeal})" class="inner relative group overflow-hidden">
                    <img class="rounded-xl" src="${arr[0].meals[i].strMealThumb}">
                    <div class="caption rounded-xl font-bold [font-size:30px] w-full h-full bg-[#ffffff94] absolute top-full transition-all duration-500 group-hover:top-0">
                    <h2 class="relative top-1/2 -translate-y-1/2">${arr[0].meals[i].strMeal}</h2>
                    </div>
                    
                    </div>
                    
                    </div>`
                    
                }
                
                $(row).html(cartona);
                data=[];
            }
(async function(){
    $(row).html = "";
    divLoding.fadeIn(300);

    await getMeals('');
    await display(data,row);

    divLoding.fadeOut(300);
               

})();

// --------------------------- Details ------------------

            async function getDetails(idMeal) {
                
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                response = await response.json();
                dataDetails.push(response)
                console.log(dataDetails)
                
                
            }
            let dataDetails=[];
            async function strDetails(id){
            
            $(row).html = "";
            divLoding.fadeIn(300);
            console.log(id)
            await getDetails(id);
            // displayDetails(id);
            await displayDetails(dataDetails[0].meals[0]);
            dataDetails=[];
            
            divLoding.fadeOut(300);
            
            }
            
            
            
            async function displayDetails(meal){
                
    $(Contact).attr('class','Contact hidden');
    $(Searsh).attr('class','Searsh pt-28 w-full hidden');

    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li><span class="bg-green-300 text-sky-950 rounded-lg p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span></li>`
            

        }
    }
    let tags = meal.strTags?.split(",")
    
    if (!tags) tags = [];

    let tagsStr =``;

    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        
        <li class="bg-red-300 text-sky-950 rounded-lg p-2">${tags[i]}</li>`
    }
   
    let cartona=`            <div class="md:w-4/12 sm:w-full p-4">
                <img class="rounded-xl" src="${meal.strMealThumb}" alt="">
                <h2 class="fa-2x font-bold mb-4 text-white">${meal.strMeal}</h2>
            </div>
            <div class="md:w-8/12 sm:w-full text-white p-4">
                <h2 class="fa-2x mt-4 font-bold">Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h2 class="fa-2x font-bold">Area : ${meal.strArea}</h2>
                <h2 class="fa-2x font-bold">Category : ${meal.strCategory}</h2>
                <h2 class="fa-2x font-bold">Recipes :</h2>
                <ul class="ul flex flex-wrap gap-8 pt-4">
                     ${ingredients}
                </ul>
                
                <h2 class="fa-2x font-bold mb-4">Tags :</h2>
                <ul class="ul flex flex-wrap gap-4">
                ${tagsStr}
                </ul>
               <div class="mt-5">
                 <a target="_blank"class="bg-green-500 text-white rounded-lg p-2" href="${meal.strSource}">Surse</a>
                 <a target="_blank"class="bg-red-500 text-white rounded-lg p-2" href="${meal.strYoutube}">Youtuobe</a>
               </div>
               
            </div>`
           
            $(row).html(cartona);
          
          
}

// --------------------------- Categories ------------------



let datacategories=[];
async function getcategories() {
                
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();

    datacategories.push(response)

    displayCategories(response.categories)
}


async function displayCategories(arr){
    
    
    let  cartona=``;
    for (let i = 0; i < arr.length; i++) {
        
        cartona+=`<div class="lg:w-1/4 md:w-4/12 sm:w-6/12 p-4 cursor-pointer">
        
        <div onclick="strCategory('${arr[i].strCategory}')" class="inne relative group overflow-hidden">
        <img class="rounded-xl" src="${arr[i].strCategoryThumb}" alt="">
        <div class="caption rounded-xl text-center  w-full h-full bg-[#ffffff94] absolute top-full transition duration-500 group-hover:top-0 ">
        <h2 class="relative font-bold [font-size:40px]">${arr[i].strCategory}</h2>
        <p>${arr[i].strCategoryDescription}</p>
        </div>
        
        </div>
        
        </div>`
        
    }
    $(".row").html(cartona);

}

let datacat=[];
async function getcat(cat){
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    dataGames = await response.json();

    datacat.push(dataGames)
}

async function strCategory(cat){
    $(row).html = "";
    divLoding.fadeIn(300);
    await getcat(cat);
    await display(datacat,row);
    divLoding.fadeOut(300);
   
}

// --------------------------- Area ------------------

async function getArea(){
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();

    datacat.push(response);

    displayArea(response.meals);
}


async function displayArea(arr){
    let cartona=``;

    for (let i = 0; i < arr.length; i++) {
        cartona+=` <div onclick="displayByArea('${arr[i].strArea}')" class="lg:w-1/4 md:w-4/12 sm:w-6/12 w-full p-4 cursor-pointer">
        <div class="item relative text-white text-center">
        <i class="fa-solid fa-house-laptop fa-4x "></i>
        <h2>${arr[i].strArea}</h2>
        </div>
        </div>`
        
    }

    $(row).html(cartona);
}
async function displayByArea(area){
    $(row).html = "";
    divLoding.fadeIn(300);
    
    let byArea=[];
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    byArea.push(response)

    display(byArea,row);
    divLoding.fadeOut(300);
}

// --------------------------- Ingredients ------------------

async function getIngredients(){

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()

    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
}


async function displayIngredients(arr){

    let cartona=``;

    for (let i = 0; i < arr.length; i++) {
        cartona+=` <div class="lg:w-1/4 md:w-4/12 sm:w-6/12 p-4 cursor-pointer">
                                            <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="IngredientsItem relative text-white text-center">
                                                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                                <h3 class="font-bold fa-2x">${arr[i].strIngredient}</h3>
                                                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                                            </div>
                                        </div>`
        
    }

    $(row).html(cartona);
}

async function getIngredientsMeals(ingredients) {

    $(row).html = "";
    divLoding.fadeIn(300);

    let byin=[];

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    byin.push(response);


    display(byin,row)

    divLoding.fadeOut(300)

} 

// --------------------------- Searsh ------------------

async function byFirstLetterIn(value){
    
    $(row).html ='';
    divLodingS.fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    response = await response.json();
    
    let datas=[];
    datas.push(response);
    divLodingS.fadeOut(50);
    display(datas,rowSearsh);
    
}
async function byNameIn(value){
    
    $(row).html ='';
    divLodingS.fadeIn(300);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    response = await response.json();
    
    let datas=[];
    datas.push(response);
    divLodingS.fadeOut(50);
    display(datas,rowSearsh);
    
}

async function getIngredients(){

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    
    displayIngredients(respone.meals.slice(0, 20))
}

// --------------------------- validation ------------------

function validation(element){
   
    
    let  valedation ={
        NameInput: /^\w{3,25}\s?\w{0,10}\s?$/,
        EmailInput:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ,
        PassInput:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ,
       


    }
    
   
    if(valedation[element.id].test(element.value)){
        
        element.nextElementSibling.classList.add('hidden');
        element.classList.remove('bg-red-500');
        element.classList.add('bg-green-500');
    }
    else{

        element.nextElementSibling.classList.remove('hidden');
        element.classList.remove('bg-green-500');
        element.classList.add('bg-red-500');

    }
   
    chickBtn();


}

let PassInput=document.getElementById('PassInput');
let PassInput_confirmation=document.getElementById('PassInput_confirmation');

function chick(){
   
    if(PassInput.value==PassInput_confirmation.value){

        PassInput_confirmation.nextElementSibling.classList.add('hidden');
        PassInput_confirmation.classList.remove('bg-red-500');
        PassInput_confirmation.classList.add('bg-green-500');
        
    }
    else{
        PassInput_confirmation.nextElementSibling.classList.remove('hidden');
        PassInput_confirmation.classList.remove('bg-green-500');
        PassInput_confirmation.classList.add('bg-red-500');

    }
}

        let NameInput=document.getElementById('NameInput');
        let EmailInput=document.getElementById('EmailInput');
        let btnForm=document.querySelector('.btnForm');
        console.log(btnForm)

function chickBtn(){
    
    if (

        NameInput.classList.contains('bg-green-500') &&
        EmailInput.classList.contains('bg-green-500') &&
        PassInput.classList.contains('bg-green-500')&&
        PassInput_confirmation.classList.contains('bg-green-500')
        
   ) 
   {
       btnForm.removeAttribute("disabled")
      

   }
else {
      btnForm.setAttribute("disabled", true)
     
     }
}