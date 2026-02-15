(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const J={};let C=null;function E(t,e){J[t]=e}function b(t,e={}){const{replace:n=!1,transition:s="fade"}=e;n?history.replaceState(null,"",`#${t}`):history.pushState(null,"",`#${t}`),N(s)}async function N(t="fade"){const e=window.location.hash.slice(1)||"welcome",n=J[e];if(!n){console.warn(`No route handler for: ${e}`);return}const s=document.getElementById("app");if(C&&typeof C=="function"&&C(),s.children.length>0&&t!=="none"){const a=s.children[0];a.style.opacity="0",a.style.transform="translateY(8px)",a.style.transition="all 0.15s ease-out",await new Promise(o=>setTimeout(o,150))}s.innerHTML="";const i=await n();if(typeof i=="string"?s.innerHTML=i:i instanceof HTMLElement?s.appendChild(i):i&&i.html&&(s.innerHTML=i.html,i.init&&(C=i.init())),t!=="none"){const a=s.children[0];a&&(a.style.opacity="0",a.style.transform="translateY(12px)",a.style.transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateY(0)"})}))}}function Z(){window.addEventListener("hashchange",()=>N("fade")),N("none")}const F="kobo-sense-state",O={userName:"User",selectedBanks:[],transactions:[],categorisedTransactions:[],userCategoryRules:{},analytics:null,healthScore:null,tips:[],currentMonth:null,isDemo:!1,hasCompletedOnboarding:!1,activeTab:"home"};function _(){try{const t=localStorage.getItem(F);if(t)return{...O,...JSON.parse(t)}}catch(t){console.warn("Could not load saved state:",t)}return{...O}}function X(t){try{const e={userName:t.userName,selectedBanks:t.selectedBanks,userCategoryRules:t.userCategoryRules,hasCompletedOnboarding:t.hasCompletedOnboarding};localStorage.setItem(F,JSON.stringify(e))}catch(e){console.warn("Could not save state:",e)}}const A=new Set;let S=_();const h={get(t){return t?S[t]:{...S}},set(t){S={...S,...t},X(S),A.forEach(e=>e(S))},subscribe(t){return A.add(t),()=>A.delete(t)},reset(){S={...O},localStorage.removeItem(F),A.forEach(t=>t(S))}},G=[{date:"2025-10-01",description:"SALARY PAYMENT - TECH CORP LTD",amount:85e4,type:"credit"},{date:"2025-10-15",description:"FREELANCE DESIGN - PAYSTACK TRANSFER",amount:15e4,type:"credit"},{date:"2025-10-22",description:"REFUND - JUMIA RETURNS",amount:12500,type:"credit"},{date:"2025-10-02",description:"LANDLORD ESTATE RENT PAYMENT OCT",amount:25e4,type:"debit"},{date:"2025-10-02",description:"LAWMA WASTE MANAGEMENT FEE",amount:3500,type:"debit"},{date:"2025-10-03",description:"SHOPRITE IKEJA CITY MALL POS",amount:35400,type:"debit"},{date:"2025-10-07",description:"CHICKEN REPUBLIC LEKKI POS",amount:4200,type:"debit"},{date:"2025-10-10",description:"SPAR SUPERMARKET ILUPEJU POS",amount:28700,type:"debit"},{date:"2025-10-14",description:"MARKET PURCHASE OYINGBO NIP",amount:15e3,type:"debit"},{date:"2025-10-18",description:"DOMINOS PIZZA VI POS",amount:8500,type:"debit"},{date:"2025-10-21",description:"LOCAL FOOD VENDOR MAMA PUT",amount:3500,type:"debit"},{date:"2025-10-25",description:"KFC IKEJA POS",amount:6800,type:"debit"},{date:"2025-10-28",description:"SHOPRITE LEKKI POS",amount:42100,type:"debit"},{date:"2025-10-03",description:"BOLT RIDE LEKKI TO VI",amount:3200,type:"debit"},{date:"2025-10-05",description:"TOTAL FILLING STATION FUEL",amount:25e3,type:"debit"},{date:"2025-10-08",description:"UBER TRIP MARYLAND TO IKEJA",amount:2800,type:"debit"},{date:"2025-10-12",description:"BOLT RIDE AJAH TO LEKKI",amount:4500,type:"debit"},{date:"2025-10-16",description:"OANDO FILLING STATION FUEL",amount:22e3,type:"debit"},{date:"2025-10-20",description:"BOLT RIDE VI TO IKOYI",amount:2100,type:"debit"},{date:"2025-10-26",description:"TOTAL FILLING STATION FUEL",amount:25e3,type:"debit"},{date:"2025-10-04",description:"EKO DISCO PREPAID ELECTRICITY TOKEN",amount:15e3,type:"debit"},{date:"2025-10-04",description:"DSTV PREMIUM SUBSCRIPTION SEPT",amount:29500,type:"debit"},{date:"2025-10-10",description:"IKEJA ELECTRIC DISCO TOKEN",amount:1e4,type:"debit"},{date:"2025-10-01",description:"MTN USSD AIRTIME PURCHASE",amount:5e3,type:"debit"},{date:"2025-10-05",description:"GLO DATA BUNDLE 10GB",amount:3500,type:"debit"},{date:"2025-10-12",description:"SPECTRANET INTERNET MONTHLY",amount:18500,type:"debit"},{date:"2025-10-20",description:"MTN USSD DATA BUNDLE 5GB",amount:3e3,type:"debit"},{date:"2025-10-25",description:"AIRTEL AIRTIME RECHARGE",amount:2e3,type:"debit"},{date:"2025-10-06",description:"NETFLIX MONTHLY SUBSCRIPTION",amount:7500,type:"debit"},{date:"2025-10-13",description:"SPOTIFY PREMIUM MONTHLY",amount:3500,type:"debit"},{date:"2025-10-19",description:"GENESIS CINEMA PALMS LEKKI",amount:8e3,type:"debit"},{date:"2025-10-27",description:"YOUTUBE PREMIUM SUBSCRIPTION",amount:2800,type:"debit"},{date:"2025-10-08",description:"JUMIA ONLINE PURCHASE",amount:35e3,type:"debit"},{date:"2025-10-15",description:"PAYPORTE CLOTHING PURCHASE",amount:22e3,type:"debit"},{date:"2025-10-01",description:"PIGGYVEST SAVINGS TRANSFER",amount:1e5,type:"debit"},{date:"2025-10-15",description:"COWRYWISE INVESTMENT TRF",amount:5e4,type:"debit"},{date:"2025-10-01",description:"SMS ALERT CHARGE OCT",amount:50,type:"debit"},{date:"2025-10-03",description:"NIP TRF CHARGE",amount:26.88,type:"debit"},{date:"2025-10-05",description:"ATM WITHDRAWAL INTERBANK FEE",amount:65,type:"debit"},{date:"2025-10-10",description:"ACCOUNT MAINTENANCE FEE",amount:1200,type:"debit"},{date:"2025-10-15",description:"STAMP DUTY CHARGE",amount:50,type:"debit"},{date:"2025-10-20",description:"NIP TRF CHARGE",amount:53.75,type:"debit"},{date:"2025-10-31",description:"COT COMMISSION ON TURNOVER",amount:500,type:"debit"},{date:"2025-10-09",description:"MEDPLUS PHARMACY LEKKI POS",amount:8500,type:"debit"},{date:"2025-11-01",description:"SALARY PAYMENT - TECH CORP LTD",amount:85e4,type:"credit"},{date:"2025-11-12",description:"FREELANCE UI PROJECT - FLUTTERWAVE TRF",amount:2e5,type:"credit"},{date:"2025-11-02",description:"LANDLORD ESTATE RENT PAYMENT NOV",amount:25e4,type:"debit"},{date:"2025-11-03",description:"SHOPRITE LEKKI POS",amount:38200,type:"debit"},{date:"2025-11-08",description:"THE FOOD MARKET VI POS",amount:12500,type:"debit"},{date:"2025-11-12",description:"CHICKEN REPUBLIC MARYLAND",amount:5200,type:"debit"},{date:"2025-11-16",description:"MARKET PURCHASE BALOGUN",amount:18e3,type:"debit"},{date:"2025-11-22",description:"SPAR SUPERMARKET LEKKI POS",amount:31500,type:"debit"},{date:"2025-11-28",description:"KFC PALMS POS",amount:7400,type:"debit"},{date:"2025-11-04",description:"BOLT RIDE LEKKI TO IKEJA",amount:5500,type:"debit"},{date:"2025-11-06",description:"TOTAL FILLING STATION FUEL",amount:27e3,type:"debit"},{date:"2025-11-14",description:"UBER TRIP ISLAND TO MAINLAND",amount:4200,type:"debit"},{date:"2025-11-20",description:"OANDO FUEL STATION",amount:23e3,type:"debit"},{date:"2025-11-27",description:"BOLT RIDE AJAH TO IKOYI",amount:6200,type:"debit"},{date:"2025-11-05",description:"EKO DISCO PREPAID TOKEN",amount:18e3,type:"debit"},{date:"2025-11-05",description:"DSTV COMPACT PLUS SUBSCRIPTION",amount:21e3,type:"debit"},{date:"2025-11-02",description:"MTN DATA BUNDLE 10GB",amount:5e3,type:"debit"},{date:"2025-11-10",description:"SPECTRANET INTERNET MONTHLY",amount:18500,type:"debit"},{date:"2025-11-18",description:"AIRTEL DATA 5GB",amount:2500,type:"debit"},{date:"2025-11-06",description:"NETFLIX MONTHLY SUBSCRIPTION",amount:7500,type:"debit"},{date:"2025-11-13",description:"SPOTIFY PREMIUM MONTHLY",amount:3500,type:"debit"},{date:"2025-11-11",description:"KONGA ONLINE ORDER",amount:45e3,type:"debit"},{date:"2025-11-01",description:"PIGGYVEST SAVINGS TRANSFER",amount:12e4,type:"debit"},{date:"2025-11-15",description:"COWRYWISE INVESTMENT TRF",amount:8e4,type:"debit"},{date:"2025-11-01",description:"SMS ALERT CHARGE NOV",amount:50,type:"debit"},{date:"2025-11-05",description:"NIP TRF CHARGE",amount:26.88,type:"debit"},{date:"2025-11-15",description:"STAMP DUTY CHARGE",amount:50,type:"debit"},{date:"2025-11-30",description:"ACCOUNT MAINTENANCE FEE",amount:1200,type:"debit"},{date:"2025-11-19",description:"REDDINGTON HOSPITAL CONSULTATION",amount:25e3,type:"debit"},{date:"2025-11-19",description:"MEDPLUS PHARMACY SURULERE",amount:12e3,type:"debit"}],Q={gtbank:{name:"GTBank",brandColor:"#E34A27",subtitle:"Guaranty Trust Bank",columns:["date","description","debit","credit","balance"]},zenith:{name:"Zenith Bank",brandColor:"#E31C23",subtitle:"Commercial Services",columns:["date","ref","description","debit","credit","balance"]},access:{name:"Access Bank",brandColor:"#2D3436",subtitle:"Holdings Plc",columns:["date","description","amount","type","balance"]},firstbank:{name:"First Bank",brandColor:"#003380",subtitle:"First Bank of Nigeria",columns:["date","description","debit","credit","balance"]},uba:{name:"UBA",brandColor:"#CC0000",subtitle:"United Bank for Africa",columns:["date","description","debit","credit","balance"]},kuda:{name:"Kuda",brandColor:"#40196D",subtitle:"Digital Banking",columns:["date","description","amount","type","balance"]},opay:{name:"OPay",brandColor:"#1EAF52",subtitle:"Mobile Money",columns:["date","description","amount","type"]},moniepoint:{name:"Moniepoint",brandColor:"#0052CC",subtitle:"Financial Services",columns:["date","description","debit","credit","balance"]}},P={"Food & Groceries":{icon:"🛒",color:"#22C55E",keywords:["shoprite","spar","justrite","hubmart","market","food","grocery","chicken republic","kfc","dominos","pizza","mr biggs","tantalizers","kilimanjaro","sweet sensation","tastee","mama put","amala","suya","restaurant","eatery","cafe","kitchen","grill","bakery","food co","prince ebeano","next cash","addide","bukka"]},Transport:{icon:"🚗",color:"#3B82F6",keywords:["bolt","uber","total","oando","mobil","conoil","filling station","fuel","petrol","diesel","e-hailing","ride","taxi","bus","indriver","taxify","gokada","max ng","opride","lcc","toll","parking","mechanic","car wash","vulcanizer"]},Utilities:{icon:"💡",color:"#F59E0B",keywords:["eko disco","ikedc","ikeja electric","aedc","bedc","kaedco","phedc","eedc","kedco","disco","electric","electricity","prepaid","token","dstv","gotv","startimes","showmax","lawma","waste","water"]},"Data & Airtime":{icon:"📱",color:"#8B5CF6",keywords:["mtn","glo","airtel","9mobile","etisalat","spectranet","swift","smile","ntel","airtime","data","recharge","bundle","internet","wifi","broadband","tizeti","fiberone"]},Housing:{icon:"🏠",color:"#EC4899",keywords:["rent","landlord","estate","agent","caution","service charge","mortgage","accommodation","apartment","flat","house"]},Entertainment:{icon:"🎬",color:"#F97316",keywords:["netflix","spotify","youtube","apple music","cinema","genesis","filmhouse","silverbird","ozone","gaming","xbox","playstation","steam","bet9ja","sportybet","betking","1xbet","nairabet","club","bar","lounge","event"]},Shopping:{icon:"🛍️",color:"#06B6D4",keywords:["jumia","konga","payporte","jiji","slot","pointek","amazon","aliexpress","asos","zara","h&m","clothing","fashion","electronics","appliance","store","mall","boutique","computer village","hubmart"]},Health:{icon:"🏥",color:"#10B981",keywords:["hospital","clinic","pharmacy","medplus","healthplus","reddington","lagoon","luth","doctor","dental","optical","lab","x-ray","surgery","consultation","medicine","drug"]},Education:{icon:"📚",color:"#6366F1",keywords:["school","university","college","tuition","course","udemy","coursera","book","stationery","exam","test","lesson","tutorial","training","seminar"]},Savings:{icon:"🏦",color:"#2DD4A8",keywords:["piggyvest","cowrywise","risevest","bamboo","chaka","trove","investment","savings","mutual fund","fixed deposit","money market"]},"Bank Charges":{icon:"🏛️",color:"#9CA3AF",keywords:["sms alert","maintenance","stamp duty","cot","commission","charge","fee","vat","withholding","nip trf charge","atm","interbank","card maintenance"]},Transfers:{icon:"↗️",color:"#64748B",keywords:["transfer to","trf to","sent to","payment to"]}},Y=Object.entries(P).map(([t,e])=>({name:t,icon:e.icon,color:e.color}));function z(t,e={}){const n=t.toLowerCase();for(const[s,i]of Object.entries(e))if(n.includes(s.toLowerCase())){const a=P[i];return{category:i,icon:a?a.icon:"📋",color:a?a.color:"#9CA3AF"}}for(const[s,i]of Object.entries(P))for(const a of i.keywords)if(n.includes(a.toLowerCase()))return{category:s,icon:i.icon,color:i.color};return{category:"Uncategorised",icon:"📋",color:"#D1D5DB"}}function q(t,e={}){return t.map(n=>{if(n.type==="credit"){const o=z(n.description,e);return o.category==="Uncategorised"||o.category==="Transfers"?{...n,category:"Income",categoryIcon:"💰",categoryColor:"#22C55E"}:{...n,category:o.category,categoryIcon:o.icon,categoryColor:o.color}}const{category:s,icon:i,color:a}=z(n.description,e);return{...n,category:s,categoryIcon:i,categoryColor:a}})}function B(t){if(!t||t.length===0)return ie();const e=ee(t),n=Object.keys(e).sort().reverse(),s=n[0],i=n[1]||null,a=e[s],o=i?e[i]:null,l=I(a,"credit"),r=I(a,"debit"),c=l-r,d=l>0?(l-r)/l*100:0,v=a.filter(k=>k.category==="Savings"&&k.type==="debit").reduce((k,T)=>k+T.amount,0),u=te(a,o),g=o?I(o,"credit"):null,y=o?I(o,"debit"):null,p=g&&g>0?(g-y)/g*100:null,m=ae({savingsRate:d,categories:u,spending:r,income:l,currentMonth:a}),w=ne({savingsRate:d,categories:u,spending:r,income:l,currentMonth:a});return{currentMonthKey:s,currentMonthLabel:j(s),previousMonthKey:i,previousMonthLabel:i?j(i):null,income:l,spending:r,netPosition:c,savingsRate:Math.max(0,d),savingsAmount:v,prevIncome:g,prevSpending:y,prevSavingsRate:p,spendingChange:y?(r-y)/y*100:null,incomeChange:g?(l-g)/g*100:null,categories:u,healthScore:m,healthFactors:w,totalTransactions:a.length,months:n,monthlyData:e}}function ee(t){const e={};for(const n of t){const s=n.date.substring(0,7);e[s]||(e[s]=[]),e[s].push(n)}return e}function I(t,e){return t.filter(n=>n.type===e).reduce((n,s)=>n+s.amount,0)}function te(t,e){const n=t.filter(r=>r.type==="debit"&&r.category!=="Savings"),s=n.reduce((r,c)=>r+c.amount,0),i={};for(const r of n)i[r.category]||(i[r.category]={name:r.category,icon:r.categoryIcon,color:r.categoryColor,amount:0,count:0}),i[r.category].amount+=r.amount,i[r.category].count++;const a=e?e.filter(r=>r.type==="debit"&&r.category!=="Savings"):[],o={};for(const r of a)o[r.category]||(o[r.category]={amount:0}),o[r.category].amount+=r.amount;return Object.values(i).map(r=>{var u;const c=s>0?r.amount/s*100:0,d=((u=o[r.name])==null?void 0:u.amount)||null,v=d?(r.amount-d)/d*100:null;return{...r,percentage:Math.round(c*10)/10,prevAmount:d,change:v!==null?Math.round(v):null}}).sort((r,c)=>c.amount-r.amount)}function ae({savingsRate:t,categories:e,spending:n,income:s,currentMonth:i}){let a=0;const o=Math.min(40,Math.max(0,t)/20*40);a+=o;const l=e.length>0?Math.max(...e.filter(m=>m.name!=="Bank Charges").map(m=>m.percentage)):0,r=l>40?Math.max(0,20-(l-40)/10*20):20;a+=r;const c=e.find(m=>m.name==="Bank Charges"),d=(c==null?void 0:c.amount)||0,v=d<=2e3?15:Math.max(0,15-(d-2e3)/3e3*15);a+=v;const u=["Housing","Food & Groceries","Transport","Utilities"],g=e.filter(m=>u.includes(m.name)).reduce((m,w)=>m+w.amount,0),y=n>0?g/n*100:0;let p;return y>=40&&y<=75?p=25:y>75?p=Math.max(0,25-(y-75)/20*25):p=Math.max(0,25-(40-y)/30*25),a+=p,Math.round(Math.min(100,Math.max(0,a)))}function ne({savingsRate:t,categories:e,spending:n,income:s,currentMonth:i}){const a=[];t>=15&&a.push({type:"positive",text:"Strong savings rate",detail:`${Math.round(t)}% of income saved`}),t>=5&&t<15&&a.push({type:"positive",text:"You're saving consistently",detail:`${Math.round(t)}% saved`});const o=e.find(d=>d.name==="Bank Charges");o&&o.amount<2e3&&a.push({type:"positive",text:"Low bank charges",detail:`Only ₦${D(o.amount)}`});const l=e.find(d=>d.name==="Entertainment");(!l||l.percentage<10)&&a.push({type:"positive",text:"Controlled discretionary spending"}),t<5&&a.push({type:"negative",text:"Very low savings rate",detail:"Try to save at least 10% of income"});const r=e.find(d=>d.name==="Housing");r&&s>0&&r.amount/s>.3&&a.push({type:"negative",text:"Housing cost is high",detail:`${Math.round(r.amount/s*100)}% of income`});const c=e.find(d=>d.name==="Food & Groceries");return c&&c.percentage>25&&a.push({type:"negative",text:"High food spending",detail:`${c.percentage}% of expenses`}),o&&o.amount>3e3&&a.push({type:"negative",text:"High bank charges",detail:`₦${D(o.amount)} this month`}),a}function j(t){const[e,n]=t.split("-");return`${["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(n)-1]} ${e}`}function ie(){return{currentMonthKey:null,currentMonthLabel:"No Data",income:0,spending:0,netPosition:0,savingsRate:0,savingsAmount:0,categories:[],healthScore:0,healthFactors:[],totalTransactions:0,months:[],monthlyData:{}}}function D(t){return t>=1e6?(t/1e6).toFixed(1).replace(/\.0$/,"")+"M":t.toLocaleString("en-NG",{maximumFractionDigits:0})}function f(t){return"₦"+D(t)}function H(t){if(!t||!t.categories||t.categories.length===0)return[];const e=[],{income:n,spending:s,savingsRate:i,savingsAmount:a,categories:o,healthScore:l,spendingChange:r}=t;i>=30?e.push({type:"success",icon:"🏆",title:"Outstanding Saver!",body:`You're saving ${Math.round(i)}% of your income. That's exceptional discipline — you're building real wealth.`,priority:1}):i>=20?e.push({type:"success",icon:"🎉",title:"Great Savings Habit",body:`${Math.round(i)}% savings rate is above the recommended 20%. Keep this momentum going!`,priority:2}):i>=10?e.push({type:"info",icon:"📊",title:"Room to Grow",body:`You're saving ${Math.round(i)}% of income. The sweet spot is 20% — you're ${Math.round(20-i)}% away. Small adjustments can get you there.`,priority:3}):i>=0&&e.push({type:"warning",icon:"⚠️",title:"Low Savings Rate",body:`Only ${Math.round(i)}% of your income was saved this month. Consider automating a transfer to a savings app right after salary lands.`,priority:1});const c=o.find(p=>p.name==="Food & Groceries");c&&c.percentage>25&&e.push({type:"info",icon:"🍳",title:"Food Spending is High",body:`Food & groceries make up ${c.percentage}% of your spending (${f(c.amount)}). Consider meal prepping on weekends or buying in bulk at markets.`,priority:4});const d=o.find(p=>p.name==="Transport");d&&d.change&&d.change>20&&e.push({type:"warning",icon:"🚗",title:"Transport Costs Rising",body:`Transport spending increased ${d.change}% compared to last month. Consider carpooling or combining errands to reduce trips.`,priority:4});const v=o.find(p=>p.name==="Data & Airtime");v&&n>0&&v.amount/n>.05&&e.push({type:"info",icon:"📱",title:"Data Spend is Notable",body:`You spent ${f(v.amount)} on data and airtime. Have you considered a monthly WiFi plan? It could save you up to 40%.`,priority:5});const u=o.find(p=>p.name==="Bank Charges");u&&u.amount>2e3&&e.push({type:"warning",icon:"🏛️",title:"Bank Charges Adding Up",body:`You paid ${f(u.amount)} in bank fees this month. Try limiting ATM withdrawals and using free transfer channels.`,priority:3});const g=o.find(p=>p.name==="Entertainment");g&&g.percentage>15&&e.push({type:"info",icon:"🎬",title:"Entertainment Spending",body:`Entertainment takes ${g.percentage}% of your spending. Some subscriptions might overlap — review if you really use them all.`,priority:5});const y=o.find(p=>p.name==="Housing");return y&&n>0&&y.amount/n>.3&&e.push({type:"warning",icon:"🏠",title:"Housing Pressure",body:`Rent is ${Math.round(y.amount/n*100)}% of your income. The recommended ceiling is 30%. This puts pressure on every other area of your budget.`,priority:2}),r!==null&&r>15?e.push({type:"warning",icon:"📈",title:"Spending Increased",body:`Overall spending rose ${Math.round(r)}% vs last month. Take a look at which categories grew the most.`,priority:3}):r!==null&&r<-10&&e.push({type:"success",icon:"📉",title:"Spending Decreased",body:`Great news — you spent ${Math.round(Math.abs(r))}% less than last month. That extra money can go straight to your goals.`,priority:3}),a>0&&e.push({type:"success",icon:"💰",title:"Active Saver",body:`You moved ${f(a)} to savings/investment platforms this month. Your future self will thank you.`,priority:2}),l>=80?e.push({type:"success",icon:"💚",title:"Excellent Financial Health",body:`Your health score is ${l}/100. You're managing your money better than most. Stay consistent!`,priority:1}):l<50&&e.push({type:"warning",icon:"🔧",title:"Financial Health Needs Attention",body:`Your score is ${l}/100. Focus on increasing your savings rate and reducing lifestyle spending. Small wins compound.`,priority:1}),e.sort((p,m)=>p.priority-m.priority),e}function oe(){return{html:`
    <div class="welcome-page">
      <div class="welcome-bg">
        <div class="welcome-circles">
          <div class="welcome-circle"></div>
          <div class="welcome-circle"></div>
          <div class="welcome-circle"></div>
          <div class="welcome-circle-center"></div>
        </div>
      </div>

      <div class="welcome-header">
        <div class="welcome-logo-icon">K</div>
        <button class="welcome-skip" id="skip-btn">SKIP</button>
      </div>

      <div class="welcome-visual"></div>

      <div class="welcome-content anim-fade-in-up">
        <div class="welcome-chip">Financial Clarity</div>
        <h1 class="welcome-headline">
          Understand your<br/>money. <em>Clearly.</em>
        </h1>
        <p class="welcome-subtitle">
          Upload your bank statement. Get real insights in minutes. No bank login required.
        </p>
      </div>

      <div class="welcome-actions">
        <button class="welcome-cta anim-fade-in-up delay-2" id="get-started-btn">
          <span>Get Started</span>
          <div class="welcome-cta-icon">→</div>
        </button>
        <button class="welcome-demo anim-fade-in-up delay-3" id="try-demo-btn">
          Try with demo data
        </button>
      </div>
    </div>
  `,init(){const e=document.getElementById("get-started-btn"),n=document.getElementById("try-demo-btn"),s=document.getElementById("skip-btn");e==null||e.addEventListener("click",()=>{b("privacy")}),s==null||s.addEventListener("click",()=>{V()}),n==null||n.addEventListener("click",()=>{V()})}}}function V(){h.set({isDemo:!0,userName:"Alexandra"});const t=q(G,h.get("userCategoryRules")),e=B(t),n=H(e);h.set({transactions:G,categorisedTransactions:t,analytics:e,tips:n,hasCompletedOnboarding:!0}),b("dashboard")}function se(){return{html:`
    <div class="privacy-page">
      <div class="privacy-shield anim-scale-in">
        <div class="privacy-shield-pulse"></div>
        <div class="privacy-shield-icon">🛡️</div>
      </div>

      <h2 class="privacy-title anim-fade-in-up delay-1">Your data stays yours</h2>
      <p class="privacy-subtitle anim-fade-in-up delay-2">We built KoboSense with privacy at the core.</p>

      <div class="privacy-pillars">
        <div class="privacy-pillar anim-fade-in-up delay-2">
          <div class="privacy-pillar-icon">🔒</div>
          <div class="privacy-pillar-text">
            <h4>We don't move money</h4>
            <p>We only analyze. No transactions, no transfers, no access to your funds.</p>
          </div>
        </div>

        <div class="privacy-pillar anim-fade-in-up delay-3">
          <div class="privacy-pillar-icon">🔐</div>
          <div class="privacy-pillar-text">
            <h4>Bank-grade encryption</h4>
            <p>AES-256 encryption standard. Your statement data is processed securely in your browser.</p>
          </div>
        </div>

        <div class="privacy-pillar anim-fade-in-up delay-4">
          <div class="privacy-pillar-icon">🚫</div>
          <div class="privacy-pillar-text">
            <h4>No bank passwords</h4>
            <p>We never ask for your banking credentials. Just upload, and we'll handle the rest.</p>
          </div>
        </div>
      </div>

      <div class="privacy-actions">
        <button class="btn btn-primary btn-full btn-lg anim-fade-in-up delay-5" id="accept-btn">
          Accept & Continue
        </button>
      </div>
    </div>
  `,init(){var e;(e=document.getElementById("accept-btn"))==null||e.addEventListener("click",()=>{b("bank-select")})}}}function re(){const t=Object.entries(Q),e=h.get("selectedBanks")||[];return{html:`
    <div class="bank-page">
      <div class="bank-header">
        <div class="bank-header-nav">
          <div class="bank-back" id="bank-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div class="bank-menu"><div class="bank-menu-line"></div></div>
        </div>
        <div class="bank-label anim-fade-in-up delay-1">Connect</div>
        <h1 class="bank-title anim-fade-in-up delay-1">Choose Institution</h1>
        <p class="bank-subtitle anim-fade-in-up delay-2">Select your primary bank to begin analysis.</p>
      </div>

      <div class="bank-list anim-fade-in-up delay-2" id="bank-list">
        ${t.map(([i,a])=>`
    <div class="bank-card ${e.includes(i)?"selected":""}" data-bank="${i}">
      <div class="bank-card-icon" style="background: ${a.brandColor}">
        ${a.name.charAt(0)}
      </div>
      <div class="bank-card-info">
        <h3>${a.name}</h3>
        <p>${a.subtitle}</p>
      </div>
      <div class="bank-card-check">✓</div>
    </div>
  `).join("")}
      </div>

      <div class="bank-import-link anim-fade-in delay-3">
        <a href="#" id="import-link">Or import via CSV/PDF</a>
      </div>

      <div class="bank-actions">
        <button class="btn btn-primary btn-full btn-lg" id="bank-continue" disabled>
          Continue
        </button>
      </div>
    </div>
  `,init(){var l,r;const i=document.getElementById("bank-list"),a=document.getElementById("bank-continue");let o=new Set(e);i==null||i.addEventListener("click",c=>{const d=c.target.closest(".bank-card");if(!d)return;const v=d.dataset.bank;o.has(v)?(o.delete(v),d.classList.remove("selected")):(o.add(v),d.classList.add("selected")),a.disabled=o.size===0,h.set({selectedBanks:[...o]})}),a==null||a.addEventListener("click",()=>{o.size>0&&b("upload")}),(l=document.getElementById("bank-back"))==null||l.addEventListener("click",()=>{b("privacy")}),(r=document.getElementById("import-link"))==null||r.addEventListener("click",c=>{c.preventDefault(),b("upload")})}}}function de(t){const e=t.trim().split(/\r?\n/);if(e.length<2)throw new Error("We couldn't read that file. It seems empty.");const n=ce(e[0]),s=e.map(l=>le(l,n)),i=s[0].map(l=>l.toLowerCase().trim()),a=pe(i);if(!a)throw new Error("We couldn't recognize the columns in this file. Make sure it has Date, Description, and Amount columns.");const o=[];for(let l=1;l<s.length;l++){const r=s[l];if(!(r.length<3))try{const c=ue(r,a);c&&c.amount>0&&(c.id=`txn-${l}`,o.push(c))}catch{continue}}if(o.length===0)throw new Error("We found the file, but couldn't extract any transactions. Try a different format.");return o.sort((l,r)=>new Date(r.date)-new Date(l.date)),o}function ce(t){const e=[",","	",";","|"];let n=",",s=0;for(const i of e){const a=(t.match(new RegExp(ge(i),"g"))||[]).length;a>s&&(s=a,n=i)}return n}function le(t,e){const n=[];let s="",i=!1;for(let a=0;a<t.length;a++){const o=t[a];o==='"'?i&&t[a+1]==='"'?(s+='"',a++):i=!i:o===e&&!i?(n.push(s.trim()),s=""):s+=o}return n.push(s.trim()),n}function pe(t){const e={};for(let n=0;n<t.length;n++){const s=t[n];/date|trans.*date|posting.*date|value.*date/i.test(s)?e.date=n:/desc|narration|particular|detail|remark|reference/i.test(s)?e.description===void 0&&(e.description=n):/^debit$|debit.*amount|dr/i.test(s)?e.debit=n:/^credit$|credit.*amount|cr/i.test(s)?e.credit=n:/^amount$/i.test(s)&&e.debit===void 0?e.amount=n:/type|dr.cr|transaction.*type/i.test(s)&&(e.type=n)}return e.date===void 0||e.description===void 0||e.debit===void 0&&e.credit===void 0&&e.amount===void 0?null:e}function ue(t,e){const n=t[e.date]||"",s=t[e.description]||"",i=ve(n);if(!i)return null;const a=me(s);if(!a)return null;let o=0,l="debit";if(e.debit!==void 0&&e.credit!==void 0){const r=R(t[e.debit]),c=R(t[e.credit]);c>0?(o=c,l="credit"):(o=r,l="debit")}else if(e.amount!==void 0)if(o=R(t[e.amount]),e.type!==void 0){const r=(t[e.type]||"").toLowerCase().trim();l=/cr|credit|c/i.test(r)?"credit":"debit"}else l=o<0?"debit":"credit",o=Math.abs(o);return{date:i,description:a,amount:o,type:l,originalDesc:s.trim()}}function ve(t){if(!t||t.trim()==="")return null;t=t.trim().replace(/['"]/g,"");const e=new Date(t);if(!isNaN(e.getTime())&&e.getFullYear()>2e3)return e.toISOString().split("T")[0];const n=t.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(n){const[,s,i,a]=n,o=new Date(a,i-1,s);if(!isNaN(o.getTime()))return o.toISOString().split("T")[0]}return null}function R(t){if(!t||t.trim()===""||t.trim()==="-")return 0;const e=t.replace(/[₦,\s"'NGN]/g,"").trim(),n=parseFloat(e);return isNaN(n)?0:n}function me(t){if(!t)return"";let e=t.replace(/^(TRF|NEFT|NIP|USSD|MC|POS|ATM|WEB|MOB|FT)\s*[-\/:]?\s*/gi,"").replace(/\b(TRF|NEFT|NIP|USSD)\b/gi,"").replace(/\bF[IT]\d+\b/gi,"").replace(/\b\d{10,}\b/g,"").replace(/\b[A-Z]{2,3}\d{6,}\b/g,"").replace(/\s{2,}/g," ").trim();return e===e.toUpperCase()&&e.length>3&&(e=e.toLowerCase().replace(/\b\w/g,n=>n.toUpperCase())),e||t.trim()}function ge(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ye(){return{html:`
    <div class="upload-page">
      <div class="bank-header">
        <div class="bank-header-nav">
          <div class="bank-back" id="upload-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <div class="bank-label anim-fade-in-up delay-1">Upload</div>
        <h1 class="bank-title anim-fade-in-up delay-1">Your Statement</h1>
        <p class="bank-subtitle anim-fade-in-up delay-2">Upload your bank statement to begin analysis.</p>
      </div>

      <div class="upload-zone anim-fade-in-up delay-2" id="upload-zone">
        <div class="upload-zone-icon">📄</div>
        <h3>Drag & Drop</h3>
        <p>or tap to browse files</p>
        <p class="upload-browse">Supports CSV or PDF (Max 5MB)</p>
        <input type="file" id="file-input" accept=".csv,.pdf,.CSV,.PDF" style="display:none" />
        <div id="file-info-container"></div>
      </div>

      <div class="upload-help anim-fade-in delay-3" id="help-link">
        <span>❓</span>
        <span>How to download your statement</span>
      </div>

      <div style="flex:1"></div>

      <div class="bank-actions">
        <button class="btn btn-primary btn-full btn-lg" id="upload-continue" disabled>
          Analyze Statement
        </button>
      </div>

      <div id="help-tooltip" style="display:none; padding: 0 24px; margin-top: -16px;">
        <div class="card" style="padding: 16px; font-size: 13px; color: var(--color-text-secondary); line-height: 1.7;">
          <strong style="color: var(--color-text);">Steps:</strong><br/>
          1. Log in to your bank's mobile app or internet banking<br/>
          2. Navigate to "Account Statement" or "Transaction History"<br/>
          3. Select a date range (1-3 months recommended)<br/>
          4. Download as CSV or PDF<br/>
          5. Upload the file here
        </div>
      </div>
    </div>
  `,init(){var r;const e=document.getElementById("upload-zone"),n=document.getElementById("file-input"),s=document.getElementById("upload-continue"),i=document.getElementById("help-link"),a=document.getElementById("help-tooltip");let o=null;e.addEventListener("dragover",c=>{c.preventDefault(),e.classList.add("drag-over")}),e.addEventListener("dragleave",()=>{e.classList.remove("drag-over")}),e.addEventListener("drop",c=>{c.preventDefault(),e.classList.remove("drag-over");const d=c.dataTransfer.files;d.length>0&&l(d[0])}),e.addEventListener("click",()=>{n.click()}),n.addEventListener("change",c=>{c.target.files.length>0&&l(c.target.files[0])}),i.addEventListener("click",()=>{a.style.display=a.style.display==="none"?"block":"none"}),(r=document.getElementById("upload-back"))==null||r.addEventListener("click",()=>{b("bank-select")});function l(c){var u;if(c.size>5*1024*1024){alert("That file is too large. Please use a file under 5MB.");return}const d=c.name.split(".").pop().toLowerCase();if(!["csv","pdf"].includes(d)){alert("This file type isn't supported yet. Please use CSV or PDF.");return}o=c,s.disabled=!1;const v=document.getElementById("file-info-container");v.innerHTML=`
          <div class="upload-file-info">
            <div class="upload-file-icon">${d==="csv"?"📊":"📄"}</div>
            <div>
              <div class="upload-file-name">${c.name}</div>
              <div class="upload-file-size">${(c.size/1024).toFixed(1)} KB</div>
            </div>
            <div class="upload-file-remove" id="remove-file">✕</div>
          </div>
        `,(u=document.getElementById("remove-file"))==null||u.addEventListener("click",g=>{g.stopPropagation(),o=null,v.innerHTML="",s.disabled=!0,n.value=""})}s.addEventListener("click",async()=>{if(!o)return;if(o.name.split(".").pop().toLowerCase()==="csv")try{const d=await o.text(),v=de(d);h.set({transactions:v}),b("parsing")}catch(d){alert(d.message||"We couldn't read that file. Try a clear CSV.")}else alert("PDF parsing is coming soon! For now, please export your statement as CSV from your banking app.")})}}}function he(){return{html:`
    <div class="parsing-page">
      <div class="parsing-animation">
        <div class="parsing-ring"></div>
        <div class="parsing-icon">📄</div>
      </div>

      <h2 class="font-display text-2xl" style="margin-bottom: 8px;">Analyzing Statement</h2>
      <p class="text-sm text-muted" style="margin-bottom: 40px;">This usually takes a few seconds</p>

      <div class="parsing-steps" id="parsing-steps">
        <div class="parsing-step active" id="step-1">
          <div class="parsing-step-dot"></div>
          <span>Reading transaction dates...</span>
        </div>
        <div class="parsing-step" id="step-2">
          <div class="parsing-step-dot"></div>
          <span>Categorizing vendors...</span>
        </div>
        <div class="parsing-step" id="step-3">
          <div class="parsing-step-dot"></div>
          <span>Calculating health score...</span>
        </div>
      </div>
    </div>
  `,init(){const e=h.get("transactions"),n=h.get("userCategoryRules")||{};setTimeout(()=>{var i,a;(i=document.getElementById("step-1"))==null||i.classList.replace("active","done"),(a=document.getElementById("step-2"))==null||a.classList.add("active");const s=q(e,n);h.set({categorisedTransactions:s}),setTimeout(()=>{var r,c;(r=document.getElementById("step-2"))==null||r.classList.replace("active","done"),(c=document.getElementById("step-3"))==null||c.classList.add("active");const o=B(s),l=H(o);h.set({analytics:o,tips:l,hasCompletedOnboarding:!0}),setTimeout(()=>{var d;(d=document.getElementById("step-3"))==null||d.classList.replace("active","done"),setTimeout(()=>{b("review")},400)},800)},900)},1e3)}}}function be(){const t=h.get("categorisedTransactions")||[],e=t.slice(0,50).map((a,o)=>`
    <div class="review-item anim-fade-in-up delay-${Math.min(o%5+1,5)}" data-index="${o}">
      <div class="review-item-avatar" style="background: ${a.categoryColor}20; color: ${a.categoryColor}">
        ${a.categoryIcon}
      </div>
      <div class="review-item-info">
        <div class="review-item-desc">${a.description}</div>
        <span class="review-item-category" data-index="${o}" id="cat-pill-${o}">
          ${a.category}
        </span>
      </div>
      <div class="review-item-amount">
        <div class="review-item-value ${a.type}">
          ${a.type==="debit"?"- ":"+ "}${f(a.amount)}
        </div>
        <div class="review-item-date">${fe(a.date)}</div>
      </div>
    </div>
  `).join(""),n=t.length,s=new Set(t.map(a=>a.category)).size;return{html:`
    <div class="review-page">
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px));">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="review-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <h1 class="bank-title">Review Transactions</h1>
        <p class="bank-subtitle" style="margin-top: 4px;">${n} transactions found · ${s} categories detected</p>
      </div>

      <div class="review-body" id="review-list">
        ${e}
      </div>

      <div class="review-actions">
        <button class="btn btn-accent btn-full btn-lg" id="review-done">
          Looks Good — Continue
        </button>
      </div>
    </div>

    <div id="category-dropdown" class="category-dropdown" style="display:none; position:fixed;"></div>
  `,init(){var l,r,c;const a=document.getElementById("category-dropdown");let o=null;(l=document.getElementById("review-list"))==null||l.addEventListener("click",d=>{var p;const v=d.target.closest(".review-item-category");if(!v){a.style.display="none";return}const u=parseInt(v.dataset.index);o=u;const g=v.getBoundingClientRect();a.style.display="block",a.style.top=g.bottom+4+"px",a.style.left=Math.max(16,Math.min(g.left,window.innerWidth-200))+"px";const y=((p=t[u])==null?void 0:p.category)||"";a.innerHTML=Y.map(m=>`
          <div class="category-dropdown-item ${m.name===y?"selected":""}" data-category="${m.name}">
            <span>${m.icon}</span>
            <span>${m.name}</span>
          </div>
        `).join("")}),a==null||a.addEventListener("click",d=>{var p;const v=d.target.closest(".category-dropdown-item");if(!v||o===null)return;const u=v.dataset.category,g=t[o],y=Y.find(m=>m.name===u);if(g&&y){g.category=y.name,g.categoryIcon=y.icon,g.categoryColor=y.color;const m=document.getElementById(`cat-pill-${o}`);m&&(m.textContent=y.name);const w=(p=m==null?void 0:m.closest(".review-item"))==null?void 0:p.querySelector(".review-item-avatar");w&&(w.style.background=y.color+"20",w.style.color=y.color,w.textContent=y.icon);const k=h.get("userCategoryRules")||{},T=g.description.toLowerCase().split(" ").slice(0,2).join(" ");k[T]=u,h.set({userCategoryRules:k})}a.style.display="none",o=null}),document.addEventListener("click",d=>{!d.target.closest(".review-item-category")&&!d.target.closest(".category-dropdown")&&(a.style.display="none")}),(r=document.getElementById("review-back"))==null||r.addEventListener("click",()=>{b("upload")}),(c=document.getElementById("review-done"))==null||c.addEventListener("click",()=>{h.set({categorisedTransactions:[...t]});const d=B(t),v=H(d);h.set({analytics:d,tips:v}),b("dashboard")})}}}function fe(t){const e=new Date(t);return`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()]} ${e.getDate()}`}const $={home:`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  `,analytics:`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  `,insights:`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a6 6 0 0 1 6 6c0 2.97-1.4 5.5-4 6.5-.13.05-.26.11-.4.16l-.2.08c-.06.02-.12.04-.19.06l-.2.06c-.06.02-.13.03-.19.05l-.2.05c-.07.02-.13.03-.2.05l-.2.04c-.07.01-.13.02-.2.04l-.2.03c-.07.01-.14.02-.21.03l-.2.02c-.07.01-.14.01-.21.02H11c-.07 0-.14 0-.21-.02l-.2-.02c-.07-.01-.14-.02-.21-.03l-.2-.03c-.07-.02-.13-.03-.2-.04l-.2-.04c-.07-.02-.13-.03-.2-.05l-.2-.05c-.06-.02-.13-.03-.19-.05l-.2-.06c-.07-.02-.13-.04-.19-.06l-.2-.08C7.4 13.5 6 10.97 6 8a6 6 0 0 1 6-6z"></path>
      <path d="M9 18h6"></path>
      <path d="M10 22h4"></path>
    </svg> 
  `,profile:`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  `};function x(t="home"){return`
    <div class="tab-bar">
      ${[{id:"home",label:"Home",icon:$.home,route:"dashboard"},{id:"analytics",label:"Analytics",icon:$.analytics,route:"health"},{id:"insights",label:"Insights",icon:$.insights,route:"insights"},{id:"profile",label:"Profile",icon:$.profile,route:""}].map(n=>`
        <div class="tab-item ${n.id===t?"active":""}" data-tab="${n.route||n.id}">
          <div class="tab-item-icon">${n.icon}</div>
        </div>
      `).join("")}
    </div>
  `}function we(t){const e=Ee(t.date),n=t.type==="debit";return`
    <div class="txn-card">
      <div class="txn-icon" style="background: ${t.categoryColor}15; color: ${t.categoryColor}">
        ${t.categoryIcon||"📋"}
      </div>
      <div class="txn-info">
        <div class="txn-desc">${t.description}</div>
        <div class="txn-category">${t.category||"Uncategorised"}</div>
      </div>
      <div class="txn-amount">
        <div class="txn-value ${t.type}">${n?"- ":"+ "}${f(t.amount)}</div>
        <div class="txn-date">${e}</div>
      </div>
    </div>
  `}function Ee(t){const e=new Date(t),s=Math.floor((new Date-e)/(1e3*60*60*24));return s===0?"Today":s===1?"Yesterday":s<7?`${s}d ago`:`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()]} ${e.getDate()}`}function ke(){const t=h.get("analytics"),e=h.get("categorisedTransactions")||[],n=h.get("userName")||"User";if(!t)return b("welcome",{replace:!0}),{html:"",init(){}};const s=Se(),i=e.slice(0,5),a=Te(e),o=Math.max(...a.map(d=>d.amount),1),l=i.map(d=>we(d)).join(""),r=a.map(d=>{const v=Math.max(6,d.amount/o*36),u=d.amount>t.spending/4.5;return`<div class="dash-spending-bar-item ${d.amount>0?u?"over":"active":""}" style="height:${v}px"></div>`}).join("");return{html:`
    <div class="dashboard-page">
      <div class="dash-header">
        <div class="dash-header-bg"></div>
        
        <div class="dash-greeting">
          <div class="dash-greeting-left">
            <div class="dash-greeting-avatar">${n.charAt(0)}</div>
            <div class="dash-greeting-text">
              <span class="dash-greeting-label">${s}</span>
              <span class="dash-greeting-name">${n}</span>
            </div>
          </div>
          <div class="dash-notification" id="notification-btn">
            🔔
            <div class="dash-notification-dot"></div>
          </div>
        </div>

        <div class="dash-wealth anim-fade-in-up delay-1">
          <div class="dash-wealth-label">Net Position</div>
          <div class="dash-wealth-amount">${f(Math.abs(t.netPosition))}</div>
          <div class="dash-wealth-change">
            ${t.netPosition>=0?"📈":"📉"} 
            ${t.netPosition>=0?"+":""}${f(t.netPosition)}
          </div>
        </div>
      </div>

      <div class="dash-body">
        <!-- Stats Row -->
        <div class="dash-stats anim-fade-in-up delay-2">
          <div class="card" style="padding:16px">
            <div class="stat-card-label">Monthly Spend</div>
            <div class="stat-card-value">${f(t.spending)}</div>
            ${t.spendingChange!==null?`
              <div class="stat-card-trend ${t.spendingChange>0?"up":"down"}">
                ${t.spendingChange>0?"↑":"↓"} ${Math.abs(Math.round(t.spendingChange))}%
              </div>
            `:""}
          </div>
          <div class="card" style="padding:16px">
            <div class="stat-card-label">Savings Rate</div>
            <div class="stat-card-value">${Math.round(t.savingsRate)}%</div>
            ${t.prevSavingsRate!==null?`
              <div class="stat-card-trend ${t.savingsRate>=t.prevSavingsRate?"down":"up"}">
                ${t.savingsRate>=t.prevSavingsRate?"↑":"↓"} vs last month
              </div>
            `:""}
          </div>
        </div>

        <!-- Spending Limit -->
        <div class="dash-spending anim-fade-in-up delay-3">
          <div class="dash-spending-label">Spending Pattern</div>
          <div class="dash-spending-row">
            <div class="dash-spending-amount">${f(t.spending)}</div>
            <div class="dash-spending-period">/ 1M</div>
          </div>
          <div class="dash-spending-bar">
            ${r}
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="dash-recent anim-fade-in-up delay-4">
          <div class="dash-recent-header">
            <div class="dash-recent-title">Recent</div>
            <div class="dash-recent-link" id="view-all-link">View All</div>
          </div>
          <div class="dash-transactions">
            ${l}
          </div>
        </div>
      </div>

      ${x("home")}
    </div>
  `,init(){var d;(d=document.getElementById("view-all-link"))==null||d.addEventListener("click",()=>{b("breakdown")}),document.querySelectorAll(".tab-item").forEach(v=>{v.addEventListener("click",()=>{const u=v.dataset.tab;u&&u!=="home"&&b(u)})})}}}function Se(){const t=new Date().getHours();return t<12?"Good Morning":t<17?"Good Afternoon":"Good Evening"}function Te(t){const e=t.filter(s=>s.type==="debit");if(e.length===0)return Array(8).fill({amount:0});const n={};return e.forEach(s=>{const i=new Date(s.date).getDate(),a=Math.ceil(i/4);n[a]=(n[a]||0)+s.amount}),Array.from({length:8},(s,i)=>({amount:n[i+1]||0}))}function xe(t,e){const n=t.getContext("2d"),s=window.devicePixelRatio||1,i=t.clientWidth||240,a=t.clientHeight||240;t.width=i*s,t.height=a*s,n.scale(s,s);const o=i/2,l=a/2,r=Math.min(o,l)-8,c=r*.62,d=.03,v=e.reduce((m,w)=>m+w.amount,0);if(v===0)return;let u=0;const g=1200,y=performance.now();function p(m){const w=m-y;u=Math.min(w/g,1);const k=1-Math.pow(1-u,3);n.clearRect(0,0,i,a);let T=-Math.PI/2;for(const M of e){const L=M.amount/v*Math.PI*2*k;if(L<.01)continue;const U=T+d/2,K=T+L-d/2;n.beginPath(),n.arc(o,l,r,U,K),n.arc(o,l,c,K,U,!0),n.closePath(),n.fillStyle=M.color,n.fill(),n.shadowColor=M.color+"40",n.shadowBlur=4,n.fill(),n.shadowColor="transparent",n.shadowBlur=0,T+=L}n.beginPath(),n.arc(o,l,c-1,0,Math.PI*2),n.fillStyle="#FFFFFF",n.fill(),u<1&&requestAnimationFrame(p)}requestAnimationFrame(p)}function Ce(){const t=h.get("analytics");if(!t)return b("welcome",{replace:!0}),{html:"",init(){}};const{categories:e,spending:n,currentMonthLabel:s}=t,i=e.map((r,c)=>`
    <div class="category-card anim-fade-in-up delay-${Math.min(c+1,5)}" data-category="${r.name}">
      <div class="category-dot" style="background: ${r.color}"></div>
      <div class="category-info">
        <div class="category-name">${r.name}</div>
        <div class="category-pct">${r.percentage}% of spending · ${r.count} transactions</div>
      </div>
      <div class="category-amount">
        <div class="category-value">${f(r.amount)}</div>
        ${r.change!==null?`
          <div class="category-trend ${r.change>0?"up":"down"}">
            ${r.change>0?"↑":"↓"} ${Math.abs(r.change)}%
          </div>
        `:""}
      </div>
    </div>
  `).join(""),a=e.filter(r=>r.change!==null&&r.change>0).sort((r,c)=>c.change-r.change)[0],o=a?`${a.name} increased ${a.change}% compared to last month.`:e.length>0?`${e[0].name} is your largest expense category at ${e[0].percentage}% of total spending.`:"Upload more data to see spending insights.";return{html:`
    <div class="breakdown-page">
      <div class="breakdown-header">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="breakdown-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <div class="health-month">${s}</div>
        <h1 class="breakdown-title">Spending Breakdown</h1>
      </div>

      <div class="breakdown-body">
        <div class="donut-container" id="donut-container">
          <canvas id="donut-canvas" width="240" height="240"></canvas>
          <div class="donut-center-text">
            <div class="donut-center-label">Total</div>
            <div class="donut-center-value">${f(n)}</div>
          </div>
        </div>

        <div class="breakdown-insight anim-fade-in-up delay-2">
          <div class="breakdown-insight-icon">💡</div>
          <div>${o}</div>
        </div>

        <div style="margin-top: var(--space-xl)">
          <div class="category-list">
            ${i}
          </div>
        </div>
      </div>

      ${x("analytics")}
    </div>
  `,init(){var c;const r=document.getElementById("donut-canvas");r&&e.length>0&&xe(r,e),(c=document.getElementById("breakdown-back"))==null||c.addEventListener("click",()=>{b("dashboard")}),document.querySelectorAll(".tab-item").forEach(d=>{d.addEventListener("click",()=>{const v=d.dataset.tab;v&&b(v==="home"?"dashboard":v)})})}}}function Ae(){const t=h.get("analytics");if(!t)return b("welcome",{replace:!0}),{html:"",init(){}};const{healthScore:e,healthFactors:n,spending:s,savingsRate:i,savingsAmount:a,currentMonthLabel:o,income:l,netPosition:r}=t,c=n.filter(p=>p.type==="positive"),d=n.filter(p=>p.type==="negative"),v=c.map(p=>`
    <div class="health-factor">
      <div class="health-factor-icon positive">✓</div>
      <div class="health-factor-text">
        <strong>${p.text}</strong>${p.detail?` · ${p.detail}`:""}
      </div>
    </div>
  `).join(""),u=d.map(p=>`
    <div class="health-factor">
      <div class="health-factor-icon negative">!</div>
      <div class="health-factor-text">
        <strong>${p.text}</strong>${p.detail?` · ${p.detail}`:""}
      </div>
    </div>
  `).join(""),g=e>=80?"Excellent":e>=60?"Healthy":e>=40?"Fair":"Needs Work";return{html:`
    <div class="health-page">
      <div class="health-header">
        <div class="health-header-nav">
          <div class="health-logo">KoboSense.</div>
          <div class="health-menu" id="health-menu">☰</div>
        </div>
        <div class="health-month anim-fade-in-up">${o}</div>
        <h1 class="health-title anim-fade-in-up delay-1">Health Overview</h1>
      </div>

      <div class="health-body">
        <!-- Score Card -->
        <div class="score-card anim-scale-in delay-1">
          <div class="score-card-bg"></div>
          <div class="score-card-label">Cash Flow Score</div>
          <div class="score-card-value" id="score-value">0</div>
          <div class="progress-bar score-card-bar">
            <div class="progress-bar-fill" id="score-bar" style="width: 0%"></div>
          </div>
        </div>

        <!-- Stat Grid -->
        <div class="stat-grid anim-fade-in-up delay-2">
          <div class="stat-card">
            <div class="stat-card-label">Monthly Spend</div>
            <div class="stat-card-value">${f(s)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Savings Rate</div>
            <div class="stat-card-value">${Math.round(i)}%</div>
          </div>
          <div class="stat-card stat-card-full">
            <div class="stat-card-label">Net Savings</div>
            <div class="stat-card-value">${f(a)}</div>
            <div class="stat-card-trend ${a>0?"down":"up"}">
              ${a>0?"↑":"→"} ${a>0?"Active saver":"No savings detected"}
            </div>
          </div>
        </div>

        <!-- Health Factors -->
        ${c.length>0?`
          <div style="margin-top: var(--space-xl)">
            <div style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-success); font-weight: 600; margin-bottom: var(--space-md);">What Helped</div>
            <div class="health-detail-card anim-fade-in-up delay-3">
              ${v}
            </div>
          </div>
        `:""}

        ${d.length>0?`
          <div style="margin-top: var(--space-base)">
            <div style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-alert); font-weight: 600; margin-bottom: var(--space-md);">What Needs Attention</div>
            <div class="health-detail-card anim-fade-in-up delay-4">
              ${u}
            </div>
          </div>
        `:""}

        <div style="text-align: center; padding: var(--space-xl) 0; color: var(--color-text-muted); font-size: var(--text-sm);">
          Score: ${e}/100 · ${g}
        </div>
      </div>

      ${x("analytics")}
    </div>
  `,init(){Ie(e),document.querySelectorAll(".tab-item").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.tab;m&&b(m==="home"?"dashboard":m)})})}}}function Ie(t){const e=document.getElementById("score-value"),n=document.getElementById("score-bar");if(!e||!n)return;let s=0;const i=1500,a=performance.now();function o(l){const r=l-a,c=Math.min(r/i,1),d=1-Math.pow(1-c,3);s=Math.round(d*t),e.textContent=s,n.style.width=`${d*t}%`,c<1&&requestAnimationFrame(o)}setTimeout(()=>requestAnimationFrame(o),500)}function $e(){const t=h.get("tips")||[],e=h.get("analytics");if(!e)return b("welcome",{replace:!0}),{html:"",init(){}};const n=t.map((i,a)=>`
    <div class="insight-card ${i.type} anim-fade-in-up delay-${Math.min(a+1,5)}">
      <div class="insight-card-header">
        <div class="insight-card-icon">${i.icon}</div>
        <div class="insight-card-title">${i.title}</div>
      </div>
      <div class="insight-card-body">${i.body}</div>
    </div>
  `).join("");return{html:`
    <div class="insights-page">
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px));">
        <div class="health-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="health-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <div class="health-month anim-fade-in-up">${e.currentMonthLabel}</div>
        <h1 class="health-title anim-fade-in-up delay-1">Your Insights</h1>
        <p class="text-sm text-muted anim-fade-in-up delay-1" style="margin-top:4px">Personalised tips based on your spending</p>
      </div>

      <div class="insights-body">
        ${n.length>0?n:`
          <div class="empty-state">
            <div class="empty-state-icon">💡</div>
            <div class="empty-state-title">No insights yet</div>
            <div class="empty-state-text">Upload a statement to get personalised financial advice.</div>
          </div>
        `}
        
        <!-- Report CTA -->
        <div class="card anim-fade-in-up delay-5" style="margin-top: var(--space-xl); text-align: center; padding: var(--space-2xl);">
          <div style="font-size: 32px; margin-bottom: var(--space-md);">📊</div>
          <h3 class="font-display text-lg" style="margin-bottom: var(--space-sm);">Financial Report</h3>
          <p class="text-sm text-muted" style="margin-bottom: var(--space-lg);">Generate a branded PDF summary for visa applications, loan requests, or personal records.</p>
          <button class="btn btn-primary btn-full" id="generate-report">
            Generate Report
          </button>
        </div>
      </div>

      ${x("insights")}
    </div>
  `,init(){var i;(i=document.getElementById("generate-report"))==null||i.addEventListener("click",()=>{b("report")}),document.querySelectorAll(".tab-item").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.tab;o&&b(o==="home"?"dashboard":o)})})}}}function Me(){const t=h.get("analytics"),e=h.get("tips")||[];if(!t)return b("welcome",{replace:!0}),{html:"",init(){}};const{currentMonthLabel:n,income:s,spending:i,savingsRate:a,healthScore:o,categories:l,savingsAmount:r}=t,c=l.slice(0,5).map(u=>`
    <div style="display:flex; justify-content:space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border-light);">
      <span style="display:flex; align-items:center; gap:8px;">
        <span style="width:10px;height:10px;border-radius:50%;background:${u.color};flex-shrink:0;"></span>
        ${u.name}
      </span>
      <span style="font-weight:600">${f(u.amount)} <span style="color:var(--color-text-muted);font-weight:400;">(${u.percentage}%)</span></span>
    </div>
  `).join(""),d=e.slice(0,3).map(u=>`
    <div style="padding: 8px 0; border-bottom: 1px solid var(--color-border-light); font-size: var(--text-sm); display: flex; gap: 8px;">
      <span>${u.icon}</span>
      <span>${u.body}</span>
    </div>
  `).join("");return{html:`
    <div class="report-page">
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px));">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="report-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <h1 class="bank-title anim-fade-in-up">Financial Report</h1>
        <p class="bank-subtitle anim-fade-in-up delay-1" style="margin-top:4px">${n}</p>
      </div>

      <div class="report-body">
        <div class="report-preview anim-fade-in-up delay-1" id="report-content">
          <div class="report-brand">
            <div class="report-brand-logo">KoboSense.</div>
            <div class="report-brand-date">${n}</div>
          </div>

          <div class="report-section">
            <div class="report-section-title">Financial Summary</div>
            <div class="stat-grid" style="gap:12px">
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Total Income</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${f(s)}</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Total Spend</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${f(i)}</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Savings Rate</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${Math.round(a)}%</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Health Score</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${o}/100</div>
              </div>
            </div>
          </div>

          <div class="report-section">
            <div class="report-section-title">Top Spending Categories</div>
            ${c}
          </div>

          ${d.length>0?`
          <div class="report-section">
            <div class="report-section-title">Key Insights</div>
            ${d}
          </div>
          `:""}

          <div style="margin-top: var(--space-xl); padding-top: var(--space-lg); border-top: 1px solid var(--color-border-light); text-align:center;">
            <div style="font-family: var(--font-display); color: var(--color-primary); margin-bottom: 4px;">KoboSense.</div>
            <div style="font-size: var(--text-xs); color: var(--color-text-muted);">Generated on ${new Date().toLocaleDateString("en-NG",{year:"numeric",month:"long",day:"numeric"})} · Financial clarity for Africa</div>
          </div>
        </div>
      </div>

      <div class="report-actions anim-fade-in-up delay-3">
        <button class="btn btn-primary btn-full btn-lg" id="download-report">
          📥 Download PDF
        </button>
        <button class="btn btn-outline btn-full" id="share-report">
          ↗️ Share Report
        </button>
      </div>

      ${x("insights")}
    </div>
  `,init(){var u,g,y;(u=document.getElementById("report-back"))==null||u.addEventListener("click",()=>{b("insights")}),(g=document.getElementById("download-report"))==null||g.addEventListener("click",()=>{window.print()}),(y=document.getElementById("share-report"))==null||y.addEventListener("click",async()=>{if(navigator.share)try{await navigator.share({title:`KoboSense Report - ${n}`,text:`My Financial Health Score: ${o}/100. Savings Rate: ${Math.round(a)}%. View my full report.`,url:window.location.href})}catch{}else try{await navigator.clipboard.writeText(`My KoboSense Financial Report - ${n}
Health Score: ${o}/100
Savings Rate: ${Math.round(a)}%
Income: ${f(s)}
Spending: ${f(i)}`),W("Report summary copied to clipboard!")}catch{W("Could not copy to clipboard")}}),document.querySelectorAll(".tab-item").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.tab;m&&b(m==="home"?"dashboard":m)})})}}}function W(t){const e=document.querySelector(".toast");e&&e.remove();const n=document.createElement("div");n.className="toast",n.textContent=t,document.body.appendChild(n),setTimeout(()=>n.remove(),3e3)}E("welcome",oe);E("privacy",se);E("bank-select",re);E("upload",ye);E("parsing",he);E("review",be);E("dashboard",ke);E("breakdown",Ce);E("health",Ae);E("insights",$e);E("report",Me);document.addEventListener("DOMContentLoaded",()=>{h.get("hasCompletedOnboarding")&&!window.location.hash?window.location.hash="#dashboard":window.location.hash||(window.location.hash="#welcome"),Z()});
