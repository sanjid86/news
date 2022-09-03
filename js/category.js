const loadCategory =async() =>{
    const url ="https://openapi.programming-hero.com/api/news/categories"
   try{
    const res =await fetch (url)
    const data = await res.json()
    displayCategory(data.data.news_category)
   }
   catch(error){
    console.log(error);
   }   
}


const displayCategory= async(catagories)=>{
    const categoryContainer =document.getElementById('category-container');
    catagories.forEach(category => {
        const {category_name,category_id} =category;
        const categoriesDiv =document.createElement('li');
        categoriesDiv.classList.add("font-semibold");
        categoriesDiv.innerHTML=`
        <a onclick="loadNews(${category_id})">${category_name}</a>
        `;
        categoryContainer.appendChild(categoriesDiv)
        
    });
}

// card container for category news
const loadNews =async(id) =>{
    const spinnerContainer = document.getElementById('spinner');
    spinnerContainer.style.display = 'block';
    // console.log(spinnerContainer,'block');
    const url =`https://openapi.programming-hero.com/api/news/category/0${id}`
         const res =await fetch (url)
         const data = await res.json()
         console.log(data)
         let totalData;
         if(data.data.length>0){
             totalData =`${data.data.length}data found on this category`
         }
         setTimeout(() => {        
         if(data.data.length===0){
            const spinnerContainer = document.getElementById('spinner');
            spinnerContainer.style.display = 'block';

            const cardContainer = document.getElementById('card-container');
            cardContainer.textContent ="";
            spinnerContainer.style.display = 'none';

            const addText = document.getElementById('founded-items');
            addText.innerText = 'No data found on this category';
         }
         else{
            const addText = document.getElementById('founded-items');
            addText.innerText = totalData;
            const newsCategory = data.data;
            const categorySort = newsCategory.sort((a,b)=>b.total_view - a.total_view);
            displayNews(categorySort) 
            spinnerContainer.style.display = 'none';
         }
         
    }, 500);
   
}

const displayNews =(newses) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent =""
    // founded news_category
    const foundedNews = document.getElementById('news-founded');
    foundedNews.classList.remove('hidden')
   
    newses.forEach(news => {
        
        const {image_url,thumbnail_url,title,details,author,total_view,} = news;
        const {name,published_date,img} =author;

        const newsContainerDiv =document.createElement("div");


        newsContainerDiv.classList.add("card", "lg:card-side", "bg-base-100", "shadow-xl", "lg:p-4", "mb-5" ,"w-11/12","lg:w-full","mx-auto")
        newsContainerDiv.innerHTML =`
                    <figure class="lg:w-1/4"><img src="${thumbnail_url}" alt="Movie"></figure>
                    <div class="card-body lg:w-3/4">
                      <h2 class="card-title">${title}</h2>
                      <p>${details.length > 200 ? details.slice(0,200) + " ....." : details}</p>
                      <div class="card-actions justify-between items-center">                   
                        <div class="flex">
                            <div class="mr-3">
                                <img class="w-[40px] rounded-full" src="${img ? img : "img not found"}" alt="">
                            </div>
                            <div >
                                <h4 class="font-bold text-xl">${name ? name : "name not found"}</h4>
                            <h5>${published_date ? published_date : "published date not found"}</h5>
                            </div>
                        </div>
                
                        <div class="flex" >
                           <div>
                            <img src="img/icons8-eye-24.png" alt="">
                           </div>
                                <div class="flex ml-3 items-center">
                                    <h1><i class="fa-regular fa-eye"></i><span>${total_view ? total_view : "no views"}</span> M</h1> 
                                </div>                                                      
                        </div>

                         <div class="text-yellow-500">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                         </div>

                         <div class="card-actions justify-end">
                         <label for="my-modal-4" class="btn btn-primary modal-button" onclick="displayModal('${news.author.img}', '${news.author.name}', '${news.author.published_date}')">Details</label>
                       </div>
                                        
                      </div>
                    </div>
                  
        `
        cardContainer.appendChild(newsContainerDiv)
        
    });
}

const displayModal =(image,name,published) =>{
    
    
    const modalContainer = document.getElementById('modal-container');
    modalContainer.textContent = "";
    modalContainer.innerHTML =`
    <h3 class="text-3xl mb-3">Author Name :${name? name : "name not found"}</h3>
    <h4 class="text-1xl mb-3">published date :${published? published : 'published date not found'}</h4>
    <img src="${image ? image : 'image not found'}"/>
    
    `;
}

loadCategory();