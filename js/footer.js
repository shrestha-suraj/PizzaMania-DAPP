const footer=document.querySelector("footer");
footer.style.position="absolute";
footer.style.bottom="0";
footer.style.width="100%";
footer.style.height="2.5rem";
footer.style.backgroundColor="black";


const footer_content=document.createElement("h5");
footer_content.textContent="(C) Created and Maintained by Suraj Shrestha";
footer_content.classList.add("text-center");
footer.appendChild(footer_content);