(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const ee={};let $=null;function T(e,t){ee[e]=t}function k(e,t={}){const{replace:n=!1,transition:a="fade"}=t;n?history.replaceState(null,"",`#${e}`):history.pushState(null,"",`#${e}`),D(a)}async function D(e="fade"){const t=window.location.hash.slice(1)||"welcome",n=ee[t];if(!n){console.warn(`No route handler for: ${t}`);return}const a=document.getElementById("app");if($&&typeof $=="function"&&$(),a.children.length>0&&e!=="none"){const i=a.children[0];i.style.opacity="0",i.style.transform="translateY(8px)",i.style.transition="all 0.15s ease-out",await new Promise(o=>setTimeout(o,150))}a.innerHTML="";const s=await n();if(typeof s=="string"?a.innerHTML=s:s instanceof HTMLElement?a.appendChild(s):s&&s.html&&(a.innerHTML=s.html,s.init&&($=s.init())),e!=="none"){const i=a.children[0];i&&(i.style.opacity="0",i.style.transition="opacity 0.3s ease-out",requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.style.opacity="1"})}))}}function ie(){window.addEventListener("hashchange",()=>D("fade")),D("none")}const U="kobo-sense-state",P={userName:"User",selectedBanks:[],transactions:[],categorisedTransactions:[],userCategoryRules:{},analytics:null,healthScore:null,tips:[],currentMonth:null,isDemo:!1,hasCompletedOnboarding:!1,activeTab:"home"};function ae(){try{const e=localStorage.getItem(U);if(e)return{...P,...JSON.parse(e)}}catch(e){console.warn("Could not load saved state:",e)}return{...P}}function oe(e){try{const t={userName:e.userName,selectedBanks:e.selectedBanks,userCategoryRules:e.userCategoryRules,hasCompletedOnboarding:e.hasCompletedOnboarding};localStorage.setItem(U,JSON.stringify(t))}catch(t){console.warn("Could not save state:",t)}}const M=new Set;let A=ae();const S={get(e){return e?A[e]:{...A}},set(e){A={...A,...e},oe(A),M.forEach(t=>t(A))},subscribe(e){return M.add(e),()=>M.delete(e)},reset(){A={...P},localStorage.removeItem(U),M.forEach(e=>e(A))}},z=[{date:"2025-10-01",description:"SALARY PAYMENT - TECH CORP LTD",amount:85e4,type:"credit"},{date:"2025-10-15",description:"FREELANCE DESIGN - PAYSTACK TRANSFER",amount:15e4,type:"credit"},{date:"2025-10-22",description:"REFUND - JUMIA RETURNS",amount:12500,type:"credit"},{date:"2025-10-02",description:"LANDLORD ESTATE RENT PAYMENT OCT",amount:25e4,type:"debit"},{date:"2025-10-02",description:"LAWMA WASTE MANAGEMENT FEE",amount:3500,type:"debit"},{date:"2025-10-03",description:"SHOPRITE IKEJA CITY MALL POS",amount:35400,type:"debit"},{date:"2025-10-07",description:"CHICKEN REPUBLIC LEKKI POS",amount:4200,type:"debit"},{date:"2025-10-10",description:"SPAR SUPERMARKET ILUPEJU POS",amount:28700,type:"debit"},{date:"2025-10-14",description:"MARKET PURCHASE OYINGBO NIP",amount:15e3,type:"debit"},{date:"2025-10-18",description:"DOMINOS PIZZA VI POS",amount:8500,type:"debit"},{date:"2025-10-21",description:"LOCAL FOOD VENDOR MAMA PUT",amount:3500,type:"debit"},{date:"2025-10-25",description:"KFC IKEJA POS",amount:6800,type:"debit"},{date:"2025-10-28",description:"SHOPRITE LEKKI POS",amount:42100,type:"debit"},{date:"2025-10-03",description:"BOLT RIDE LEKKI TO VI",amount:3200,type:"debit"},{date:"2025-10-05",description:"TOTAL FILLING STATION FUEL",amount:25e3,type:"debit"},{date:"2025-10-08",description:"UBER TRIP MARYLAND TO IKEJA",amount:2800,type:"debit"},{date:"2025-10-12",description:"BOLT RIDE AJAH TO LEKKI",amount:4500,type:"debit"},{date:"2025-10-16",description:"OANDO FILLING STATION FUEL",amount:22e3,type:"debit"},{date:"2025-10-20",description:"BOLT RIDE VI TO IKOYI",amount:2100,type:"debit"},{date:"2025-10-26",description:"TOTAL FILLING STATION FUEL",amount:25e3,type:"debit"},{date:"2025-10-04",description:"EKO DISCO PREPAID ELECTRICITY TOKEN",amount:15e3,type:"debit"},{date:"2025-10-04",description:"DSTV PREMIUM SUBSCRIPTION SEPT",amount:29500,type:"debit"},{date:"2025-10-10",description:"IKEJA ELECTRIC DISCO TOKEN",amount:1e4,type:"debit"},{date:"2025-10-01",description:"MTN USSD AIRTIME PURCHASE",amount:5e3,type:"debit"},{date:"2025-10-05",description:"GLO DATA BUNDLE 10GB",amount:3500,type:"debit"},{date:"2025-10-12",description:"SPECTRANET INTERNET MONTHLY",amount:18500,type:"debit"},{date:"2025-10-20",description:"MTN USSD DATA BUNDLE 5GB",amount:3e3,type:"debit"},{date:"2025-10-25",description:"AIRTEL AIRTIME RECHARGE",amount:2e3,type:"debit"},{date:"2025-10-06",description:"NETFLIX MONTHLY SUBSCRIPTION",amount:7500,type:"debit"},{date:"2025-10-13",description:"SPOTIFY PREMIUM MONTHLY",amount:3500,type:"debit"},{date:"2025-10-19",description:"GENESIS CINEMA PALMS LEKKI",amount:8e3,type:"debit"},{date:"2025-10-27",description:"YOUTUBE PREMIUM SUBSCRIPTION",amount:2800,type:"debit"},{date:"2025-10-08",description:"JUMIA ONLINE PURCHASE",amount:35e3,type:"debit"},{date:"2025-10-15",description:"PAYPORTE CLOTHING PURCHASE",amount:22e3,type:"debit"},{date:"2025-10-01",description:"PIGGYVEST SAVINGS TRANSFER",amount:1e5,type:"debit"},{date:"2025-10-15",description:"COWRYWISE INVESTMENT TRF",amount:5e4,type:"debit"},{date:"2025-10-01",description:"SMS ALERT CHARGE OCT",amount:50,type:"debit"},{date:"2025-10-03",description:"NIP TRF CHARGE",amount:26.88,type:"debit"},{date:"2025-10-05",description:"ATM WITHDRAWAL INTERBANK FEE",amount:65,type:"debit"},{date:"2025-10-10",description:"ACCOUNT MAINTENANCE FEE",amount:1200,type:"debit"},{date:"2025-10-15",description:"STAMP DUTY CHARGE",amount:50,type:"debit"},{date:"2025-10-20",description:"NIP TRF CHARGE",amount:53.75,type:"debit"},{date:"2025-10-31",description:"COT COMMISSION ON TURNOVER",amount:500,type:"debit"},{date:"2025-10-09",description:"MEDPLUS PHARMACY LEKKI POS",amount:8500,type:"debit"},{date:"2025-11-01",description:"SALARY PAYMENT - TECH CORP LTD",amount:85e4,type:"credit"},{date:"2025-11-12",description:"FREELANCE UI PROJECT - FLUTTERWAVE TRF",amount:2e5,type:"credit"},{date:"2025-11-02",description:"LANDLORD ESTATE RENT PAYMENT NOV",amount:25e4,type:"debit"},{date:"2025-11-03",description:"SHOPRITE LEKKI POS",amount:38200,type:"debit"},{date:"2025-11-08",description:"THE FOOD MARKET VI POS",amount:12500,type:"debit"},{date:"2025-11-12",description:"CHICKEN REPUBLIC MARYLAND",amount:5200,type:"debit"},{date:"2025-11-16",description:"MARKET PURCHASE BALOGUN",amount:18e3,type:"debit"},{date:"2025-11-22",description:"SPAR SUPERMARKET LEKKI POS",amount:31500,type:"debit"},{date:"2025-11-28",description:"KFC PALMS POS",amount:7400,type:"debit"},{date:"2025-11-04",description:"BOLT RIDE LEKKI TO IKEJA",amount:5500,type:"debit"},{date:"2025-11-06",description:"TOTAL FILLING STATION FUEL",amount:27e3,type:"debit"},{date:"2025-11-14",description:"UBER TRIP ISLAND TO MAINLAND",amount:4200,type:"debit"},{date:"2025-11-20",description:"OANDO FUEL STATION",amount:23e3,type:"debit"},{date:"2025-11-27",description:"BOLT RIDE AJAH TO IKOYI",amount:6200,type:"debit"},{date:"2025-11-05",description:"EKO DISCO PREPAID TOKEN",amount:18e3,type:"debit"},{date:"2025-11-05",description:"DSTV COMPACT PLUS SUBSCRIPTION",amount:21e3,type:"debit"},{date:"2025-11-02",description:"MTN DATA BUNDLE 10GB",amount:5e3,type:"debit"},{date:"2025-11-10",description:"SPECTRANET INTERNET MONTHLY",amount:18500,type:"debit"},{date:"2025-11-18",description:"AIRTEL DATA 5GB",amount:2500,type:"debit"},{date:"2025-11-06",description:"NETFLIX MONTHLY SUBSCRIPTION",amount:7500,type:"debit"},{date:"2025-11-13",description:"SPOTIFY PREMIUM MONTHLY",amount:3500,type:"debit"},{date:"2025-11-11",description:"KONGA ONLINE ORDER",amount:45e3,type:"debit"},{date:"2025-11-01",description:"PIGGYVEST SAVINGS TRANSFER",amount:12e4,type:"debit"},{date:"2025-11-15",description:"COWRYWISE INVESTMENT TRF",amount:8e4,type:"debit"},{date:"2025-11-01",description:"SMS ALERT CHARGE NOV",amount:50,type:"debit"},{date:"2025-11-05",description:"NIP TRF CHARGE",amount:26.88,type:"debit"},{date:"2025-11-15",description:"STAMP DUTY CHARGE",amount:50,type:"debit"},{date:"2025-11-30",description:"ACCOUNT MAINTENANCE FEE",amount:1200,type:"debit"},{date:"2025-11-19",description:"REDDINGTON HOSPITAL CONSULTATION",amount:25e3,type:"debit"},{date:"2025-11-19",description:"MEDPLUS PHARMACY SURULERE",amount:12e3,type:"debit"},{date:"2025-10-05",description:"TRF TO ADEBAYO OKONKWO - FAMILY",amount:15e3,type:"debit"},{date:"2025-10-20",description:"TRF TO ADEBAYO OKONKWO",amount:2e4,type:"debit"},{date:"2025-11-05",description:"TRF TO ADEBAYO OKONKWO - POCKET MONEY",amount:15e3,type:"debit"},{date:"2025-11-20",description:"TRF TO ADEBAYO OKONKWO",amount:25e3,type:"debit"},{date:"2025-10-28",description:"ESTATE SERVICE CHARGE OCT",amount:35e3,type:"debit"},{date:"2025-11-28",description:"ESTATE SERVICE CHARGE NOV",amount:35e3,type:"debit"},{date:"2025-11-06",description:"NIP TRF",amount:2500,type:"debit"},{date:"2025-11-07",description:"WEB PURCHASE",amount:4500,type:"debit"},{date:"2025-11-14",description:"NIP TRF 0023456789",amount:2e4,type:"debit"},{date:"2025-11-02",description:"GADGET STORE IKEJA",amount:15e4,type:"debit"}],se={gtbank:{name:"GTBank",brandColor:"#E34A27",subtitle:"Guaranty Trust Bank",columns:["date","description","debit","credit","balance"]},zenith:{name:"Zenith Bank",brandColor:"#E31C23",subtitle:"Commercial Services",columns:["date","ref","description","debit","credit","balance"]},access:{name:"Access Bank",brandColor:"#2D3436",subtitle:"Holdings Plc",columns:["date","description","amount","type","balance"]},firstbank:{name:"First Bank",brandColor:"#003380",subtitle:"First Bank of Nigeria",columns:["date","description","debit","credit","balance"]},uba:{name:"UBA",brandColor:"#CC0000",subtitle:"United Bank for Africa",columns:["date","description","debit","credit","balance"]},kuda:{name:"Kuda",brandColor:"#40196D",subtitle:"Digital Banking",columns:["date","description","amount","type","balance"]},opay:{name:"OPay",brandColor:"#1EAF52",subtitle:"Mobile Money",columns:["date","description","amount","type"]},moniepoint:{name:"Moniepoint",brandColor:"#0052CC",subtitle:"Financial Services",columns:["date","description","debit","credit","balance"]}},F={"Food & Groceries":{icon:"🛒",color:"#22C55E",keywords:["shoprite","spar","justrite","hubmart","market","food","grocery","chicken republic","kfc","dominos","pizza","mr biggs","tantalizers","kilimanjaro","sweet sensation","tastee","mama put","amala","suya","restaurant","eatery","cafe","kitchen","grill","bakery","food co","prince ebeano","next cash","addide","bukka"]},Transport:{icon:"🚗",color:"#3B82F6",keywords:["bolt","uber","total","oando","mobil","conoil","filling station","fuel","petrol","diesel","e-hailing","ride","taxi","bus","indriver","taxify","gokada","max ng","opride","lcc","toll","parking","mechanic","car wash","vulcanizer"]},Utilities:{icon:"💡",color:"#F59E0B",keywords:["eko disco","ikedc","ikeja electric","aedc","bedc","kaedco","phedc","eedc","kedco","disco","electric","electricity","prepaid","token","dstv","gotv","startimes","showmax","lawma","waste","water"]},"Data & Airtime":{icon:"📱",color:"#8B5CF6",keywords:["mtn","glo","airtel","9mobile","etisalat","spectranet","swift","smile","ntel","airtime","data","recharge","bundle","internet","wifi","broadband","tizeti","fiberone"]},Housing:{icon:"🏠",color:"#EC4899",keywords:["rent","landlord","estate","agent","caution","service charge","mortgage","accommodation","apartment","flat","house"]},Entertainment:{icon:"🎬",color:"#F97316",keywords:["netflix","spotify","youtube","apple music","cinema","genesis","filmhouse","silverbird","ozone","gaming","xbox","playstation","steam","bet9ja","sportybet","betking","1xbet","nairabet","club","bar","lounge","event"]},Shopping:{icon:"🛍️",color:"#06B6D4",keywords:["jumia","konga","payporte","jiji","slot","pointek","amazon","aliexpress","asos","zara","h&m","clothing","fashion","electronics","appliance","store","mall","boutique","computer village","hubmart"]},Health:{icon:"🏥",color:"#10B981",keywords:["hospital","clinic","pharmacy","medplus","healthplus","reddington","lagoon","luth","doctor","dental","optical","lab","x-ray","surgery","consultation","medicine","drug"]},Education:{icon:"📚",color:"#6366F1",keywords:["school","university","college","tuition","course","udemy","coursera","book","stationery","exam","test","lesson","tutorial","training","seminar"]},Savings:{icon:"🏦",color:"#2DD4A8",keywords:["piggyvest","cowrywise","risevest","bamboo","chaka","trove","investment","savings","mutual fund","fixed deposit","money market"]},"Bank Charges":{icon:"🏛️",color:"#9CA3AF",keywords:["sms alert","maintenance","stamp duty","cot","commission","charge","fee","vat","withholding","nip trf charge","atm","interbank","card maintenance"]},Transfers:{icon:"↗️",color:"#64748B",keywords:["transfer to","trf to","sent to","payment to"]}},W=Object.entries(F).map(([e,t])=>({name:e,icon:t.icon,color:t.color}));function _(e,t={}){const n=e.toLowerCase();for(const[a,s]of Object.entries(t))if(n.includes(a.toLowerCase())){const i=F[s];return{category:s,icon:i?i.icon:"📋",color:i?i.color:"#9CA3AF"}}for(const[a,s]of Object.entries(F))for(const i of s.keywords)if(n.includes(i.toLowerCase()))return{category:a,icon:s.icon,color:s.color};return{category:"Uncategorised",icon:"📋",color:"#D1D5DB"}}function te(e,t={}){return e.map(n=>{if(n.type==="credit"){const o=_(n.description,t);return o.category==="Uncategorised"||o.category==="Transfers"?{...n,category:"Income",categoryIcon:"💰",categoryColor:"#22C55E"}:{...n,category:o.category,categoryIcon:o.icon,categoryColor:o.color}}const{category:a,icon:s,color:i}=_(n.description,t);return{...n,category:a,categoryIcon:s,categoryColor:i}})}function re(e){if(!e||e.length===0)return he();const t=de(e),n=le(t),a=pe(t),s=ue(e),i=me(e),o=ve(e),r=ge({transactions:e,incomeProfile:i,recurringPayments:n,spendingVelocity:o}),c=ye(e);return{recurringPayments:n,recipients:a,undescribed:s,incomeProfile:i,spendingVelocity:o,savingsAdvice:r,dailySpending:c}}function ne(e){if(!e)return"unknown";let t=e.toUpperCase().trim();const n=["NIP","NEFT","USSD","WEB","TRF","POS","ATM","TRANSFER","MOBILE","CHARGE","FEE","REF","NIP TRF","PAYMENT","TO","FROM","//","/","-","NG","NIGERIA","LTD","PLC","LIMITED"];for(const a of n)t=t.replace(new RegExp(`\\b${a}\\b`,"g"),"");return t=t.replace(/\s+/g," ").trim(),t=t.replace(/\d{6,}$/,"").trim(),t||"unknown"}function de(e){const t={};for(const n of e){const a=ne(n.description);a==="unknown"||a.length<3||(t[a]||(t[a]={normalizedName:a,originalNames:new Set,transactions:[],amounts:[],dates:[],types:new Set}),t[a].originalNames.add(n.description),t[a].transactions.push(n),t[a].amounts.push(n.amount),t[a].dates.push(new Date(n.date)),t[a].types.add(n.type))}return t}function ce(e){if(!e)return!0;const t=e.trim().toUpperCase();return t.length<5?!0:[/^NIP\s*(TRF|TRANSFER)?$/,/^WEB\s*(TRF|TRANSFER)?$/,/^MOBILE\s*(TRF|TRANSFER)?$/,/^USSD\s*(TRF|TRANSFER)?$/,/^TRANSFER$/,/^TRF$/,/^\d{10,}$/,/^POS\s*\d*$/,/^ATM\s*(WITHDRAWAL)?$/].some(a=>a.test(t))}function O(e){var n;return((n=e.map(a=>a.date).sort().reverse()[0])==null?void 0:n.substring(0,7))||null}function K(e){const t=O(e);return t?e.filter(n=>n.date.startsWith(t)&&n.type==="debit"):[]}function le(e,t){var a;const n=[];for(const[s,i]of Object.entries(e)){if(i.transactions.length<2||!i.types.has("debit"))continue;const o=i.transactions.filter(f=>f.type==="debit");if(o.length<2)continue;const r=o.map(f=>f.amount),c=o.map(f=>new Date(f.date)).sort((f,E)=>f-E),d=r.reduce((f,E)=>f+E,0)/r.length,p=r.reduce((f,E)=>f+Math.pow(E-d,2),0)/r.length,y=Math.sqrt(p),v=d>0?y/d:0,g=[];for(let f=1;f<c.length;f++){const E=Math.round((c[f]-c[f-1])/864e5);E>0&&g.push(E)}const u=g.length>0?g.reduce((f,E)=>f+E,0)/g.length:0;let h,l,m=0;v<.05?(h="subscription",m=.9,u>=25&&u<=35?(l="monthly",m=.95):u>=6&&u<=8?(l="weekly",m=.95):u>=13&&u<=16?(l="biweekly",m=.9):(l="irregular",m=.7)):v<.4?(h="vendor",m=.75,l=u<10?"frequent":"periodic"):(h="personal_transfer",m=.65,l=u<15?"frequent":"occasional");const b=s.toLowerCase();["netflix","spotify","dstv","gotv","youtube","apple"].some(f=>b.includes(f))&&(h="subscription",m=.98,l="monthly"),["rent","landlord","estate"].some(f=>b.includes(f))&&(h="bill",m=.95,l="monthly"),["piggyvest","cowrywise","risevest"].some(f=>b.includes(f))&&(h="savings_auto",m=.95,l="monthly"),n.push({recipientKey:s,originalName:[...i.originalNames][0],classification:h,frequency:l,confidence:m,avgAmount:d,totalAmount:r.reduce((f,E)=>f+E,0),count:o.length,lastDate:c[c.length-1].toISOString().split("T")[0],amountConsistency:v<.05?"fixed":v<.4?"variable":"highly_variable",category:((a=o[0])==null?void 0:a.category)||"Unknown"})}return n.sort((s,i)=>i.confidence-s.confidence||i.totalAmount-s.totalAmount),n}function pe(e,t){var a;const n=[];for(const[s,i]of Object.entries(e)){if(i.transactions.length<1)continue;const o=i.transactions.map(l=>l.amount),r=o.reduce((l,m)=>l+m,0)/o.length,c=o.reduce((l,m)=>l+m,0);let d="unknown";const p=s.toLowerCase(),y=i.types.has("debit"),v=i.types.has("credit"),g=s.split(" ").filter(l=>l.length>1),u=["ltd","plc","bank","shop","store","station","disco","subscription","pos"],h=g.length>=2&&g.length<=4&&!u.some(l=>p.includes(l));v&&!y?d="income_source":["piggyvest","cowrywise","risevest","bamboo","investment","savings"].some(l=>p.includes(l))?d="savings_platform":["shoprite","spar","chicken","kfc","dominos","jumia","konga","bolt","uber"].some(l=>p.includes(l))?d="vendor":["eko","disco","electric","dstv","gotv","netflix","mtn","glo","airtel","spectranet"].some(l=>p.includes(l))?d="utility_provider":h&&y?d="family_friend":h&&v?d="personal_income":y&&(d="vendor"),n.push({normalizedName:s,originalName:[...i.originalNames][0],relationship:d,transactionCount:i.transactions.length,totalAmount:c,avgAmount:r,lastTransaction:(a=i.dates.sort((l,m)=>m-l)[0])==null?void 0:a.toISOString().split("T")[0],direction:y&&v?"both":y?"outgoing":"incoming"})}return n.sort((s,i)=>i.totalAmount-s.totalAmount),n}function ue(e){var n;const t=[];for(const a of e){if(!ce(a.description)||a.category!=="Uncategorised"&&a.category!=="Transfers")continue;let s="Unknown",i="",o=.3;const r=a.amount,c=new Date(a.date),d=c.getDay();(n=c.getHours)!=null&&n.call(c);const p=c.getDate();a.type==="credit"?r>=1e5?(s="Salary/Income",i="Large credit — likely salary or significant income",o=.6):r>=1e4?(s="Personal Transfer",i="Medium credit — likely transfer from family/friend or freelance",o=.5):(s="Refund/Small Credit",i="Small credit — possibly a refund or minor transfer",o=.4):(r>=1e5&&p<=5?(s="Housing/Rent",i="Large debit early in month — likely rent or major bill",o=.55):r>=5e4?(s="Major Purchase/Bill",i="Large debit — likely a major purchase or service payment",o=.45):r>=1e4&&r<=3e4?(s="Shopping/Services",i="Medium debit — likely shopping or services",o=.5):r>=2e3&&r<=1e4?d>=1&&d<=5?(s="Food/Transport",i="Small weekday debit — likely meals or commute",o=.55):(s="Leisure/Food",i="Small weekend debit — likely dining or entertainment",o=.5):r<2e3&&(s="Misc/Small Purchase",i="Very small debit — likely airtime, snacks, or bank fee",o=.45),r>=5e3&&r%1e3===0&&(s="Personal Transfer",i="Round amount — likely an intentional transfer to someone",o=.5),r>=1e4&&r%1e4===0&&(s="Personal Transfer",i="Large round amount — very likely a personal transfer",o=.65)),t.push({...a,inferredCategory:s,inferredReason:i,inferredConfidence:o,isUndescribed:!0})}return t}function me(e){const t=e.filter(g=>g.type==="credit");if(t.length===0)return{type:"no_income",reliability:0,sources:[],monthlyAverage:0,trend:"flat",advice:"No income detected in this data. Upload more statements for analysis."};const n={};for(const g of t){const u=g.date.substring(0,7);n[u]||(n[u]=0),n[u]+=g.amount}const a=Object.values(n),s=a.reduce((g,u)=>g+u,0)/a.length,i={};for(const g of t){const u=ne(g.description);i[u]||(i[u]={name:g.description,total:0,count:0,amounts:[]}),i[u].total+=g.amount,i[u].count++,i[u].amounts.push(g.amount)}const o=Object.values(i).map(g=>{const u=g.total/g.count,h=g.amounts.reduce((m,b)=>m+Math.pow(b-u,2),0)/g.amounts.length,l=u>0?Math.sqrt(h)/u:1;return{name:g.name,totalAmount:g.total,frequency:g.count,avgAmount:u,isConsistent:l<.1,percentOfIncome:g.total/t.reduce((m,b)=>m+b.amount,0)*100}}).sort((g,u)=>u.totalAmount-g.totalAmount),r=o[0],c=(r==null?void 0:r.percentOfIncome)||0;let d;c>70&&(r!=null&&r.isConsistent)?d="stable_salary":o.length>=3?d="multiple_streams":c>50&&!(r!=null&&r.isConsistent)?d="freelance_variable":d="irregular";const p=Object.keys(n).sort();let y="flat";if(p.length>=2){const g=n[p[0]],h=(n[p[p.length-1]]-g)/g*100;h>10?y="growing":h<-10&&(y="declining")}let v=50;return d==="stable_salary"?v=90:d==="multiple_streams"?v=75:d==="freelance_variable"?v=55:v=35,y==="growing"&&(v=Math.min(100,v+10)),y==="declining"&&(v=Math.max(0,v-15)),{type:d,reliability:v,sources:o,monthlyAverage:s,trend:y,monthlyBreakdown:n}}function ve(e){const t=O(e);if(!t)return{pace:"normal",burnRate:0,projectedTotal:0,daysBudgetLasts:30,paydaySplurge:!1,weeklyBreakdown:[]};const n=K(e);if(n.length===0)return{pace:"normal",burnRate:0,projectedTotal:0,daysBudgetLasts:30,paydaySplurge:!1,weeklyBreakdown:[]};const a=n.reduce((b,f)=>b+f.amount,0),i=e.filter(b=>b.date.startsWith(t)&&b.type==="credit").reduce((b,f)=>b+f.amount,0),o=[0,0,0,0,0],r=[0,0,0,0,0];for(const b of n){const f=new Date(b.date).getDate(),E=Math.min(4,Math.floor((f-1)/7));o[E]+=b.amount,r[E]++}const c=o.map((b,f)=>({week:f+1,amount:b,transactionCount:r[f],label:`Week ${f+1}`})),d=n.filter(b=>new Date(b.date).getDate()<=3).reduce((b,f)=>b+f.amount,0),p=d>a*.35,y=a>0?Math.round(d/a*100):0,v=n.map(b=>new Date(b.date).getDate()),g=Math.max(1,Math.max(...v)-Math.min(...v)+1),u=a/g,h=u*30,l=u>0?Math.round(i/u):30;let m;if(i>0){const b=h/i;b>1.1?m="overspending":b>.85?m="tight":b>.6?m="normal":m="conservative"}else m="unknown";return{pace:m,burnRate:Math.round(u),projectedTotal:Math.round(h),totalSpentSoFar:Math.round(a),totalIncome:Math.round(i),daysBudgetLasts:l,paydaySplurge:p,paydaySplurgePercent:y,weeklyBreakdown:c}}function ge({transactions:e,incomeProfile:t,recurringPayments:n,spendingVelocity:a}){const s=[];O(e);const i=K(e),o=i.reduce((l,m)=>l+m.amount,0),r=t.monthlyAverage||0;if(r===0)return s;const c=r>0?(r-o)/r*100:0,p=r*(20/100),y=r-o,v=p-y;v>0&&s.push({type:"savings_target",icon:"🎯",title:"Savings Target",body:`To reach a healthy 20% savings rate, aim to save ${w(p)} per month. You're currently ${w(Math.abs(v))} short. Consider automating a transfer right when salary lands.`,potentialSavings:v,priority:2,actionSteps:["Set up automatic savings transfer on payday","Start with a smaller amount and increase monthly","Use PiggyVest or Cowrywise for automated saves"]});const g={};for(const l of i){const m=l.category||"Other";g[m]||(g[m]={total:0,count:0,amounts:[]}),g[m].total+=l.amount,g[m].count++,g[m].amounts.push(l.amount)}for(const[l,m]of Object.entries(g)){const b=m.total/m.count;if(b<1e4&&m.count>=4&&m.total>r*.05){const f=Math.round(m.total*.3);s.push({type:"leaky_category",icon:"🔍",title:`${l}: Small Spends Adding Up`,body:`You made ${m.count} transactions in "${l}" averaging ${w(b)} each, totaling ${w(m.total)}. Cutting back 30% would save ${w(f)}/month.`,potentialSavings:f,priority:4,actionSteps:[`Set a weekly budget for ${l}`,"Batch purchases to reduce impulse buying","Track daily spending in this category"]})}}const u=n.filter(l=>l.classification==="subscription"),h=u.reduce((l,m)=>l+m.avgAmount,0);if(u.length>=3&&h>r*.03){const l=Math.round(h*.3);s.push({type:"subscription_audit",icon:"📋",title:"Subscription Review",body:`You have ${u.length} active subscriptions totaling ~${w(h)}/month. Review if you actively use all of them — canceling unused ones could free up ${w(l)}.`,potentialSavings:l,priority:3,actionSteps:["List all subscriptions and rate how often you use each","Cancel the ones you haven't used in 2+ weeks","Consider sharing family plans for streaming services"]})}if(c>=10){let l;r>=5e5?l={type:"investment_advice",icon:"📈",title:"Ready for Growth Investing",body:`With a ${Math.round(c)}% savings rate and ${w(r)} monthly income, you're positioned for wealth building. Consider diversifying: 60% low-risk (money market funds), 30% medium (mutual funds), 10% high-growth (stocks via Bamboo/Trove).`,priority:3,actionSteps:[`Invest ${w(y*.6)} in a money market fund for liquidity`,`Put ${w(y*.3)} in mutual funds for medium-term growth`,`Allocate ${w(y*.1)} to stocks for long-term gains`,"Build a 3-month emergency fund first if you haven't"]}:r>=2e5?l={type:"investment_advice",icon:"📈",title:"Start Building an Investment Habit",body:`You're saving ${Math.round(c)}% monthly. Start with safe, liquid investments: money market funds via Cowrywise/PiggyVest offer 12-15% annual returns. If saving ${w(y)}/month, you'd have ${w(y*12*1.13)} in a year.`,priority:3,actionSteps:["Open a money market fund on Cowrywise or PiggyVest","Set up automatic weekly contributions","Build a 3-month emergency fund before riskier investments"]}:l={type:"investment_advice",icon:"💡",title:"Start with Micro-Savings",body:`Even small amounts compound over time. Saving just ${w(r*.1)}/month consistently would give you ${w(r*.1*12)} in a year. Start with PiggyVest's "Safelock" — lock money for higher interest.`,priority:4,actionSteps:["Start with daily or weekly micro-saves of ₦500-₦2000",'Use "Safelock" to avoid temptation to withdraw',"Increase savings amount by 10% every month"]},s.push(l)}if(a.paydaySplurge){const l=Math.round(a.totalSpentSoFar*a.paydaySplurgePercent/100);s.push({type:"velocity_warning",icon:"⚡",title:"Payday Splurge Detected",body:`${a.paydaySplurgePercent}% of your spending happens in the first 3 days after salary. That's ${w(l)} spent almost immediately. Try a "48-hour rule" — wait 2 days before non-essential purchases after payday.`,potentialSavings:Math.round(l*.2),priority:2,actionSteps:["Move savings to a separate account before spending","Wait 48 hours before making non-essential purchases","Create a monthly budget before payday arrives","Only keep budgeted spending money in your main account"]})}if(c>=5&&r>0){const l=r*.2,m=Math.round(l*6*1.06),b=Math.round(l*12*1.12),f=Math.round(l*24*1.25);s.push({type:"projection",icon:"🔮",title:"Your Savings Potential",body:`If you save 20% of income (${w(l)}/month) in a money market fund at ~12% annual return:`,priority:5,projections:{"6 months":w(m),"1 year":w(b),"2 years":w(f)},actionSteps:[`Target: ${w(l)}/month`,`6 months: ${w(m)}`,`1 year: ${w(b)}`,`2 years: ${w(f)}`]})}return s.sort((l,m)=>l.priority-m.priority),s}function ye(e){if(!O(e))return[];const n=K(e),a=n.map(p=>new Date(p.date).getTime()),s=a.length>0?Math.max(...a):Date.now(),i=new Date(s),o=[];for(let p=6;p>=0;p--){const y=new Date(i);y.setDate(i.getDate()-p),o.push(y.toISOString().split("T")[0])}const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],c={};o.forEach(p=>{c[p]=0});for(const p of n){const y=p.date.split("T")[0];c.hasOwnProperty(y)&&(c[y]+=p.amount)}const d=Math.max(...Object.values(c),1);return o.map(p=>{const y=new Date(p);return{date:p,dayName:r[y.getDay()],label:r[y.getDay()],amount:c[p],max:d}})}function he(){return{recurringPayments:[],recipients:[],undescribed:[],incomeProfile:{type:"no_income",reliability:0,sources:[],monthlyAverage:0,trend:"flat"},spendingVelocity:{pace:"normal",burnRate:0,projectedTotal:0,daysBudgetLasts:30,paydaySplurge:!1,weeklyBreakdown:[]},savingsAdvice:[],dailySpending:[]}}function H(e){if(!e||e.length===0)return ke();const t=fe(e),n=Object.keys(t).sort().reverse(),a=n[0],s=n[1]||null,i=t[a],o=s?t[s]:null,r=R(i,"credit"),c=R(i,"debit"),d=r-c,p=r>0?(r-c)/r*100:0,y=i.filter(f=>f.category==="Savings"&&f.type==="debit").reduce((f,E)=>f+E.amount,0),v=be(i,o),g=o?R(o,"credit"):null,u=o?R(o,"debit"):null,h=g&&g>0?(g-u)/g*100:null,l=we({savingsRate:p,categories:v,spending:c,income:r,currentMonth:i}),m=Se({savingsRate:p,categories:v,spending:c,income:r,currentMonth:i}),b=re(e);return{currentMonthKey:a,currentMonthLabel:J(a),previousMonthKey:s,previousMonthLabel:s?J(s):null,income:r,spending:c,netPosition:d,savingsRate:Math.max(0,p),savingsAmount:y,prevIncome:g,prevSpending:u,prevSavingsRate:h,spendingChange:u?(c-u)/u*100:null,incomeChange:g?(r-g)/g*100:null,categories:v,healthScore:l,healthFactors:m,intelligence:b,dailySpending:(b==null?void 0:b.dailySpending)||[],totalTransactions:i.length,months:n,monthlyData:t}}function fe(e){const t={};for(const n of e){const a=n.date.substring(0,7);t[a]||(t[a]=[]),t[a].push(n)}return t}function R(e,t){return e.filter(n=>n.type===t).reduce((n,a)=>n+a.amount,0)}function be(e,t){const n=e.filter(c=>c.type==="debit"&&c.category!=="Savings"),a=n.reduce((c,d)=>c+d.amount,0),s={};for(const c of n)s[c.category]||(s[c.category]={name:c.category,icon:c.categoryIcon,color:c.categoryColor,amount:0,count:0}),s[c.category].amount+=c.amount,s[c.category].count++;const i=t?t.filter(c=>c.type==="debit"&&c.category!=="Savings"):[],o={};for(const c of i)o[c.category]||(o[c.category]={amount:0}),o[c.category].amount+=c.amount;return Object.values(s).map(c=>{var v;const d=a>0?c.amount/a*100:0,p=((v=o[c.name])==null?void 0:v.amount)||null,y=p?(c.amount-p)/p*100:null;return{...c,percentage:Math.round(d*10)/10,prevAmount:p,change:y!==null?Math.round(y):null}}).sort((c,d)=>d.amount-c.amount)}function we({savingsRate:e,categories:t,spending:n,income:a,currentMonth:s}){let i=0;const o=Math.min(40,Math.max(0,e)/20*40);i+=o;const r=t.length>0?Math.max(...t.filter(l=>l.name!=="Bank Charges").map(l=>l.percentage)):0,c=r>40?Math.max(0,20-(r-40)/10*20):20;i+=c;const d=t.find(l=>l.name==="Bank Charges"),p=(d==null?void 0:d.amount)||0,y=p<=2e3?15:Math.max(0,15-(p-2e3)/3e3*15);i+=y;const v=["Housing","Food & Groceries","Transport","Utilities"],g=t.filter(l=>v.includes(l.name)).reduce((l,m)=>l+m.amount,0),u=n>0?g/n*100:0;let h;return u>=40&&u<=75?h=25:u>75?h=Math.max(0,25-(u-75)/20*25):h=Math.max(0,25-(40-u)/30*25),i+=h,Math.round(Math.min(100,Math.max(0,i)))}function Se({savingsRate:e,categories:t,spending:n,income:a,currentMonth:s}){const i=[];e>=15&&i.push({type:"positive",text:"Strong savings rate",detail:`${Math.round(e)}% of income saved`}),e>=5&&e<15&&i.push({type:"positive",text:"You're saving consistently",detail:`${Math.round(e)}% saved`});const o=t.find(p=>p.name==="Bank Charges");o&&o.amount<2e3&&i.push({type:"positive",text:"Low bank charges",detail:`Only ₦${B(o.amount)}`});const r=t.find(p=>p.name==="Entertainment");(!r||r.percentage<10)&&i.push({type:"positive",text:"Controlled discretionary spending"}),e<5&&i.push({type:"negative",text:"Very low savings rate",detail:"Try to save at least 10% of income"});const c=t.find(p=>p.name==="Housing");c&&a>0&&c.amount/a>.3&&i.push({type:"negative",text:"Housing cost is high",detail:`${Math.round(c.amount/a*100)}% of income`});const d=t.find(p=>p.name==="Food & Groceries");return d&&d.percentage>25&&i.push({type:"negative",text:"High food spending",detail:`${d.percentage}% of expenses`}),o&&o.amount>3e3&&i.push({type:"negative",text:"High bank charges",detail:`₦${B(o.amount)} this month`}),i}function J(e){const[t,n]=e.split("-");return`${["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(n)-1]} ${t}`}function ke(){return{currentMonthKey:null,currentMonthLabel:"No Data",income:0,spending:0,netPosition:0,savingsRate:0,savingsAmount:0,categories:[],healthScore:0,healthFactors:[],totalTransactions:0,months:[],monthlyData:{}}}function B(e){return e>=1e6?(e/1e6).toFixed(1).replace(/\.0$/,"")+"M":e.toLocaleString("en-NG",{maximumFractionDigits:0})}function w(e){return"₦"+B(e)}function G(e){var h,l;if(!e||!e.categories)return[];const t=[],{income:n,spending:a,savingsRate:s,savingsAmount:i,categories:o,healthScore:r,spendingChange:c,intelligence:d}=e;if(d&&d.savingsAdvice&&t.push(...d.savingsAdvice),((h=d==null?void 0:d.incomeProfile)==null?void 0:h.type)==="irregular"&&s<10&&t.push({type:"warning",icon:"📉",title:"Irregular Income Alert",body:"Your income appears irregular. For freelancers/business owners, we recommend a higher emergency fund (6 months expenses) before investing.",priority:1}),d!=null&&d.recurringPayments){const b=d.recurringPayments.filter(f=>f.classification==="subscription").filter(f=>f.frequency==="weekly"||f.frequency==="biweekly");b.length>0&&t.push({type:"warning",icon:"🔄",title:"Frequent Subscription Detected",body:`You have a ${b[0].frequency} payment to ${b[0].originalName}. Is this intended? Annual plans are usually 20% cheaper.`,priority:3})}(l=d==null?void 0:d.savingsAdvice)!=null&&l.some(m=>m.type.includes("savings_target"))||(s>=30?t.push({type:"success",icon:"🏆",title:"Outstanding Saver!",body:`You're saving ${Math.round(s)}% of your income. That's exceptional discipline — you're building real wealth.`,priority:1}):s>=20?t.push({type:"success",icon:"🎉",title:"Great Savings Habit",body:`${Math.round(s)}% savings rate is above the recommended 20%. Keep this momentum going!`,priority:2}):s<5&&n>0&&t.push({type:"warning",icon:"⚠️",title:"Low Savings Rate",body:`Only ${Math.round(s)}% of your income was saved this month. Consider automating a transfer to a savings app right after salary lands.`,priority:1}));const p=o.find(m=>m.name==="Food & Groceries");p&&p.percentage>25&&t.push({type:"info",icon:"🍳",title:"Food Spending is High",body:`Food & groceries make up ${p.percentage}% of your spending (${w(p.amount)}). Consider meal prepping on weekends or buying in bulk at markets.`,priority:4});const y=o.find(m=>m.name==="Transport");y&&y.change&&y.change>20&&t.push({type:"warning",icon:"🚗",title:"Transport Costs Rising",body:`Transport spending increased ${y.change}% compared to last month. Consider carpooling or combining errands to reduce trips.`,priority:4});const v=o.find(m=>m.name==="Data & Airtime");v&&n>0&&v.amount/n>.05&&t.push({type:"info",icon:"📱",title:"Data Spend is Notable",body:`You spent ${w(v.amount)} on data and airtime. Have you considered a monthly WiFi plan? It could save you up to 40%.`,priority:5}),r>=80&&t.push({type:"success",icon:"💚",title:"Excellent Financial Health",body:`Your health score is ${r}/100. You're managing your money better than most. Stay consistent!`,priority:1});const g=[],u=new Set;for(const m of t)u.has(m.title)||(u.add(m.title),g.push(m));return g.sort((m,b)=>m.priority-b.priority),g}function Ee(){return{html:`
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
  `,init(){const t=document.getElementById("get-started-btn"),n=document.getElementById("try-demo-btn"),a=document.getElementById("skip-btn");t==null||t.addEventListener("click",()=>{k("privacy")}),a==null||a.addEventListener("click",()=>{q()}),n==null||n.addEventListener("click",()=>{q()})}}}function q(){S.set({isDemo:!0,userName:"Alexandra"});const e=te(z,S.get("userCategoryRules")),t=H(e),n=G(t);S.set({transactions:z,categorisedTransactions:e,analytics:t,tips:n,hasCompletedOnboarding:!0}),k("dashboard")}function Te(){return{html:`
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
  `,init(){var t;(t=document.getElementById("accept-btn"))==null||t.addEventListener("click",()=>{k("bank-select")})}}}function Ae(){const e=Object.entries(se),t=S.get("selectedBanks")||[];return{html:`
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
        ${e.map(([s,i])=>`
    <div class="bank-card ${t.includes(s)?"selected":""}" data-bank="${s}">
      <div class="bank-card-icon" style="background: ${i.brandColor}">
        ${i.name.charAt(0)}
      </div>
      <div class="bank-card-info">
        <h3>${i.name}</h3>
        <p>${i.subtitle}</p>
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
  `,init(){var r,c;const s=document.getElementById("bank-list"),i=document.getElementById("bank-continue");let o=new Set(t);s==null||s.addEventListener("click",d=>{const p=d.target.closest(".bank-card");if(!p)return;const y=p.dataset.bank;o.has(y)?(o.delete(y),p.classList.remove("selected")):(o.add(y),p.classList.add("selected")),i.disabled=o.size===0,S.set({selectedBanks:[...o]})}),i==null||i.addEventListener("click",()=>{o.size>0&&k("upload")}),(r=document.getElementById("bank-back"))==null||r.addEventListener("click",()=>{k("privacy")}),(c=document.getElementById("import-link"))==null||c.addEventListener("click",d=>{d.preventDefault(),k("upload")})}}}function Ce(e){const t=e.trim().split(/\r?\n/);if(t.length<2)throw new Error("We couldn't read that file. It seems empty.");const n=Ie(t[0]),a=t.map(r=>xe(r,n)),s=a[0].map(r=>r.toLowerCase().trim()),i=$e(s);if(!i)throw new Error("We couldn't recognize the columns in this file. Make sure it has Date, Description, and Amount columns.");const o=[];for(let r=1;r<a.length;r++){const c=a[r];if(!(c.length<3))try{const d=Me(c,i);d&&d.amount>0&&(d.id=`txn-${r}`,o.push(d))}catch{continue}}if(o.length===0)throw new Error("We found the file, but couldn't extract any transactions. Try a different format.");return o.sort((r,c)=>new Date(c.date)-new Date(r.date)),o}function Ie(e){const t=[",","	",";","|"];let n=",",a=0;for(const s of t){const i=(e.match(new RegExp(Oe(s),"g"))||[]).length;i>a&&(a=i,n=s)}return n}function xe(e,t){const n=[];let a="",s=!1;for(let i=0;i<e.length;i++){const o=e[i];o==='"'?s&&e[i+1]==='"'?(a+='"',i++):s=!s:o===t&&!s?(n.push(a.trim()),a=""):a+=o}return n.push(a.trim()),n}function $e(e){const t={};for(let n=0;n<e.length;n++){const a=e[n];/date|trans.*date|posting.*date|value.*date/i.test(a)?t.date=n:/desc|narration|particular|detail|remark|reference/i.test(a)?t.description===void 0&&(t.description=n):/^debit$|debit.*amount|dr/i.test(a)?t.debit=n:/^credit$|credit.*amount|cr/i.test(a)?t.credit=n:/^amount$/i.test(a)&&t.debit===void 0?t.amount=n:/type|dr.cr|transaction.*type/i.test(a)&&(t.type=n)}return t.date===void 0||t.description===void 0||t.debit===void 0&&t.credit===void 0&&t.amount===void 0?null:t}function Me(e,t){const n=e[t.date]||"",a=e[t.description]||"",s=Re(n);if(!s)return null;const i=Le(a);if(!i)return null;let o=0,r="debit";if(t.debit!==void 0&&t.credit!==void 0){const c=N(e[t.debit]),d=N(e[t.credit]);d>0?(o=d,r="credit"):(o=c,r="debit")}else if(t.amount!==void 0)if(o=N(e[t.amount]),t.type!==void 0){const c=(e[t.type]||"").toLowerCase().trim();r=/cr|credit|c/i.test(c)?"credit":"debit"}else r=o<0?"debit":"credit",o=Math.abs(o);return{date:s,description:i,amount:o,type:r,originalDesc:a.trim()}}function Re(e){if(!e||e.trim()==="")return null;e=e.trim().replace(/['"]/g,"");const t=new Date(e);if(!isNaN(t.getTime())&&t.getFullYear()>2e3)return t.toISOString().split("T")[0];const n=e.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(n){const[,a,s,i]=n,o=new Date(i,s-1,a);if(!isNaN(o.getTime()))return o.toISOString().split("T")[0]}return null}function N(e){if(!e||e.trim()===""||e.trim()==="-")return 0;const t=e.replace(/[₦,\s"'NGN]/g,"").trim(),n=parseFloat(t);return isNaN(n)?0:n}function Le(e){if(!e)return"";let t=e.replace(/^(TRF|NEFT|NIP|USSD|MC|POS|ATM|WEB|MOB|FT)\s*[-\/:]?\s*/gi,"").replace(/\b(TRF|NEFT|NIP|USSD)\b/gi,"").replace(/\bF[IT]\d+\b/gi,"").replace(/\b\d{10,}\b/g,"").replace(/\b[A-Z]{2,3}\d{6,}\b/g,"").replace(/\s{2,}/g," ").trim();return t===t.toUpperCase()&&t.length>3&&(t=t.toLowerCase().replace(/\b\w/g,n=>n.toUpperCase())),t||e.trim()}function Oe(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ne(){return{html:`
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
  `,init(){var c;const t=document.getElementById("upload-zone"),n=document.getElementById("file-input"),a=document.getElementById("upload-continue"),s=document.getElementById("help-link"),i=document.getElementById("help-tooltip");let o=null;t.addEventListener("dragover",d=>{d.preventDefault(),t.classList.add("drag-over")}),t.addEventListener("dragleave",()=>{t.classList.remove("drag-over")}),t.addEventListener("drop",d=>{d.preventDefault(),t.classList.remove("drag-over");const p=d.dataTransfer.files;p.length>0&&r(p[0])}),t.addEventListener("click",()=>{n.click()}),n.addEventListener("change",d=>{d.target.files.length>0&&r(d.target.files[0])}),s.addEventListener("click",()=>{i.style.display=i.style.display==="none"?"block":"none"}),(c=document.getElementById("upload-back"))==null||c.addEventListener("click",()=>{k("bank-select")});function r(d){var v;if(d.size>5*1024*1024){alert("That file is too large. Please use a file under 5MB.");return}const p=d.name.split(".").pop().toLowerCase();if(!["csv","pdf"].includes(p)){alert("This file type isn't supported yet. Please use CSV or PDF.");return}o=d,a.disabled=!1;const y=document.getElementById("file-info-container");y.innerHTML=`
          <div class="upload-file-info">
            <div class="upload-file-icon">${p==="csv"?"📊":"📄"}</div>
            <div>
              <div class="upload-file-name">${d.name}</div>
              <div class="upload-file-size">${(d.size/1024).toFixed(1)} KB</div>
            </div>
            <div class="upload-file-remove" id="remove-file">✕</div>
          </div>
        `,(v=document.getElementById("remove-file"))==null||v.addEventListener("click",g=>{g.stopPropagation(),o=null,y.innerHTML="",a.disabled=!0,n.value=""})}a.addEventListener("click",async()=>{if(!o)return;if(o.name.split(".").pop().toLowerCase()==="csv")try{const p=await o.text(),y=Ce(p);S.set({transactions:y}),k("parsing")}catch(p){alert(p.message||"We couldn't read that file. Try a clear CSV.")}else alert("PDF parsing is coming soon! For now, please export your statement as CSV from your banking app.")})}}}function De(){return{html:`
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
  `,init(){const t=S.get("transactions"),n=S.get("userCategoryRules")||{};setTimeout(()=>{var s,i;(s=document.getElementById("step-1"))==null||s.classList.replace("active","done"),(i=document.getElementById("step-2"))==null||i.classList.add("active");const a=te(t,n);S.set({categorisedTransactions:a}),setTimeout(()=>{var c,d;(c=document.getElementById("step-2"))==null||c.classList.replace("active","done"),(d=document.getElementById("step-3"))==null||d.classList.add("active");const o=H(a),r=G(o);S.set({analytics:o,tips:r,hasCompletedOnboarding:!0}),setTimeout(()=>{var p;(p=document.getElementById("step-3"))==null||p.classList.replace("active","done"),setTimeout(()=>{k("review")},400)},800)},900)},1e3)}}}function Pe(){const e=S.get("categorisedTransactions")||[],t=e.slice(0,50).map((i,o)=>`
    <div class="review-item anim-fade-in-up delay-${Math.min(o%5+1,5)}" data-index="${o}">
      <div class="review-item-avatar" style="background: ${i.categoryColor}20; color: ${i.categoryColor}">
        ${i.categoryIcon}
      </div>
      <div class="review-item-info">
        <div class="review-item-desc">${i.description}</div>
        <span class="review-item-category" data-index="${o}" id="cat-pill-${o}">
          ${i.category}
        </span>
      </div>
      <div class="review-item-amount">
        <div class="review-item-value ${i.type}">
          ${i.type==="debit"?"- ":"+ "}${w(i.amount)}
        </div>
        <div class="review-item-date">${Fe(i.date)}</div>
      </div>
    </div>
  `).join(""),n=e.length,a=new Set(e.map(i=>i.category)).size;return{html:`
    <div class="review-page">
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px));">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="review-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <h1 class="bank-title">Review Transactions</h1>
        <p class="bank-subtitle" style="margin-top: 4px;">${n} transactions found · ${a} categories detected</p>
      </div>

      <div class="review-body" id="review-list">
        ${t}
      </div>

      <div class="review-actions">
        <button class="btn btn-accent btn-full btn-lg" id="review-done">
          Looks Good — Continue
        </button>
      </div>
    </div>

    <div id="category-dropdown" class="category-dropdown" style="display:none; position:fixed;"></div>
  `,init(){var r,c,d;const i=document.getElementById("category-dropdown");let o=null;(r=document.getElementById("review-list"))==null||r.addEventListener("click",p=>{var h;const y=p.target.closest(".review-item-category");if(!y){i.style.display="none";return}const v=parseInt(y.dataset.index);o=v;const g=y.getBoundingClientRect();i.style.display="block",i.style.top=g.bottom+4+"px",i.style.left=Math.max(16,Math.min(g.left,window.innerWidth-200))+"px";const u=((h=e[v])==null?void 0:h.category)||"";i.innerHTML=W.map(l=>`
          <div class="category-dropdown-item ${l.name===u?"selected":""}" data-category="${l.name}">
            <span>${l.icon}</span>
            <span>${l.name}</span>
          </div>
        `).join("")}),i==null||i.addEventListener("click",p=>{var h;const y=p.target.closest(".category-dropdown-item");if(!y||o===null)return;const v=y.dataset.category,g=e[o],u=W.find(l=>l.name===v);if(g&&u){g.category=u.name,g.categoryIcon=u.icon,g.categoryColor=u.color;const l=document.getElementById(`cat-pill-${o}`);l&&(l.textContent=u.name);const m=(h=l==null?void 0:l.closest(".review-item"))==null?void 0:h.querySelector(".review-item-avatar");m&&(m.style.background=u.color+"20",m.style.color=u.color,m.textContent=u.icon);const b=S.get("userCategoryRules")||{},f=g.description.toLowerCase().split(" ").slice(0,2).join(" ");b[f]=v,S.set({userCategoryRules:b})}i.style.display="none",o=null}),document.addEventListener("click",p=>{!p.target.closest(".review-item-category")&&!p.target.closest(".category-dropdown")&&(i.style.display="none")}),(c=document.getElementById("review-back"))==null||c.addEventListener("click",()=>{k("upload")}),(d=document.getElementById("review-done"))==null||d.addEventListener("click",()=>{S.set({categorisedTransactions:[...e]});const p=H(e),y=G(p);S.set({analytics:p,tips:y}),k("dashboard")})}}}function Fe(e){const t=new Date(e);return`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]} ${t.getDate()}`}const L={home:`
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
  `};function I(e="home"){return`
    <div class="tab-bar">
      ${[{id:"home",label:"Home",icon:L.home,route:"dashboard"},{id:"analytics",label:"Analytics",icon:L.analytics,route:"health"},{id:"insights",label:"Insights",icon:L.insights,route:"insights"},{id:"profile",label:"Profile",icon:L.profile,route:""}].map(n=>`
        <div class="tab-item ${n.id===e?"active":""}" data-tab="${n.route||n.id}">
          <div class="tab-item-icon">${n.icon}</div>
        </div>
      `).join("")}
    </div>
  `}function x(e){document.querySelectorAll(".tab-item").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.tab;n&&e(n==="home"?"dashboard":n)})})}function Z(e){const t=Be(e.date),n=e.type==="debit";return`
    <div class="txn-card">
      <div class="txn-icon" style="background: ${e.categoryColor}15; color: ${e.categoryColor}">
        ${e.categoryIcon||"📋"}
      </div>
      <div class="txn-info">
        <div class="txn-desc">${e.description}</div>
        <div class="txn-category">${e.category||"Uncategorised"}</div>
      </div>
      <div class="txn-amount">
        <div class="txn-value ${e.type}">${n?"- ":"+ "}${w(e.amount)}</div>
        <div class="txn-date">${t}</div>
      </div>
    </div>
  `}function Be(e){const t=new Date(e),a=Math.floor((new Date-t)/(1e3*60*60*24));return a===0?"Today":a===1?"Yesterday":a<7?`${a}d ago`:`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()]} ${t.getDate()}`}function Ue(){var y,v,g,u;const e=S.get("analytics"),t=S.get("categorisedTransactions")||[],n=S.get("userName")||"User",a=S.get("tips")||[];if(!e)return k("welcome",{replace:!0}),{html:"",init(){}};const s=Ke(),i=a.length>0?a[0]:{type:"info",icon:"💡",title:"Welcome to KoboSense",message:"Upload more data to get personalized insights."},o=((v=(y=e.intelligence)==null?void 0:y.dailySpending)==null?void 0:v.length)>0?e.intelligence.dailySpending:[],r=[...new Set(t.map(h=>h.category).filter(Boolean))],c=t.slice(0,10),d=c.map(h=>Z(h)).join("");return{html:`
    <div class="dashboard-page">
      <!-- Fixed Header + Stats Section (Dark Background) -->
      <div class="dash-hero">
          <div class="dash-header-bg"></div>
          
          <!-- Top Bar -->
          <div class="dash-top-bar">
            <div class="dash-greeting">
                <div class="dash-greeting-avatar">${n.charAt(0)}</div>
                <div class="dash-greeting-text">
                    <span class="dash-greeting-label">${s}</span>
                    <span class="dash-greeting-name">${n}</span>
                </div>
            </div>
            <div class="dash-notification">🔔<div class="dash-notification-dot"></div></div>
          </div>

          <!-- Quick Stats Row (Now on dark background) -->
          <div class="dash-stats-row anim-fade-in-up delay-1">
             <div class="stat-item">
                <div class="stat-label">Monthly Spend</div>
                <div class="stat-value">${w(e.spending)}</div>
                <div class="stat-sub">
                  ${e.spendingChange!==null?e.spendingChange>0?`↑ ${Math.round(e.spendingChange)}%`:`↓ ${Math.abs(Math.round(e.spendingChange))}%`:"-"}
                </div>
             </div>
             <div class="stat-divider"></div>
             <div class="stat-item">
                <div class="stat-label">Savings Rate</div>
                <div class="stat-value">${Math.round(e.savingsRate)}%</div>
                <div class="stat-sub">Target: 20%</div>
             </div>
          </div>
      </div>

      <!-- Scrollable Content Layer (White Overlay) -->
      <div class="dash-content anim-slide-up">
        
        <!-- Spending Pattern Section -->
        <div class="section-block">
            <div class="section-header-row">
                <div class="section-title-sm">Daily Activity</div>
                <div class="section-link">
                  ${(u=(g=e.intelligence)==null?void 0:g.spendingVelocity)!=null&&u.pace?`Pace: <span style="color:var(--color-primary)">${e.intelligence.spendingVelocity.pace}</span>`:"View Analysis"}
                </div>
            </div>
            
            <div class="analytics-graph-container">
                ${o.length>0?o.slice(-7).map(h=>`
                    <div class="graph-col">
                        <div class="graph-bar-wrapper">
                            <div class="graph-bar" style="height: ${h.amount/h.max*100}%"></div>
                        </div>
                        <div class="graph-label">${h.dayName}</div>
                    </div>
                `).join(""):'<div class="text-sm text-muted">No spending data this month</div>'}
            </div>
        </div>

        <!-- Single Insight -->
        <div class="insight-card ${i.type}" id="insight-card-action">
            <div class="insight-card-main">
                <div class="insight-card-header">
                    <div class="insight-card-icon">${i.icon}</div>
                    <div class="insight-card-title">${i.title}</div>
                </div>
                <div class="insight-card-body">${i.body||i.message}</div>
            </div>
        </div>

        <!-- Transactions (with Category Pills) -->
        <div class="dash-recent">
          <div class="dash-recent-header">
            <div class="dash-recent-title">Transactions</div>
            <div class="dash-recent-link" id="view-all-link">View All</div>
          </div>
          
          <div class="category-pills" id="category-pills">
            <div class="pill active" data-category="all">All</div>
            ${r.map(h=>`<div class="pill" data-category="${h}">${h}</div>`).join("")}
          </div>

          <div class="txn-list-container">
            <div class="dash-transactions" id="txn-list">
              ${d}
            </div>
          </div>
        </div>
        
        <!-- Bottom Spacer for Tab Bar -->
        <div style="height: 100px;"></div>
      </div>

      ${I("home")}
    </div>
  `,init(){var m,b;(m=document.getElementById("view-all-link"))==null||m.addEventListener("click",()=>{k("breakdown")}),(b=document.getElementById("insight-card-action"))==null||b.addEventListener("click",()=>{k("insights")});const h=document.getElementById("category-pills"),l=document.getElementById("txn-list");h&&l&&h.addEventListener("click",f=>{const E=f.target.closest(".pill");if(!E)return;h.querySelectorAll(".pill").forEach(C=>C.classList.remove("active")),E.classList.add("active");const j=E.dataset.category,V=j==="all"?c:c.filter(C=>C.category===j);l.innerHTML=V.length>0?V.map(C=>Z(C)).join(""):'<div class="text-sm text-muted" style="padding: 20px; text-align: center">No transactions in this category</div>'}),x(k)}}}function Ke(){const e=new Date().getHours();return e<12?"Good Morning":e<17?"Good Afternoon":"Good Evening"}function He(){const e=S.get("analytics");if(!e)return k("welcome",{replace:!0}),{html:"",init(){}};const{categories:t,spending:n,currentMonthLabel:a}=e,s=t.map((o,r)=>`
        <div class="progress-item anim-fade-in-up delay-${Math.min(r+1,5)}">
            <div class="progress-header">
                <div class="progress-label">
                    <div class="progress-dot" style="background: ${o.color}"></div>
                    ${o.name}
                </div>
                <div>${o.percentage}%</div>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width: ${o.percentage}%; background: ${o.color}"></div>
            </div>
            <div class="progress-amount">${w(o.amount)}</div>
        </div>
    `).join("");return{html:`
    <div class="breakdown-page">
      <div class="breakdown-header">
        <div class="bank-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="bank-back" id="breakdown-back">←</div>
          <div class="bank-logo">KoboSense.</div>
          <div style="width:40px"></div>
        </div>
        <div class="health-month">${a}</div>
        <h1 class="breakdown-title">Spending Analysis</h1>
      </div>

      <div class="breakdown-body">
        <div style="text-align: right; margin-bottom: var(--space-md);">
             <span style="font-size: 12px; font-weight: 600; color: var(--color-accent); cursor: pointer;">VIEW ALL</span>
        </div>

        <div class="progress-list">
            ${s}
        </div>
      </div>

      ${I("analytics")}
    </div>
  `,init(){var o;(o=document.getElementById("breakdown-back"))==null||o.addEventListener("click",()=>{k("dashboard")}),x(k)}}}function Ge(){const e=S.get("analytics");if(!e)return k("welcome",{replace:!0}),{html:"",init(){}};const{healthScore:t,healthFactors:n,spending:a,savingsRate:s,savingsAmount:i,currentMonthLabel:o,income:r,netPosition:c,intelligence:d,categories:p}=e,y=n.filter(u=>u.type==="positive"),v=n.filter(u=>u.type==="negative");return y.map(u=>`
    <div class="health-factor">
      <div class="health-factor-icon positive">✓</div>
      <div class="health-factor-text">
        <strong>${u.text}</strong>${u.detail?` · ${u.detail}`:""}
      </div>
    </div>
  `).join(""),v.map(u=>`
    <div class="health-factor">
      <div class="health-factor-icon negative">!</div>
      <div class="health-factor-text">
        <strong>${u.text}</strong>${u.detail?` · ${u.detail}`:""}
      </div>
    </div>
  `).join(""),{html:`
    <div class="health-page">
      <div class="health-header">
        <div class="health-header-nav">
          <div class="health-logo">KoboSense.</div>
          <div class="health-menu" id="health-menu">☰</div>
        </div>
        <div class="health-month anim-fade-in-up">${o}</div>
        <h1 class="health-title anim-fade-in-up delay-1">Analytics</h1>
      </div>

      <div class="health-body">
        
        <!-- Weekly Analytics Bar Chart -->
        <div class="chart-card anim-fade-in-up delay-1">
            <div class="chart-header">
                <div class="chart-title">Analytics</div>
                <button class="chart-select">Weekly ▾</button>
            </div>
            
            <div class="bar-chart" id="analytics-bar-chart">
                <!-- Bars injected via init -->
            </div>
        </div>

        <!-- Stat Grid (Keep for context) -->
        <div class="stat-grid anim-fade-in-up delay-2" style="margin-top: var(--space-xl)">
          <div class="stat-card">
            <div class="stat-card-label">Monthly Spend</div>
            <div class="stat-card-value">${w(a)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-card-label">Savings Rate</div>
            <div class="stat-card-value">${Math.round(s)}%</div>
          </div>
        </div>

        <!-- Spending Analysis -->
        <div class="section-title-sm anim-fade-in-up delay-3" style="margin-top: var(--space-xl); margin-bottom: var(--space-md);">Spending Analysis</div>
        <div class="progress-list anim-fade-in-up delay-3">
            ${p.map((u,h)=>`
                <div class="progress-item">
                    <div class="progress-header">
                        <div class="progress-label">
                            <div class="progress-dot" style="background: ${u.color}"></div>
                            ${u.name}
                        </div>
                        <div>${u.percentage}%</div>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${u.percentage}%; background: ${u.color}"></div>
                    </div>
                    <div class="progress-amount">${w(u.amount)}</div>
                </div>
            `).join("")}
        </div>


      </div>

      ${I("analytics")}
    </div>
  `,init(){const u=document.getElementById("analytics-bar-chart");if(u&&d&&d.dailySpending){const h=d.dailySpending,l=Math.max(...h.map(m=>m.amount),1);u.innerHTML=h.map(m=>`
                    <div class="bar-col">
                        <div class="bar-track">
                            <div class="bar-fill ${m.amount<l*.4?"light":""}" style="height: ${m.amount/l*100}%"></div>
                        </div>
                        <div class="bar-label">${m.label}</div>
                    </div>
                 `).join("")}else u&&(u.innerHTML='<div class="text-center text-muted" style="width:100%; padding-top:40px">No chart data</div>');x(k)}}}function Ye(){var r,c,d,p,y;const e=S.get("tips")||[],t=S.get("analytics");if(!t)return k("welcome",{replace:!0}),{html:"",init(){}};const{intelligence:n}=t,a=e.filter(v=>v.type==="warning"||v.priority<=2),s=e.filter(v=>!a.includes(v)),i=((r=n==null?void 0:n.recurringPayments)==null?void 0:r.filter(v=>v.classification==="subscription"))||[];return{html:`
    <div class="insights-page">
      <div class="insights-header-bg"></div>
      <div style="padding: var(--space-xl); padding-top: calc(var(--space-2xl) + env(safe-area-inset-top, 0px)); position: relative; z-index: 2;">
        <div class="health-header-nav" style="margin-bottom: var(--space-lg);">
          <div class="health-logo">KoboSense AI</div>
          <div style="width:40px"></div>
        </div>
        
        <h1 class="health-title anim-fade-in-up">Financial<br>Intelligence</h1>
        <p class="text-sm text-muted anim-fade-in-up delay-1" style="margin-top:8px; max-width: 260px;">
            AI-powered analysis of your ${t.totalTransactions} transactions.
        </p>
      </div>

      <div class="insights-body" style="position: relative; z-index: 2;">
        
        <!-- 1. Active Subscriptions (Priority) -->
        ${i.length>0?`
            <div class="param-row anim-fade-in-up delay-2" style="margin-bottom: 12px; align-items: baseline;">
                <div class="section-title-sm">Active Subscriptions</div>
                <div style="font-size: 11px; color: var(--color-primary); font-weight: 600;">${i.length} active</div>
            </div>
            <div class="sub-scroll-container anim-fade-in-up delay-2">
                ${i.map(v=>je(v)).join("")}
            </div>
        `:""}

        <!-- 2. Income & Pace Grid -->
        <div class="insight-grid anim-fade-in-up delay-3" style="margin-top: var(--space-xl);">
            <!-- Income Card -->
            <div class="stat-card glass-card">
                <div class="stat-card-icon" style="background: rgba(16, 185, 129, 0.1); color: #10B981;">💰</div>
                <div class="stat-card-label">Income Stability</div>
                <div class="stat-card-val-lg" style="color: #064E3B">
                    ${((c=n==null?void 0:n.incomeProfile)==null?void 0:c.reliability)||0}%
                </div>
                <div class="stat-card-sub">
                    ${ze((d=n==null?void 0:n.incomeProfile)==null?void 0:d.type)}
                </div>
            </div>

            <!-- Pace Card -->
            <div class="stat-card glass-card">
                <div class="stat-card-icon" style="background: rgba(59, 130, 246, 0.1); color: #3B82F6;">⏱️</div>
                <div class="stat-card-label">Spending Pace</div>
                <div class="stat-card-val-lg" style="color: #1E3A8A">
                    ${(p=n==null?void 0:n.spendingVelocity)!=null&&p.pace?Y(n.spendingVelocity.pace):"-"}
                </div>
                <div class="stat-card-sub">
                    ${(y=n==null?void 0:n.spendingVelocity)==null?void 0:y.daysBudgetLasts} days left
                </div>
            </div>
        </div>

        <!-- 3. Critical Alerts -->
        ${a.length>0?`
            <div class="section-title-sm anim-fade-in-up delay-4" style="margin: 32px 0 16px 0;">Strategy & Alerts</div>
            ${a.map((v,g)=>Q(v,g)).join("")}
        `:""}

        <!-- 4. Other Opportunities -->
        ${s.length>0?`
            <div class="section-title-sm anim-fade-in-up delay-5" style="margin: 32px 0 16px 0;">Opportunities</div>
            ${s.map((v,g)=>Q(v,g)).join("")}
        `:""}

        
        <!-- Report CTA -->
        <div class="report-cta anim-fade-in-up delay-6">
          <div class="report-icon">📑</div>
          <div>
            <h3 class="report-title">Monthly Report</h3>
            <p class="report-desc">Download a PDF summary of your financial health.</p>
          </div>
          <button class="btn-icon-only" id="generate-report">⬇</button>
        </div>
      </div>

      ${I("insights")}
    </div>
  `,init(){var v;(v=document.getElementById("generate-report"))==null||v.addEventListener("click",()=>{k("report")}),x(k)}}}function je(e){const t=Ve(e.originalName);return`
        <div class="sub-card">
            <div class="sub-header">
                <div class="sub-logo" style="background: ${t.bg}; color: ${t.color}">${t.initial}</div>
                <div class="sub-amount">${w(e.avgAmount)}</div>
            </div>
            <div class="sub-name">${t.name}</div>
            <div class="sub-footer">
                <div class="sub-freq">${Y(e.frequency)}</div>
                <div class="sub-date">Next: ${We(e.lastDate,e.frequency)}</div>
            </div>
        </div>
    `}function Q(e,t){return`
    <div class="insight-card ${e.type} anim-fade-in-up" style="animation-delay: ${.1*t}s">
      <div class="insight-card-main">
        <div class="insight-card-header">
            <div class="insight-card-icon">${e.icon}</div>
            <div class="insight-card-title">${e.title}</div>
        </div>
        <div class="insight-card-body">${e.body}</div>
      </div>
      ${e.potentialSavings?`
        <div class="insight-footer">
            <div class="insight-savings-label">Potential Savings</div>
            <div class="insight-savings-val">${w(e.potentialSavings)}</div>
        </div>
      `:""}
    </div>
  `}function Ve(e){const t=e.toLowerCase();return t.includes("netflix")?{bg:"#E50914",color:"#FFF",initial:"N",name:"Netflix"}:t.includes("spotify")?{bg:"#1DB954",color:"#FFF",initial:"S",name:"Spotify"}:t.includes("dstv")?{bg:"#006DB7",color:"#FFF",initial:"D",name:"DSTV"}:t.includes("apple")?{bg:"#000000",color:"#FFF",initial:"",name:"Apple"}:t.includes("prime")?{bg:"#00A8E1",color:"#FFF",initial:"P",name:"Prime"}:t.includes("mtn")?{bg:"#FFCC00",color:"#000",initial:"M",name:"MTN Data"}:t.includes("glo")?{bg:"#00A859",color:"#FFF",initial:"G",name:"Glo Data"}:t.includes("airtel")?{bg:"#FF0000",color:"#FFF",initial:"A",name:"Airtel"}:t.includes("spectranet")?{bg:"#0054A6",color:"#FFF",initial:"S",name:"Spectranet"}:{bg:"#F3F4F6",color:"#6B7280",initial:e.charAt(0),name:Y(e.substring(0,12))}}function Y(e){return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}function ze(e){return e?e==="stable_salary"?"Stable Salary":e==="multiple_streams"?"Multi-Stream":e==="freelance_variable"?"Variable":"Irregular":"Unknown"}function We(e,t){if(!e)return"Soon";const n=new Date(e);if(isNaN(n.getTime()))return"Soon";if(t==="monthly")n.setMonth(n.getMonth()+1);else if(t==="weekly")n.setDate(n.getDate()+7);else if(t==="biweekly")n.setDate(n.getDate()+14);else return"Soon";return`${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][n.getMonth()]} ${n.getDate()}`}function _e(){const e=S.get("analytics"),t=S.get("tips")||[];if(!e)return k("welcome",{replace:!0}),{html:"",init(){}};const{currentMonthLabel:n,income:a,spending:s,savingsRate:i,healthScore:o,categories:r,savingsAmount:c}=e,d=r.slice(0,5).map(v=>`
    <div style="display:flex; justify-content:space-between; padding: 8px 0; border-bottom: 1px solid var(--color-border-light);">
      <span style="display:flex; align-items:center; gap:8px;">
        <span style="width:10px;height:10px;border-radius:50%;background:${v.color};flex-shrink:0;"></span>
        ${v.name}
      </span>
      <span style="font-weight:600">${w(v.amount)} <span style="color:var(--color-text-muted);font-weight:400;">(${v.percentage}%)</span></span>
    </div>
  `).join(""),p=t.slice(0,3).map(v=>`
    <div style="padding: 8px 0; border-bottom: 1px solid var(--color-border-light); font-size: var(--text-sm); display: flex; gap: 8px;">
      <span>${v.icon}</span>
      <span>${v.body}</span>
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
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${w(a)}</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Total Spend</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${w(s)}</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Savings Rate</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${Math.round(i)}%</div>
              </div>
              <div style="padding:12px; background:var(--color-bg); border-radius:var(--radius-md);">
                <div style="font-size:var(--text-xs); color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:4px;">Health Score</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl);">${o}/100</div>
              </div>
            </div>
          </div>

          <div class="report-section">
            <div class="report-section-title">Top Spending Categories</div>
            ${d}
          </div>

          ${p.length>0?`
          <div class="report-section">
            <div class="report-section-title">Key Insights</div>
            ${p}
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

      ${I("insights")}
    </div>
  `,init(){var v,g,u;(v=document.getElementById("report-back"))==null||v.addEventListener("click",()=>{k("insights")}),(g=document.getElementById("download-report"))==null||g.addEventListener("click",()=>{window.print()}),(u=document.getElementById("share-report"))==null||u.addEventListener("click",async()=>{if(navigator.share)try{await navigator.share({title:`KoboSense Report - ${n}`,text:`My Financial Health Score: ${o}/100. Savings Rate: ${Math.round(i)}%. View my full report.`,url:window.location.href})}catch{}else try{await navigator.clipboard.writeText(`My KoboSense Financial Report - ${n}
Health Score: ${o}/100
Savings Rate: ${Math.round(i)}%
Income: ${w(a)}
Spending: ${w(s)}`),X("Report summary copied to clipboard!")}catch{X("Could not copy to clipboard")}}),x(k)}}}function X(e){const t=document.querySelector(".toast");t&&t.remove();const n=document.createElement("div");n.className="toast",n.textContent=e,document.body.appendChild(n),setTimeout(()=>n.remove(),3e3)}T("welcome",Ee);T("privacy",Te);T("bank-select",Ae);T("upload",Ne);T("parsing",De);T("review",Pe);T("dashboard",Ue);T("breakdown",He);T("health",Ge);T("insights",Ye);T("report",_e);document.addEventListener("DOMContentLoaded",()=>{S.get("hasCompletedOnboarding")&&!window.location.hash?window.location.hash="#dashboard":window.location.hash||(window.location.hash="#welcome"),ie()});
