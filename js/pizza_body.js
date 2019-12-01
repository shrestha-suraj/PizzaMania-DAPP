// if(document.querySelector(`#pizza_home_body[data-key="dominos"]`)){
//     console.log("Dominos");
//     const test=document.querySelector(`#pizza_home_body[data-key="dominos"]`);
//     var myval = test.getAttribute("data-key");     //returns "10"
// }
loadMenuJSON(function (response){
    const pageLoading=document.querySelector("#pizza_home_body").getAttribute("data-key");
    const menu_items=JSON.parse(response)[pageLoading];
    console.log(menu_items);
    let allCards="";
    menu_items.forEach(item=>{
        allCards+=`<div class="col-xs-12 col-sm-8 col-md-4 col-lg-4 mb-5">
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front" style="width:100%;height:100%;">
                                    <img src="${item.pizzaurl}" alt="Avatar">
                                </div>
                                <div class="flip-card-back">
                                    <h1 class="text-primary">${item.title}</h1> 
                                    <p class="text-center">${item.description}</p> 
                                    <button class="btn btn-success w-50">Add To Cart</button>
                                </div>
                            </div>
                        </div> 
                    </div>`;
    });

    document.querySelector("#pizza_home_body").innerHTML=allCards;



});
