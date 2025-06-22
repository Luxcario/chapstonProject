const products = [
    { name: "Mobile Legends", category: "moba", image: "mobileLegends.jpeg" },
    { name: "Valorant", category: "fps", image: "valorant.png" },
    { name: "Genshin Impact", category: "rpg", image: "genshinimpact.jpeg" },
    { name: "PUBG Mobile", category: "fps", image: "pubg.jpeg" },
    { name: "Free Fire", category: "fps", image: "freefire.jpeg" },
    { name: "Point Blank", category: "fps", image: "pointblank.jpeg" }
];

const topupOptions = {
    "Mobile Legends": ["86 Diamonds", "172 Diamonds", "257 Diamonds"],
    "Valorant": ["125 VP", "420 VP", "700 VP"],
    "Genshin Impact": ["60 Crystals", "300 Crystals", "980 Crystals"],
    "PUBG Mobile": ["60 UC", "325 UC", "660 UC"],
    "Free Fire": ["100 Diamonds", "310 Diamonds", "520 Diamonds"],
    "Point Blank": ["PB Cash 12000", "PB Cash 24000", "PB Cash 60000"]
};

function renderProducts(data) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = '';
    data.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
      <img src="assets/img/${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
    `;
        card.addEventListener('click', () => showForm(p.name));
        productList.appendChild(card);
    });
}

function showForm(gameName) {
    const formSection = document.getElementById('purchase-form');
    const formTitle = document.getElementById('form-title');
    const topupSelect = document.getElementById('topup-options');

    formTitle.textContent = `Form Pembelian - ${gameName}`;
    topupSelect.innerHTML = '<option value="">Pilih Nominal Top-Up</option>';
    topupOptions[gameName].forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        topupSelect.appendChild(opt);
    });

    formSection.style.display = 'block';
    formSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(value));
        renderProducts(filtered);
    });

    filterSelect.addEventListener('change', () => {
        const value = filterSelect.value;
        const filtered = value === 'all' ? products : products.filter(p => p.category === value);
        renderProducts(filtered);
    });

    renderProducts(products);
});
