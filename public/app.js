const PHOTOS=[
"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
];
let photoIndex=0;
const posts=[
{id:1,name:"Aarav Mehta",handle:"aarav.moves",avatar:"AM",avatarClass:"a1",time:"18 min ago",text:"Didn't want to train today. Did the session anyway. Sometimes the win is just showing up.",media:"LEG DAY",meta:"52 MIN · STRENGTH",image:PHOTOS[0],likes:284,comments:32},
{id:2,name:"Shreya Kapoor",handle:"shreya.runs",avatar:"SK",avatarClass:"a2",time:"42 min ago",text:"First sub-30 5K. Not fast by someone else's standards. Huge for me.",media:"29:42",meta:"5K · PERSONAL BEST",image:PHOTOS[1],likes:412,comments:61},
{id:3,name:"Rohan Singh",handle:"rohan.builds",avatar:"RS",avatarClass:"a3",time:"1 hr ago",text:"Day 12 of fixing my sleep. Woke up before my alarm today. Small win, but I'll take it.",media:"7H 41M",meta:"SLEEP · DAY 12",image:PHOTOS[3],likes:198,comments:24},
{id:4,name:"Maya Shah",handle:"maya.moves",avatar:"MS",avatarClass:"a4",time:"2 hr ago",text:"Meal prep doesn't need to be pretty. Three meals ready, one less decision tomorrow.",media:"MEAL PREP",meta:"NUTRITION · 3 MEALS",image:PHOTOS[2],likes:176,comments:19}
];
const challenges=[
["30 DAYS OF MOVEMENT","1,842 people","Show up for 20+ minutes every day."],
["FIRST 5K","832 people","Train together. Run your first 5K."],
["NO ZERO DAYS","2,104 people","One meaningful health action, every day."],
["SLEEP RESET","614 people","Build a consistent wind-down for 14 days."]
];
const communities=[
["🏃","Running","32.4K members"],["🏋️","Strength","41.2K members"],["🥗","Nutrition","18.7K members"],["🧘","Mind & Body","24.1K members"],
["🏸","Sports","12.8K members"],["🌱","Healthy Habits","29.5K members"],["🎓","College Fitness","4.2K members"],["🏠","Home Workouts","18.1K members"]
];
const people=[["JM","Jiya Menon","jiya.runs","Running"],["VK","Ved Kapoor","ved.lifts","Strength"],["NS","Naina S.","naina.well","Wellness"],["RK","Rishi Kapoor","rishi.eats","Nutrition"]];

function renderStories(){
 const x=[["Your story","PA","own"],["Aarav","AM","a1"],["Shreya","SK","a2"],["Maya","MS","a4"],["Rohan","RS","a3"],["Jiya","JM","a1"]];
 document.querySelector("#stories").innerHTML=x.map(s=>`<button class="story ${s[2]==="own"?"own":""}" onclick='toast("${s[2]==="own"?"Open your story":"Story from "+s[0]}")'><span class="story-ring"><span class="story-avatar ${s[2]}">${s[1]}</span></span><strong>${s[0]}</strong></button>`).join("");
}
function renderPeople(){
 document.querySelector("#peopleMini").innerHTML=people.slice(0,3).map(p=>`<div class="mini-person"><span class="mini-avatar">${p[0]}</span><div><strong>${p[1]}</strong><small>@${p[2]} · ${p[3]}</small></div><button onclick="followPerson(this)">Follow</button></div>`).join("");
 document.querySelector("#peopleGrid").innerHTML=people.map(p=>`<div class="person-card"><span class="person-photo">${p[0]}</span><div><strong>${p[1]}</strong><small>@${p[2]} · ${p[3]}</small></div><button onclick="followPerson(this)">Follow</button></div>`).join("");
}
function setFeed(mode,btn){document.querySelectorAll('.tabs .tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');if(mode==='following')toast('Showing posts from people you follow');else if(mode==='fresh')toast('Showing the freshest posts');else toast('Showing your personalised feed')}
function renderFeed(){
 const el=document.querySelector("#feed");
 el.innerHTML=posts.map(p=>`<article class="post" ondblclick="doubleLike(this)">
 <div class="post-head"><div class="post-avatar ${p.avatarClass}">${p.avatar}</div><div class="post-user"><strong>${p.name}</strong><span>@${p.handle} · ${p.time}</span></div><button class="follow" onclick="followPerson(this)">Follow</button><button class="more" onclick='toast("More options coming soon")'>•••</button></div>
 <p>${p.text}</p>
 <div class="post-media" style="background-image:url('${p.image}')"><div class="image-shade"></div><div class="media-copy"><small>${p.meta}</small>${p.media}</div><span class="media-corner">hesho</span><span class="double-heart">♥</span></div>
 <div class="post-actions"><button class="action like-action" onclick="like(this)"><span>♡</span> <b>${p.likes}</b></button><button class="action" onclick="openComments(${p.id})">◯ <b>${p.comments}</b></button><button class="action" onclick="savePost(this)">⌑ <span>Save</span></button><button class="action" onclick="sharePost()">↗ Share</button><button class="do" onclick="doThis(this)">DO THIS →</button></div>
 </article>`).join("");
}
function renderDiscover(){
 document.querySelector("#challengeGrid").innerHTML=challenges.map(c=>`<div class="challenge"><span class="badge">COMMUNITY CHALLENGE</span><h4>${c[0]}</h4><p>${c[1]} · ${c[2]}</p><button class="join" onclick="join(this)">Join challenge</button></div>`).join("");
 document.querySelector("#communityGrid").innerHTML=communities.map(c=>`<button class="community" data-name="${c[1]}" onclick='toast("Opening ${c[1]} community")'><div class="emoji">${c[0]}</div><strong>${c[1]}</strong><span>${c[2]}</span><b>→</b></button>`).join("");
}
function renderProfile(type){
 const c=document.querySelector("#profileContent");
 if(type==="progress")c.innerHTML='<div class="progress-board"><div class="progress-big"><p class="eyebrow">30 DAY CONSISTENCY</p><strong>18<span>/30</span></strong><div class="big-line"><i></i></div><p>60% complete · 4 days shown up this week</p></div><div class="pb-grid"><div><b>14</b><span>workouts</span></div><div><b>43.2</b><span>km moved</span></div><div><b>6</b><span>milestones</span></div><div><b>82%</b><span>consistency</span></div></div></div>';
 else if(type==="saved")c.innerHTML='<div class="empty-state"><div>⌑</div><h3>Your saved ideas live here.</h3><p>Save workouts, meals, routines and posts you want to come back to.</p></div>';
 else if(type==="challenges")c.innerHTML='<div class="challenge-list">'+challenges.slice(0,3).map(x=>`<div><span>🏆</span><section><strong>${x[0]}</strong><small>Joined · 18 day streak</small></section><b>→</b></div>`).join("")+'</div>';
 else c.innerHTML='<div class="profile-post-grid">'+posts.map(p=>`<article class="profile-post"><div class="profile-post-image" style="background-image:url('${p.image}')"><small>${p.meta}</small><strong>${p.media}</strong></div><p>${p.text}</p><span>♡ ${p.likes} · ◯ ${p.comments}</span></article>`).join("")+'</div>';
}
function profileTab(btn,type){document.querySelectorAll(".profile-tabs button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");renderProfile(type)}
function showView(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));const t=document.getElementById(id);if(t)t.classList.add("active");document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===id));if(id==="profile")renderProfile();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".nav[data-view]").forEach(n=>n.onclick=()=>showView(n.dataset.view));
document.querySelectorAll(".type").forEach(t=>t.onclick=()=>{document.querySelectorAll(".type").forEach(x=>x.classList.remove("active"));t.classList.add("active")});
function openCreate(){showView("create")}
function publishPost(){const text=document.getElementById("postText").value.trim();if(!text){toast("Write something first.");return}posts.unshift({id:Date.now(),name:"You",handle:"parvi",avatar:"PA",avatarClass:"a2",time:"just now",text,media:"TODAY",meta:"CHECK-IN · PROOF",image:PHOTOS[photoIndex],likes:0,comments:0});document.getElementById("postText").value="";renderFeed();showView("home");toast("Posted. You left some proof.")}
function cyclePhoto(){photoIndex=(photoIndex+1)%PHOTOS.length;document.querySelector(".preview-image").style.backgroundImage=`url('${PHOTOS[photoIndex]}')`;toast("Dummy photo changed")}
function like(btn){const b=btn.querySelector("b");b.textContent=+b.textContent+1;btn.classList.add("liked");btn.querySelector("span").textContent="♥"}
function doubleLike(card){const btn=card.querySelector(".like-action");if(btn){like(btn);const h=card.querySelector(".double-heart");h.classList.remove("pop");void h.offsetWidth;h.classList.add("pop")}}
function savePost(btn){btn.querySelector("span").textContent="Saved";btn.classList.add("saved");localStorage.setItem("hesho-saved","1");toast("Saved to your profile")}
function sharePost(){if(navigator.clipboard)navigator.clipboard.writeText(location.href);toast("Post link copied")}
function doThis(btn){btn.textContent="✓ ADDED";btn.classList.add("done");toast("Added to your journey. Go show up.")}
function join(btn){btn.textContent="✓ Joined";btn.classList.add("joined");toast("You're in. First check-in is waiting.")}
function followPerson(btn){btn.textContent=btn.textContent==="Follow"?"Following":"Follow";btn.classList.toggle("following",btn.textContent==="Following");toast(btn.textContent==="Following"?"You're following them":"Unfollowed")}
function checkIn(btn,label){document.querySelectorAll(".check-options button").forEach(x=>x.classList.remove("chosen"));btn.classList.add("chosen");localStorage.setItem("hesho-checkin",label);toast(label+" logged. That's proof.")}
function openComments(id){
 const p=posts.find(x=>x.id===id), panel=document.getElementById("commentsPanel");
 panel.innerHTML=`<div class="panel-head"><h3>Comments</h3><button onclick='togglePanel("commentsPanel")'>×</button></div>
 <div class="comment"><span class="mini-avatar">SK</span><p><strong>Shreya</strong> This is exactly the energy I needed today.<small>12 min ago</small></p></div>
 <div class="comment"><span class="mini-avatar">VK</span><p><strong>Ved</strong> Saving this for tomorrow.</p></div>
 <div class="comment-input"><input placeholder="Add a comment..." onkeydown="if(event.key==='Enter')toast('Comment added')"><button onclick='toast("Comment added")'>Post</button></div>`;
 panel.classList.add("open");
}
function togglePanel(id){document.getElementById(id).classList.toggle("open")}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2200)}
function searchDiscover(q){document.querySelectorAll(".community,.person-card").forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q.toLowerCase())?"flex":"none")}
function searchGlobal(q){if(q.trim()){showView("discover");const input=document.querySelector(".search input");if(input)input.value=q;searchDiscover(q);toast("Searching hesho for “"+q.trim()+"”")}}
function openTheme(){document.getElementById("themePanel").classList.add("open")}
function closeTheme(){document.getElementById("themePanel").classList.remove("open")}
function setTheme(t){document.body.dataset.theme=t;localStorage.setItem("hesho-theme",t);closeTheme();toast(t.charAt(0).toUpperCase()+t.slice(1)+" theme applied")}
function renderMatches(){
 const e=document.querySelector("#matchCard"), matches=[
 ["AR","Aarohi","Badminton","Intermediate","2.4 km away","Sat · 8:00 AM","Looking for someone consistent. Competitive but chill.","#ff7b9c"],
 ["KV","Karan","Squash","Intermediate","3.1 km away","Sun · 9:00 AM","I play to win, but I won't judge your terrible serves.","#70d6ff"],
 ["MS","Meera","Running","Beginner","1.8 km away","Sat · 7:00 AM","Training for my first 10K. Looking for a running buddy.","#c9f25c"]];
 e.innerHTML='<div class="match-intro"><span class="eyebrow">TODAY’S PICKS</span><h3>Someone you could actually play with.</h3><p>Three people match your sport, level, availability and distance.</p></div>'+matches.map(m=>`<article class="match-person"><div class="match-photo" style="--match:${m[7]}"><span>${m[0]}</span><b>${m[1]}</b></div><div class="match-info"><div class="match-name"><h3>${m[1]}</h3><span>${m[2]}</span></div><div class="match-tags"><span>● ${m[3]}</span><span>⌖ ${m[4]}</span><span>◷ ${m[5]}</span></div><p>“${m[6]}”</p><div class="match-actions"><button class="pass" onclick="matchAction(this,false)">×</button><button class="play-like" onclick="matchAction(this,true)">♡</button><button class="connect" onclick="matchAction(this,true)">ASK TO PLAY →</button></div></div></article>`).join("");
}
function matchAction(btn,yes){if(yes){btn.textContent=btn.classList.contains("connect")?"REQUEST SENT ✓":"♥";btn.classList.add("matched");toast("Play request sent")}else{btn.closest(".match-person").style.opacity=".4";toast("We'll show you someone else")}}
renderFeed();renderDiscover();renderStories();renderPeople();renderProfile();renderMatches();
(function(){const d=document.querySelector('.hero .eyebrow');if(d){d.textContent=new Intl.DateTimeFormat('en-IN',{weekday:'long',month:'long',day:'numeric'}).format(new Date()).toUpperCase()}})();
(function(){const t=localStorage.getItem("hesho-theme");if(t)document.body.dataset.theme=t;const p=document.querySelector(".preview-image");if(p)p.style.backgroundImage=`url('${PHOTOS[0]}')`})();
