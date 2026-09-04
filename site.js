
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const menu=$("#menuBtn"), mobile=$("#mobileNav");
if(menu) menu.onclick=()=>mobile.classList.toggle("open");

$("#themePulse")?.addEventListener("click",()=>{
  document.body.classList.toggle("pulse");
  document.documentElement.style.setProperty("--cyan", document.body.classList.contains("pulse")?"#64ddff":"#35c5ff");
});

$$("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
  $$("[data-filter]").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
  const f=btn.dataset.filter;
  $$("[data-product-type]").forEach(card=>card.style.display=(f==="all"||card.dataset.productType===f)?"flex":"none");
}));

const qs=new URLSearchParams(location.search);
const productId=qs.get("id");
const demoCatalog={
 "mikrotik-neon":{name:"Neon Gate MikroTik",price:149000,type:"Template Login Page MikroTik"},
 "mikrotik-clean":{name:"CleanWave MikroTik",price:99000,type:"Template Login Page MikroTik"},
 "web-corporate":{name:"Aurevia Corporate",price:449000,type:"Template Website"},
 "web-resort":{name:"Aurevia Resort",price:599000,type:"Template Website"}
};
if(productId && demoCatalog[productId]){
  const p=demoCatalog[productId];
  $("#detailName") && ($("#detailName").textContent=p.name);
  $("#detailType") && ($("#detailType").textContent=p.type);
  $("#detailPrice") && ($("#detailPrice").textContent=p.price.toLocaleString("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}));
  $$("[data-checkout-link]").forEach(a=>a.href=`checkout.html?id=${productId}`);
}
const checkout=demoCatalog[productId] || demoCatalog["mikrotik-neon"];
if($("#checkoutName")) {
  $("#checkoutName").textContent=checkout.name;
  $("#checkoutPrice").textContent=checkout.price.toLocaleString("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0});
}

$("#checkoutBtn")?.addEventListener("click",()=>{
  const r=$("#checkoutResult"); r.classList.add("show");
  r.innerHTML="<b>Midtrans Preview</b><br>Production flow: Checkout → Midtrans Snap → payment callback → order PAID → product added to Customer Area → download/activation enabled.<br><small>No real payment is enabled in this development build.</small>";
});

$("#serviceForm")?.addEventListener("submit",e=>{
  e.preventDefault();
  const r=$("#serviceResult"); r.classList.add("show");
  r.innerHTML="<b>Request berhasil dibuat (preview).</b><br>Next: Admin review → quotation → customer approval → invoice → payment → project execution.";
});
$("#ticketForm")?.addEventListener("submit",e=>{
  e.preventDefault(); const r=$("#ticketResult"); r.classList.add("show");
  r.innerHTML=`<b>Ticket #ARES-${Math.floor(1000+Math.random()*9000)}</b><br>Status: Open • routed to selected department (development preview).`;
});
$$("[data-cycle]").forEach(btn=>btn.addEventListener("click",()=>{
  $$("[data-cycle]").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
  const cycle=btn.dataset.cycle;
  $$("[data-monthly]").forEach(el=>{
    el.textContent=cycle==="monthly"?el.dataset.monthly:el.dataset.yearly;
  });
}));
$("#loginForm")?.addEventListener("submit",e=>{
  e.preventDefault(); location.href="customer-area.html";
});
$("#subscribeForm")?.addEventListener("submit",e=>{
  e.preventDefault(); const r=$("#subscribeResult"); r.classList.add("show");
  r.innerHTML="<b>Subscription checkout preview prepared.</b><br>Production flow: Register → choose monthly/yearly → Midtrans → payment success → subscription ACTIVE → ISP Billing account provisioned.";
});

window.addEventListener("scroll",()=>document.querySelector(".header")?.classList.toggle("scrolled",scrollY>40));
