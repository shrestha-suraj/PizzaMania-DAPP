const header=document.querySelector("header");

const header_content= `
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                                aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                                <a class="navbar-brand" href="#"><strong class="text-success">PizzaMania</strong></a>
                                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link" href="../index.html">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="../about.html">About US</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>`;
header.innerHTML=header_content;