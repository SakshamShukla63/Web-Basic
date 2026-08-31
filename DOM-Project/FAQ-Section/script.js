const accordians = document.querySelectorAll(".accordian")
accordians.forEach(accordian =>{
    const h4 = accordian.querySelector("h4")
    const answer = accordian.querySelector(".ans")
    h4.addEventListener("click", ()=>{
        answer.classList.toggle("active")
    })
})