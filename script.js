let title =document.getElementById('title')
let price =document.getElementById('price')
let taxes =document.getElementById('taxes')
let ads =document.getElementById('ads')
let discount =document.getElementById('discount')
let total =document.getElementById('total')
let count =document.getElementById('count')
let category =document.getElementById('category')
let submit =document.getElementById('submit')

let mode='create'
let tmp // global

// console.log(title,price,taxes,ads,discount,total,count,category,submit);
// get total
function getTotal(){
    if (price.value!=''){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value
        total.innerHTML=result
        total.style.background='#040'
    }else{
        total.innerHTML=''
        total.style.background='#a00d02'
    }
}

// create product
// save data to local storage
let dataProd
if(localStorage.product!=null){
    dataProd=JSON.parse(localStorage.product)
}else{
    dataProd=[]
}

submit.onclick=function(){
    let newProd={
        title:title.value.toLowerCase() ,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase() ,
    } 
    if(title.value!='' && price.value!='' && category.value!=''
    && newProd.count<100){
    if(mode==='create'){
        if(newProd.count>=1){
            for (let i = 0; i < newProd.count; i++) {
                dataProd.push(newProd)
                
            }
        }
        else{
            dataProd.push(newProd)
        }
        clearData()
    }else{
        dataProd[tmp]=newProd
        mode='create'
        submit.innerHTML='Create'
        count.style.display='block'
    }
    }
   

    // save to localstorage
    localStorage.setItem('product',JSON.stringify(dataProd))
    
    showData()
}


// clear data after submit

function clearData(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
}


// read data (show data)
function showData(){
    getTotal()
    let table=''
    for (let i = 0; i < dataProd.length; i++) {
        table+=`
        <tr>
        <td>${i+1}</td>
        <td>${dataProd[i].title}</td>
        <td>${dataProd[i].price}</td>
        <td>${dataProd[i].taxes}</td>
        <td>${dataProd[i].ads}</td>
        <td>${dataProd[i].discount}</td>
        <td>${dataProd[i].total}</td>
        <td>${dataProd[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table
    let btnDelete=document.getElementById('deleteAll')
    if(dataProd.length>0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()" >Delete All(${dataProd.length})</button>
        `
    }else{
        btnDelete.innerHTML=''
    }

}
// deleteALL
function deleteAll() {
    localStorage.clear()
    dataProd.splice(0)
    showData()
    
}
showData()
// delete
function deleteData(id){

    dataProd.splice(id,1)
    localStorage.product=JSON.stringify(dataProd)
    showData()

}


// create product by count (modify create function)


// update
function updateData(id) {
    title.value=dataProd[id].title
    price.value=dataProd[id].price
    taxes.value=dataProd[id].taxes
    ads.value=dataProd[id].ads
    discount.value=dataProd[id].discount
    category.value=dataProd[id].category
    getTotal()
    count.style.display='none'
    submit.innerHTML='Update'
    mode='update'
    tmp=id
    scroll({
        top:0,
        behavior:"smooth",
    
    })
    
    
}

// search by title or category
let searchMood='title' // or ''
function getSearchMood(id) { // get id from html code this.id
    let searchZone=document.getElementById('search')
    if(id=='searchTitle'){
    searchMood='title'
    searchZone.placeholder='Search By Title'    
}else{
    searchMood='category'
    searchZone.placeholder='Search By Category'
}
searchZone.focus()
searchZone.value=''
showData()
}

// search Function 
function searchData(value) 
{
    let table=''
    if (searchMood=='title') {
        for (let i = 0; i < dataProd.length; i++) {
            if (dataProd[i].title.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${dataProd[i].title}</td>
                <td>${dataProd[i].price}</td>
                <td>${dataProd[i].taxes}</td>
                <td>${dataProd[i].ads}</td>
                <td>${dataProd[i].discount}</td>
                <td>${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
                `
            }
        }
        
    }else{
        for (let i = 0; i < dataProd.length; i++) {
            if (dataProd[i].category.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i}</td>
                <td>${dataProd[i].title}</td>
                <td>${dataProd[i].price}</td>
                <td>${dataProd[i].taxes}</td>
                <td>${dataProd[i].ads}</td>
                <td>${dataProd[i].discount}</td>
                <td>${dataProd[i].total}</td>
                <td>${dataProd[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
                `
            }
        }

    }
    document.getElementById('tbody').innerHTML=table
}
//clean data (verefication)
