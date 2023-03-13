let navLinks = [...document.querySelectorAll(".menu li")]
navLinks.shift()

let sections = [...document.querySelectorAll(".section")]
sections.shift()

let sectionsPosition;
function positionCalculation(){
    sectionsPosition = sections.map(section => section.offsetTop)
}
positionCalculation()


// DOM Elements
menu_opener = document.querySelector(".menu-opener")
tab_bar = document.querySelector(".tab-bar")
home_return_button = document.querySelector("#to-the-home")

home_link = document.querySelector("#home-section-link")


// scroll function
function smoothScroll(t){
    window.scrollTo({top: t, behavior: 'smooth'});
}

home_link.addEventListener("click", function(){
    tab_bar.classList.toggle("open-tab-bar");
    smoothScroll(0);
})


// scroll to top
home_return_button.addEventListener("click", function(){
    smoothScroll(0);
})

// open menu
menu_opener.addEventListener("click", function(){
    tab_bar.classList.toggle("open-tab-bar");
    console.log(tab_bar.classList);
})

// scroll listener
window.addEventListener("scroll", function(){

    if (scrollY > 600){
        home_return_button.style.display = "flex";
    } else {
        home_return_button.style.display = "none";
    }
})


// map elements with her position
navLinks.forEach(link => link.addEventListener("click", addScrollSmooth))

function addScrollSmooth(e){
    const linkIndex = navLinks.indexOf(e.target);

    tab_bar.classList.toggle("open-tab-bar");

    positionCalculation()
    window.scrollTo({
        top: sectionsPosition[linkIndex],
        behavior: "smooth"
    })

}
window.addEventListener("resize", positionCalculation)



// ------ projects

document.querySelectorAll(".project-item").forEach( element => {
    element.addEventListener("mousemove", () => {
        element.querySelector("a").classList.add("show")

        element.querySelector(".content h3").classList.add("move-up")
        element.querySelector(".content p").classList.add("move-up")
    })

})
document.querySelectorAll(".project-item").forEach( element => {
    element.addEventListener("mouseleave", () => {
        element.querySelector("a").classList.remove("show")

        element.querySelector(".content h3").classList.remove("move-up")
        element.querySelector(".content p").classList.remove("move-up")
    })
    
})

document.querySelectorAll(".scroll-btn").forEach(element => {
    element.addEventListener("touchstart", () => {
        element.firstElementChild.classList.add("touch")

    })
    element.addEventListener("mousedown", () => {
        element.firstElementChild.classList.add("touch")

    })

    element.addEventListener("touchend", () => {
        element.firstElementChild.classList.remove("touch")
    })
    element.addEventListener("mouseup", () => {
        element.firstElementChild.classList.remove("touch")

    })

})



