const loadProducts = async () => {
    try {
        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Не вдалося завантажити товари");
        }

        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        const grid = document.getElementById("products-grid");
        grid.textContent = error.message;
        grid.style.color = "#e05c5c";
        grid.style.fontSize = "11px";
    }
};

const renderProducts = (products) => {
    const grid = document.getElementById("products-grid");

    products.forEach(product => {
        let galleryHTML = "";
        product.gallery.forEach(img => {
            galleryHTML += `
                <figure class="product-card__gallery-item">
                    <img src="${img.src}" alt="${product.title} — ${img.caption}">
                    <figcaption class="product-card__gallery-caption">${img.caption}</figcaption>
                </figure>
            `;
        });

        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-card__image-wrapper">
                <img class="product-card__image" src="${product.image}" alt="${product.title} KIKI ${product.color}">
                <span class="product-card__badge">Новинка</span>
            </div>
            <div class="product-card__body">
                <p class="product-card__brand">KIKI</p>
                <h2 class="product-card__title">${product.title}</h2>
                <p class="product-card__description">
                    Елегантна сумка-багет з золотою фурнітурою. Всередині — текстильна
                    підкладка, одне велике відділення та додаткова кишеня. Закривається
                    на дві кнопки. Ручка регулюється по довжині.
                </p>
                <dl class="product-card__specs">
                    <div class="product-card__spec-item">
                        <dt>Розміри</dt>
                        <dd>18 × 29 × 7 см</dd>
                    </div>
                    <div class="product-card__spec-item">
                        <dt>Ремінець</dt>
                        <dd>74 – 123 см</dd>
                    </div>
                    <div class="product-card__spec-item">
                        <dt>Колір</dt>
                        <dd>${product.color}</dd>
                    </div>
                    <div class="product-card__spec-item">
                        <dt>Фурнітура</dt>
                        <dd>Золото</dd>
                    </div>
                </dl>
                <div class="product-card__gallery">
                    ${galleryHTML}
                </div>
                <div class="product-card__purchase">
                    <p class="product-card__price">${product.price} <span>грн</span></p>
                    <button class="buy-btn" data-id="${product.id}">Купити</button>
                </div>
                <p class="product-card__error" id="loader-${product.id}"></p>
            </div>
        `;

        grid.appendChild(card);
    });

    grid.addEventListener("click", (event) => {
        if (event.target.tagName !== "BUTTON") return;

        const btn = event.target;
        const id = Number(btn.dataset.id);

        let product = null;
        products.forEach(p => {
            if (p.id === id) product = p;
        });

        if (!product || product.stock <= 0) return;

        btn.disabled = true;
        const loader = document.getElementById(`loader-${id}`);
        loader.textContent = "Обробка...";
        loader.style.color = "#aaaaaa";

        setTimeout(() => {
            product.stock--;
            loader.textContent = "Товар успішно додано до замовлення!";
            loader.style.color = "#4caf50";

            if (product.stock > 0) {
                btn.disabled = false;
                btn.textContent = "Купити";
            } else {
                btn.textContent = "Немає в наявності";
            }
        }, 1500);
    });
};

loadProducts();