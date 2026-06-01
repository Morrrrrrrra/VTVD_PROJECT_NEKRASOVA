const product = {
    name: "Сумка-багет оригінальної форми",
    price: 1290,
    currency: "грн",
    discount: 20
};

const priceDisplay = document.getElementById("price-display");
const errorMsg = document.getElementById("error-msg");
const purchaseArea = document.querySelector(".product-card__purchase");

const getDiscountedPrice = (price, discount) => {
    if (typeof price !== "number" || isNaN(price)) {
        throw new Error("Некоректне значення ціни");
    }
    return Math.round(price * (1 - discount / 100));
};

purchaseArea.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;
    const btn = event.target;

    try {
        if (btn.id === "buy-btn") {
            handlePurchase(btn, false);
        } else if (btn.id === "quick-buy-btn") {
            handlePurchase(btn, true);
        }
    } catch (error) {
        errorMsg.textContent = error.message;
    }
});

const handlePurchase = (btn, isQuick) => {
    const discountedPrice = getDiscountedPrice(product.price, product.discount);

    const updatedProduct = {
        ...product,
        price: discountedPrice
    };

    btn.disabled = true;
    btn.textContent = "Обробка...";
    errorMsg.textContent = "";

    setTimeout(() => {
        priceDisplay.innerHTML = `
            ${updatedProduct.price}
            <span>${updatedProduct.currency}</span>
            <s style="color:#aaa;font-size:14px;margin-left:10px;">${product.price}</s>
        `;

        const existing = document.getElementById("success-msg");
        if (!existing) {
            const msg = document.createElement("p");
            msg.id = "success-msg";
            msg.textContent = isQuick
                ? "Товар придбано через швидку покупку!"
                : "Товар успішно додано до замовлення!";
            msg.style.fontSize = "11px";
            msg.style.color = "#4caf50";
            msg.style.letterSpacing = "0.04em";
            msg.style.marginTop = "8px";
            purchaseArea.after(msg);
        }

        btn.textContent = "Куплено";
    }, 1500);
};