let arr = [];

const asideCategoriesSection = document.getElementById(
  "aside-categories-section"
);
const cardSection = document.getElementById("card-section");
let totalAmountValue = document.getElementById("total-amount").innerText;
let totalAmount = document.getElementById("total-amount");
// const cardDivTree=document.getElementById("card-div-tree")

// console.log(arr)
// Loding function
const loading = (isTrue) => {
  if (isTrue === true) {
    document.getElementById("loading").classList.add("hidden");
  }
};

// modal section function
cardSection.addEventListener("click", (e) => {
  if (e.target.tagName === "H1") {
    // e.target.tagName.classList.add("hover:text-orange-200","hover:cursor-pointer")
    const hTagId = e.target.id;
    detailsDataLoad(hTagId);
  }
});

const detailsDataLoad = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => modalDisplay(data.plants));
};

const modalDisplay = (value) => {
  const modalDiv = document.getElementById("modal-div");
  const modalPlaceMentDiv = document.createElement("div");
  modalDiv.innerHTML = "";
  modalPlaceMentDiv.innerHTML = `
<div class="overflow-hidden rounded-lg ">
<h1 id=${value.id} class="tree-name font-bold text-lg mb-2" >${value.name}</h1>
          <img src="${value.image}" alt="Picture" class="h-48 w-full object-cover">
        </div>
        <h1 id=""><span class=" font-bold my-2">Category:</span>${value.category}</h1>
           
        <p ><span class="font-bold text-lg">Price</span>:৳ <span class="price" id="tree-price">${value.price}</span></p>
        <p class="font-bold text-lg">Description:<span class="text-sm font-normal">${value.description}</span></p>
       <div  class="flex justify-between items-center">
     
       </div>

`;
  modalDiv.appendChild(modalPlaceMentDiv);
  document.getElementById("my-modal").showModal();
};

// const modalView=()={

// }

// Total cart section function
cardSection.addEventListener("click", (e) => {
  if (e.target.innerText == "Add to Cart") {
    let treePrice =
      e.target.parentNode.children[3].children[1].children[0].innerText;

    let treeCardID = e.target.parentNode.id;

    let treeCardTreeName = e.target.parentNode.children[1].innerText;
    // console.log(treeCardTreeName);

    // update arr Value
    const treeObj = {
      name: treeCardTreeName,
      id: treeCardID,
      price: treePrice,
    };
    arr.push(treeObj);
    const totalCartSectionDiv = document.getElementById(
      "total-cart-section-div"
    );
    const totalCartSectionInnerDiv = document.createElement("div");

    totalCartSectionInnerDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "w-full",
      "bg-slate-200",
      "p-4",
      "mb-2"
    );
    totalCartSectionInnerDiv.innerHTML = `
           <div>
            <p class="font-bold">${treeCardTreeName}</p> 
            <p>৳ ${treePrice}</p>
          </div>
          <div>
            <button onclick="deleteFunction(${treeCardID})" id="delete-btn" class="hover:cursor-pointer hover:text-red-500">Delete</button>
          </div>`;

    totalCartSectionDiv.appendChild(totalCartSectionInnerDiv);

    const latestAddprice = parseInt(totalAmountValue) + parseInt(treePrice);
    totalAmountValue = latestAddprice;
    totalAmount.innerText = latestAddprice;

    // .childNodes[0].childNodes[1].childNodes[9].innerText
  }
});
// delete function

const deleteFunction = (id) => {
  console.log(id);
  let arr2 = arr.filter((item) => item.id !== id);
  arr = arr2;
  console.log(arr);

  // arr.push(arr2)
};

// Reuseble function

const cardShowingFunction = (treeCardDataForFun) => {
  cardSection.innerHTML = "";

  treeCardDataForFun.forEach((value) => {
    const cardSectionDiv = document.createElement("div");

    cardSectionDiv.innerHTML = `
  <div id="${value.id}" class="space-y-3 bg-white p-5">
        <div class="overflow-hidden rounded-lg ">
          <img src="${value.image}" alt="Picture" class="h-48 w-96 object-cover">
        </div>
        <h1 id=${value.id} class="tree-name inline my-6 font-bold text-lg hover:text-orange-300 hover:cursor-pointer" >${value.name}</h1>
        <p class="text-xs">${value.description}</p>
       <div  class="flex justify-between items-center">
        <button id="" class="btn bg-slate-300 rounded-2xl p-3 ">${value.category}</button>
        <p>৳ <span class="price" id="tree-price">${value.price}</span></p>
       </div>
       <button id=""  class="btn add-to-cart w-full rounded-lg bg-[#15803D]  hover:bg-[#15603D]  hover:cursor-pointer hover:text-white">Add to Cart</button>



       </div>
  
  
  `;

    cardSection.appendChild(cardSectionDiv);
  });
};

//  Left side asid categories showing function

const AllCategoriesDataLoad = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showAllCategories(data.categories))
    .catch((error) => console.log(error));
};

const showAllCategories = (categorie) => {
  // console.log(value)

  categorie.forEach((value) => {
    const allCategories = document.getElementById("all-categories");
    const allCategoriesshowingDiv = document.createElement("div");
    allCategoriesshowingDiv.innerHTML = `<button class="hover:cursor-pointer active:text-green-500" onclick="treeCardLoadFunction(${value.id})" id="catagories-button-id">${value.category_name}</button>`;
    allCategories.appendChild(allCategoriesshowingDiv);
  });
};

// Tree card Load data function
const treeCardLoadFunction = async (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.plants);
  treeCardShowingFunction(data.plants);
};

const treeCardShowingFunction = (treeCardData) => {
  cardShowingFunction(treeCardData);
};

// All card showing function
const allCardShowingFirstLoadingTime = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  cardShowingFunction(data.plants);
};

allCardShowingFirstLoadingTime();

AllCategoriesDataLoad();

loading(true);
