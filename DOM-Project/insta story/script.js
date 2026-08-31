var arr = [
    {
        dp:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWwlMjBnaXJsfGVufDB8fDB8fHww",
        story:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZWwlMjBnaXJsfGVufDB8fDB8fHww"
    },
    {
        dp:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWwlMjBnaXJsfGVufDB8fDB8fHww",
        story:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWwlMjBnaXJsfGVufDB8fDB8fHww"
    },
    {
        dp:"https://images.unsplash.com/photo-1620196639702-311ce41b2be9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9kZWwlMjBnaXJsfGVufDB8fDB8fHww",
        story:"https://images.unsplash.com/photo-1620196639702-311ce41b2be9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9kZWwlMjBnaXJsfGVufDB8fDB8fHww"
    },
    {
        dp:"https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vZGVsJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
        story:"https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vZGVsJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        dp:"https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVsJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
        story:"https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVsJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        dp:"https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vZGVsJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
        story:"https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vZGVsJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D"
    },  
]
var clutter = ""
var storiyan = document.querySelector("#storiyan")
arr.forEach(function (elem,idx){
    clutter+=`<div class="story">
                <img id="${idx}"src="${elem.dp}" alt="">
            </div>`
})
storiyan.innerHTML = clutter
storiyan.addEventListener("click",function(dets){
   document.querySelector("#full-screen").style.display ="block"
   document.querySelector("#full-screen").style.backgroundImage =`url(${arr[dets.target.id].story})`
   setTimeout(() => {
       document.querySelector("#full-screen").style.display ="none"
   }, 3000);
})
