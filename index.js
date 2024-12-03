document.addEventListener("DOMContentLoaded", () => {
    const pricingOptions = [
        { unit: 1, discount: "10%", price: "$10.00 USD", originalPrice: "$24.00 USD" },
        { unit: 2, discount: "20%", price: "$18.00 USD", originalPrice: "$24.00 USD", badge: "MOST POPULAR" },
        { unit: 3, discount: "30%", price: "$24.00 USD", originalPrice: "$24.00 USD" },
    ];

    let expandedOption = null;
    const totalElement = document.getElementById("total");
    const pricingContainer = document.getElementById("pricing-options");

    function renderOptions() {
        pricingContainer.innerHTML = ""; // Clear existing options
        pricingOptions.forEach((option, index) => {
            const isExpanded = expandedOption === option.unit;
            const card = document.createElement("div");
            card.className = `pricing-card ${isExpanded ? "expanded" : ""}`;
            card.onclick = () => toggleExpand(option.unit);
    
            card.innerHTML = `
                <div class="unit1">
                    <div class="unit1-part1">
                        <input type="radio" name="pricing-option" ${isExpanded ? "checked" : ""}>
                    </div>
                    <div class="unit1-part2">
                        <div style="display: flex; align-items: center;">
                            <span style="font-weight: 550; font-size: 19px; margin-right: 10px;">
                                ${option.unit} Unit
                            </span>
                            <span class="discount">${option.discount} Off</span>
                            ${
                                option.badge
                                    ? `<div class="badge" style="
                                        background-color: #FF6B82; 
                                        color: white; 
                                        font-weight: 600; 
                                        font-size: 10px; 
                                        border-radius: 4px; 
                                        padding: 4px 12px; 
                                        margin-left: 5px;">
                                        ${option.badge}
                                      </div>`
                                    : ""
                            }
                        </div>
                        ${
                            option.unit === 1
                                ? `<p style="margin-top: 0; margin-bottom: 0; font-family: Inter; font-size: 15px; font-weight: 300; line-height: 14.52px; text-align: left;">
                                     Standard Price
                                   </p>`
                                : ""
                        }
                    </div>
                    <div class="unit1-part3">
                        <div class="price">
                            <p style="margin-bottom: 0; font-weight: 600; font-size: 18px;">
                                ${option.price}
                            </p>
                            <p class="original-price" style="margin-top: 0; color: #C0C0C0;">
                                <strike>${option.originalPrice}</strike>
                            </p>
                        </div>
                    </div>
                </div>
                ${isExpanded ? renderExpandedOptions() : ""}
            `;
    
            pricingContainer.appendChild(card);
        });
    }
    
    

    function renderExpandedOptions() {
        return `
            <div>
                <div style="display: flex; gap: 70px; margin-left: 70px;">
                    <p style="margin: 20px 0 0;">Size</p>
                    <p style="margin: 20px 0 0;">Color</p>
                </div>
                ${[1, 2].map(
                    (i) => `
                    <div style="display: flex; gap: 20px; margin-left: 30px; margin-top: ${i === 1 ? "5px" : "25px"};">
                        <p style="margin: 25px 0 0;">#${i}</p>
                        <select style="height: 40px; width: 80px; font-size: 14px;">
                            <option>S</option>
                        </select>
                        <select style="height: 40px; width: 80px; font-size: 14px;">
                            <option>Black</option>
                        </select>
                    </div>
                `
                ).join("")}
            </div>
        `;
    }

    function toggleExpand(unit) {
        expandedOption = expandedOption === unit ? null : unit;
        updateTotal();
        renderOptions();
    }

    function updateTotal() {
        const selectedOption = pricingOptions.find((option) => option.unit === expandedOption);
        totalElement.textContent = `Total: ${selectedOption ? selectedOption.price : "$0.00 USD"}`;
    }

    renderOptions();
});
