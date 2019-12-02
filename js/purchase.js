function startPurchase(buttonObject){
    const pizzaPlace=buttonObject.getAttribute("data-place");
    const pizzaKey=buttonObject.getAttribute("data-key");
    createPopUpBox();
    loadDiv(pizzaPlace,pizzaKey);

}
//This function creates a popup box for the final transaction amount
function createPopUpBox(){
    const popUpBox=document.createElement("div");
    popUpBox.id="myModal";
    popUpBox.className="modal";
    popUpBox.classList.add("row");

    const popUpContent=document.createElement("div");
    popUpContent.className="modal-content";
    popUpContent.classList.add("col-xs-12");
    popUpContent.classList.add("col-sm-12");
    popUpContent.classList.add("col-md-6");
    popUpContent.classList.add("col-lg-4");

    const closeBtn=document.createElement("span");
    closeBtn.className="close";
    closeBtn.innerHTML=`&times;`;
    closeBtn.setAttribute("onclick","closeCart()");
    const content_div=document.createElement("div");
    content_div.id="content_div";
    popUpContent.appendChild(closeBtn);
    popUpContent.appendChild(content_div);
    popUpBox.appendChild(popUpContent);
    document.querySelector("#header_body_div").appendChild(popUpBox);
}

function loadDiv(pizzaPlace,pizzaKey){
    loadMenuJSON(function (response){
        const pizza_item=JSON.parse(response)[pizzaPlace][pizzaKey-1];
        var perCost=pizza_item.price;
        perCost=parseFloat(perCost.split(" ")[0]);
        const cartSummery=`
                            <h2 class="mb-4 text-danger">Cart Summery</h2>
                            <div class="text-dark">
                                <h4>Item:  ${pizza_item.title}<h4>
                                <h4>Price: ${pizza_item.price}</h4>
                                <div class="form-inline">
                                    <label for="quantity"><h4>Quantity:</h4></label>
                                    <input class="form-control w-25 ml-4" type="number" value="0" name="quantity" id="quantity"/><br>
                                    <button class="ml-4 btn btn-success" value="Purchase" onclick="checkThis(${perCost})">$</button>    
                                </div>
                                <hr>
                                <h1 id="totalCost" class="text-success">Total: ${pizza_item.price}</h1>                           
                            </div>
                            <br>
                            <button class="btn btn-info" onclick="makeTransaction()">Purchase</button>
                            <p class="text-danger">All sales are final. Please check the quntity carefully.</p>
        `;
        document.querySelector("#content_div").innerHTML=cartSummery;
    });
}

function checkThis(perCost){
    const quantity=parseFloat(document.querySelector("#quantity").value);
    const finalPrice=quantity*perCost;
    document.querySelector("#totalCost").innerHTML="Total: "+finalPrice.toFixed(4)+" ETH";
}

function closeCart(){
    document.querySelector("#myModal").remove();
}

// window.onclick = function(event) {
//     if (event.target == document.getElementById("myModal")) {
//         closeCart();
//     }
//   }