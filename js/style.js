// get total
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads =document.getElementById('ads');
let discuont=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create'
let tmp;











function getTotal(){
    if(price.value!='' ){
       let result = (+price.value + +taxes.value+ +ads.value)- 
       +discuont.value;

       total.innerHTML=result;
       total.style.background = '#040';
    }else{
        total.innerHTML='';
        total.style.background = '#a00d02';
    }
}


//create

if(localStorage.product !=null){
    dataproduct = JSON.parse(localStorage.product);
}
else{
   dataproduct=[];
}



submit.onclick =function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discuont:discuont.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    //count
     

    if(title.value!=''&&price.value!=""&&category.value!=""){
        if(mood==='create'){
            if(newpro.count>1){
                for(let i=0;i<newpro.count;i++){
                    dataproduct.push(newpro);
                }
            
            }else{
                dataproduct.push(newpro);
            }
    
         cleardata()
        }else{
            dataproduct[ tmp ]=newpro
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
        }
    }
   
   
    
    localStorage.setItem('product', JSON.stringify(dataproduct))
    console.log(dataproduct)

   
    showdata();


}

//clear data

function cleardata(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discuont.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}



//read 

function showdata(){
    let table="";
    for(let i=0; i<dataproduct.length;i++){
        table+=
        `
        <tr>
        <td>${i}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxes}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discuont}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td>  <button onclick="updateData(${i})"id="update">update</button></td>
        <td><button  onclick="deletee(${i})" id="delete">delete</button></td>

    </tr>
        `
    }
    document.getElementById('tbody').innerHTML= table;
    let deletT=document.getElementById('deleteAll')
    if(dataproduct.length>0){
       deletT.innerHTML=`<button onclick="deleteAll()" >deleteAll ( ${dataproduct.length} )</button>`
    }else{
        deletT.innerHTML="";
    }
    getTotal()

}
showdata()

//delete

function deletee(i){
    dataproduct.splice(i,1)
    localStorage.product=JSON.stringify(dataproduct)
    showdata()
}



// delete All

function deleteAll(){
    dataproduct.splice(0)
    localStorage.clear()
    showdata()
}









//update 
 function updateData(i){
    title.value=dataproduct[i].title
    price.value=dataproduct[i].price
    taxes.value=dataproduct[i].taxes
    ads.value=dataproduct[i].ads
    discuont.value=dataproduct[i].discuont
    category.value=dataproduct[i].category
    getTotal()
    count.style.display="none";
    submit.innerHTML='update';
    mood='update';
    tmp=i
    showdata();
    scroll({
        top:0,
     

    })
 }



 //search

 let searchMood='title';
 function getsearchMood(id){
    let search=document.getElementById('search');
    
    
    if(id=='searchTitle'){
       searchMood='title';
       search.Placeholder="Search By title";
    }else{
       searchMood='category'
       search.Placeholder="Search By category";
    }
search.focus();
search.value='';
showdata();
   
 }


 function  searchData(value){
    let table="";
  if(searchMood=='title'){
     for(let i=0; i<dataproduct.length;i++){
       if(dataproduct[i].title.includes(value.toLowerCase())){
        table+=
        `
        <tr>
        <td>${i}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxes}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discuont}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td>  <button onclick="updateData(${i})"id="update">update</button></td>
        <td><button  onclick="deletee(${i})" id="delete">delete</button></td>

    </tr>
        `
       }
     }




  }


  
  
  else{

    for(let i=0; i<dataproduct.length;i++){
        if(dataproduct[i].category.includes(value.toLowerCase())){
         table+=
         `
         <tr>
         <td>${i}</td>
         <td>${dataproduct[i].title}</td>
         <td>${dataproduct[i].price}</td>
         <td>${dataproduct[i].taxes}</td>
         <td>${dataproduct[i].ads}</td>
         <td>${dataproduct[i].discuont}</td>
         <td>${dataproduct[i].total}</td>
         <td>${dataproduct[i].category}</td>
         <td>  <button onclick="updateData(${i})"id="update">update</button></td>
         <td><button  onclick="deletee(${i})" id="delete">delete</button></td>
 
     </tr>
         `
        }
      }
 

  }


  document.getElementById('tbody').innerHTML= table;
 }




