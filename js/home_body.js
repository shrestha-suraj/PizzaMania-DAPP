const home_body_div = document.querySelector("#home_body");

//Rertiving JSON data of companies name and bio to make home page cards
loadPlaceJSON(function (response) {
    var pizza_places = JSON.parse(response);

    var cards = "";
    pizza_places.forEach(company => {
        cards += `<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-5">
            <div class="card ml-auto mr-auto" style="width: 18rem;">
                    <img src="../${company.imageurl}" class="card-img-top" alt="...">
                    <div class="card-body bg-dark">
                    <center>  
                    <h5 class="card-title mb-5">${company.name}</h5>
                      <a href="html/${company.link}" class="btn btn-primary">Order Now</a></center>
                    </div>
                  </div>
             </div>`;
    });
    document.querySelector("#home_body").innerHTML=cards;
});