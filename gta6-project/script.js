(function(){
  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Countdown — target: Nov 19, 2026, based on the latest officially
  // announced release date. Recomputed live, so it never goes stale.
  var target = new Date('2026-11-19T00:00:00');
  var elDays = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins = document.getElementById('cd-mins');
  var elSecs = document.getElementById('cd-secs');
  var cdWrap = document.getElementById('countdown');

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick(){
    var now = new Date();
    var diff = target - now;
    if (diff <= 0){
      cdWrap.innerHTML = '<div class="cd-unit" style="min-width:auto;padding:14px 24px;"><span class="cd-num" style="font-size:1.4rem;">Available now</span></div>';
      clearInterval(timer);
      return;
    }
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);
    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  tick();
  var timer = setInterval(tick, 1000);

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(openItem){
        if(openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
          openItem.querySelector('.faq-q').setAttribute('aria-expanded','false');
        }
      });
      if(isOpen){
        item.classList.remove('open');
        ans.style.maxHeight = null;
        btn.setAttribute('aria-expanded','false');
      } else {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded','true');
      }
    });
  });

  // Notify form — local-only demo storage
  var form = document.getElementById('notifyForm');
  var success = document.getElementById('notifySuccess');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    try{
      var email = document.getElementById('notifyEmail').value;
      var list = JSON.parse(localStorage.getItem('gta6_demo_notify_list') || '[]');
      list.push(email);
      localStorage.setItem('gta6_demo_notify_list', JSON.stringify(list));
    }catch(err){ /* storage unavailable — still show confirmation */ }
    success.classList.add('show');
    form.reset();
  });

  // Subtle hero parallax on scroll (respects reduced motion)
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced){
    var sun = document.querySelector('.hero-sun');
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      if(y < window.innerHeight){
        sun.style.transform = 'translate(-50%,' + (y * 0.15) + 'px)';
      }
    }, { passive:true });
  }
})();
