
const products = [
{id:1,name:"iPhone 16 Pro Max",cat:"Telefon",price:1100,old:1300,img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"},
{id:2,name:"Samsung Galaxy S25",cat:"Telefon",price:850,old:1000,img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"},
{id:3,name:"iPhone 15 Pro",cat:"Telefon",price:750,old:900,img:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"},
{id:4,name:"Google Pixel 9",cat:"Telefon",price:650,old:800,img:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"},
{id:5,name:"Xiaomi 14 Ultra",cat:"Telefon",price:700,old:850,img:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"},

{id:6,name:"MacBook Pro M3",cat:"Laptop",price:1700,old:2000,img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"},
{id:7,name:"Dell XPS 15",cat:"Laptop",price:1200,old:1450,img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"},
{id:8,name:"HP Pavilion",cat:"Laptop",price:750,old:900,img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"},
{id:9,name:"Asus Gaming",cat:"Laptop",price:1400,old:1650,img:"https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500"},
{id:10,name:"Lenovo ThinkPad",cat:"Laptop",price:950,old:1100,img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500"},

{id:11,name:"AirPods Pro",cat:"Aksessuar",price:180,old:230,img:"https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500"},
{id:12,name:"Sony Headphones",cat:"Aksessuar",price:130,old:170,img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"},
{id:13,name:"Bluetooth Speaker",cat:"Aksessuar",price:65,old:90,img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"},
{id:14,name:"Wireless Mouse",cat:"Aksessuar",price:35,old:50,img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"},
{id:15,name:"Mechanical Keyboard",cat:"Aksessuar",price:80,old:110,img:"https://images.unsplash.com/photo-1595225476474-87563907a212?w=500"},

{id:16,name:"Apple Watch Ultra",cat:"Soat",price:350,old:420,img:"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"},
{id:17,name:"Samsung Watch",cat:"Soat",price:220,old:280,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"},
{id:18,name:"Smart Watch Pro",cat:"Soat",price:120,old:160,img:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500"},
{id:19,name:"Classic Watch",cat:"Soat",price:150,old:190,img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500"},
{id:20,name:"Sport Smart Watch",cat:"Soat",price:95,old:130,img:"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"},

{id:21,name:"PlayStation 5",cat:"Gaming",price:480,old:550,img:"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500"},
{id:22,name:"Xbox Controller",cat:"Gaming",price:55,old:75,img:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500"},
{id:23,name:"Gaming Headset",cat:"Gaming",price:75,old:100,img:"https://images.unsplash.com/photo-1599669454699-248893623440?w=500"},
{id:24,name:"Gaming Mouse",cat:"Gaming",price:45,old:65,img:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=500"},
{id:25,name:"Gaming Keyboard",cat:"Gaming",price:90,old:120,img:"https://images.unsplash.com/photo-1595225476474-87563907a212?w=500"}
];

let cart = [];
let favorites = [];
let activeCategory = "all";

const productList = document.getElementById("productList");

function discount(p) {
    return Math.round((p.old-p.price)/p.old*100);
}

function productCard(p) {
    return `
    <div class="card">
        <div class="card-image">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <span class="discount">-${discount(p)}%</span>
            <button class="favorite ${favorites.includes(p.id) ? "active" : ""}"
                onclick="toggleFavorite(${p.id})">
                <i class="fa-solid fa-heart"></i>
            </button>
        </div>

        <p class="card-category">${p.cat}</p>
        <h3>${p.name}</h3>

        <div class="prices">
            <span class="old-price">$${p.old}</span>
            <span class="new-price">$${p.price}</span>
        </div>

        <div class="card-actions">
            <button onclick="addCart(${p.id})">
                <i class="fa-solid fa-cart-plus"></i> Savatchaga
            </button>
            <button onclick="showDetail(${p.id})">
                Batafsil
            </button>
        </div>
    </div>`;
}

function renderProducts() {
    let search = document.getElementById("search").value.toLowerCase();
    let sort = document.getElementById("sort").value;

    let result = products.filter(p =>
        p.name.toLowerCase().includes(search) &&
        (activeCategory === "all" || p.cat === activeCategory)
    );

    if(sort === "low") result.sort((a,b) => a.price-b.price);
    if(sort === "high") result.sort((a,b) => b.price-a.price);

    productList.innerHTML = result.length
        ? result.map(productCard).join("")
        : "<p>Mahsulot topilmadi!</p>";
}

// KATEGORIYALAR
document.querySelectorAll(".category").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".category.active").classList.remove("active");
        btn.classList.add("active");
        activeCategory = btn.dataset.cat;
        renderProducts();
    });
});

document.getElementById("search").addEventListener("input", renderProducts);
document.getElementById("sort").addEventListener("change", renderProducts);

// SAVATCHA
function addCart(id) {
    let item = cart.find(p => p.id === id);

    if(item) {
        item.quantity++;
    } else {
        let product = products.find(p => p.id === id);
        cart.push({...product, quantity:1});
    }

    updateCart();
}

function updateCart() {
    document.getElementById("cartCount").textContent =
        cart.reduce((sum,p) => sum+p.quantity,0);

    let total = 0;

    document.getElementById("cartItems").innerHTML =
        cart.map(p => {
            total += p.price*p.quantity;

            return `
            <div class="cart-item">
                <div>
                    <b>${p.name}</b>
                    <p>$${p.price} × ${p.quantity}</p>
                </div>
                <div>
                    <button onclick="changeQuantity(${p.id},-1)">−</button>
                    <button onclick="changeQuantity(${p.id},1)">+</button>
                    <button onclick="removeCart(${p.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>`;
        }).join("") || "<p>Savatcha bo'sh!</p>";

    document.getElementById("total").textContent = "Jami: $" + total;
}

function changeQuantity(id, amount) {
    let item = cart.find(p => p.id === id);
    if(!item) return;

    item.quantity += amount;

    if(item.quantity <= 0) removeCart(id);
    else updateCart();
}

function removeCart(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
}

function openCart() {
    updateCart();
    openModal("cartModal");
}

function checkout() {
    if(cart.length === 0) {
        alert("Savatcha bo'sh!");
        return;
    }

    alert("Buyurtma uchun +998 90 123 45 67 raqamiga bog'laning. Bu demo sayt.");
}

// SEVIMLILAR
function toggleFavorite(id) {
    if(favorites.includes(id)) {
        favorites = favorites.filter(x => x !== id);
    } else {
        favorites.push(id);
    }

    renderProducts();
}

function showFavorites() {
    let result = products.filter(p => favorites.includes(p.id));

    if(!result.length) {
        alert("Sevimli mahsulotlar yo'q!");
        return;
    }

    productList.innerHTML = result.map(productCard).join("");
    document.getElementById("products").scrollIntoView();
}

// BATAFSIL
function showDetail(id) {
    let p = products.find(x => x.id === id);

    document.getElementById("detailContent").innerHTML = `
        <img class="detail-img" src="${p.img}" alt="${p.name}">
        <p class="card-category">${p.cat}</p>
        <h2>${p.name}</h2>
        <div class="prices">
            <span class="old-price">$${p.old}</span>
            <span class="new-price">$${p.price}</span>
        </div>
        <p style="margin:15px 0;color:#b7c9df">
            Ushbu mahsulot chegirma asosida sotilmoqda.
            Sifatli va zamonaviy tanlov!
        </p>
        <button class="submit-btn" onclick="addCart(${p.id});closeModal('detailModal')">
            Savatchaga qo'shish
        </button>
    `;

    openModal("detailModal");
}

// AKSIYALAR
function renderDeals() {
    let deals = [...products]
        .sort((a,b) => discount(b)-discount(a))
        .slice(0,4);

    document.getElementById("dealCards").innerHTML =
        deals.map(productCard).join("");
}

// MODAL
function openModal(id) {
    document.getElementById(id).classList.add("show");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("show");
}

// SIGN IN VA LOG IN
function openModal(type) {
    if(type === "cartModal" || type === "detailModal") {
        document.getElementById(type).classList.add("show");
        return;
    }

    let isSignup = type === "signup";

    document.getElementById("authContent").innerHTML = `
        <h2>${isSignup ? "Ro'yxatdan o'tish" : "Hisobga kirish"}</h2>
        <p style="color:#9fb4ce;font-size:13px">
            ${isSignup ? "Yangi hisob yarating" : "Hisobingizga xush kelibsiz"}
        </p>

        ${isSignup ? '<input type="text" placeholder="Ismingiz" required>' : ""}

        <input type="email" id="authEmail" placeholder="Email manzilingiz" required>
        <input type="password" id="authPassword" placeholder="Parolingiz" required>

        <button class="submit-btn" onclick="authAction('${type}')">
            ${isSignup ? "Sign In" : "Log In"}
        </button>

        <p style="margin-top:15px;font-size:13px;color:#9fb4ce">
            ${isSignup ? "Hisobingiz bormi?" : "Hisobingiz yo'qmi?"}
            <a href="#" style="color:#299cff"
            onclick="openModal('${isSignup ? "login" : "signup"}');return false">
                ${isSignup ? "Log In" : "Sign In"}
            </a>
        </p>
    `;

    document.getElementById("authModal").classList.add("show");
}

function authAction(type) {
    let email = document.getElementById("authEmail").value;
    let password = document.getElementById("authPassword").value;

    if(!email || !password) {
        alert("Barcha maydonlarni to'ldiring!");
        return;
    }

    if(password.length < 6) {
        alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
        return;
    }

    alert(type === "signup"
        ? "Ro'yxatdan o'tish demo rejimida!"
        : "Kirish demo rejimida!");

    closeModal("authModal");
}

// ALOQA FORMASI
document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Xabaringiz qabul qilindi! (Demo)");
    e.target.reset();
});

// NEWSLETTER
document.getElementById("newsletterForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Obuna bo'lganingiz uchun rahmat!");
    e.target.reset();
});

// SAYTNI ISHGA TUSHIRISH
renderProducts();
renderDeals();
updateCart();
