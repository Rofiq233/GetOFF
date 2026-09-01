




class ProductVariants extends HTMLElement {

    connectedCallback() {

        this.variantStyle = this.dataset.variantStyle;
        // if (this.variantStyle == 'select') {
        //     this.addEventListener('click', this.onClick);
        // }

  


        if (this.variantStyle == 'button') {
            this.addEventListener("change", this.onChange);
        }

        this.variants = JSON.parse(this.querySelector('[data-product-variants]').textContent);

        const result = this.findVariant();
        console.log(this.moneyFormat);
    }




    onChange = (e) => {
        const input = e.target;
        if (!input.matches(".product-variants__input")) {
            return;
        }

        const selectedOptions = this.getSelectedOptions();

        this.updateAvailableOptions(selectedOptions);


        const variant = this.findVariant();
        if (!variant) {
            return;
        }
        this.updatePrice(variant);
    }
 

    getSelectedOptions = () => {

        if (this.variantStyle == 'button') {
            return [...this.querySelectorAll(".product-variants__input:checked")].map(input => input.value);

        }

        return [];

    }


    findVariant = () => {
        const selectedOptions = this.getSelectedOptions();
        return this.variants.find((variant) => {
            return variant.options.every((option, index) => {
                return option = selectedOptions[index]
            })
        })
    }



    updateAvailableOptions = (selectedOptions) => {

        this.querySelectorAll(".product-variants__option").forEach((optionElement) => {

            const optionPosition = Number(optionElement.dataset.optionPosition);

            const availableOptions = this.getAvailableOptions(selectedOptions, optionPosition);
            optionElement.querySelectorAll(".product-variants__input").forEach((input) => {
                input.disabled = !availableOptions.includes(input.value);
            })


        })
    }


    getAvailableOptions = (selectedOptions, optionPosition) => {
        return this.variants.filter((variant) => {
            return variant.options.every((option, index) => {
                if (index + 1 == optionPosition) {
                    return true;
                }
                return !selectedOptions[index] || option === selectedOptions[index];
            })
        }).map((variant) => {
            return variant.options[optionPosition - 1];
        })

    }


    updatePrice = (variant) => {
        const priceElement = this.closest('.sellers__item')?.querySelector('.sellers__item-price');
        console.log(variant.price)

    if (!priceElement) {
        return;
    }
    priceElement.innerText = Shopify.formatMoney(variant.price, Shopify.money_format);
    console.log(variant)
};


    // getAvailableOptions = (selectedOptions, optionPosition) => {

    //     return this.variants.filter((variant) => {
    //         return variant.options.every((option, index) => {
    //             if (index + 1 === optionPosition) {
    //                 return true;
    //             }

    //             return !selectedOptions[index] || option === selectedOptions[index];

    //         });

    //     }).map((variant) => {
    //         return variant.options[optionPosition - 1];

    //     });
    // };






    // onChnage = (event) => {
    //     const input = event.target;
    //     if (!input.matches(".product-variants__input")) {
    //         return;
    //     }

    //     const selectedOptions = this.getSelectedOptions();
    //     this.updateAvailableOptions(selectedOptions);
    //     const variant = this.findVariant();

    //     if (!variant) {
    //         return;
    //     }
    //     this.updateURL(variant);
    // }

    // updateAvailableOptions = (selectedOptions) => {
    //     this.querySelectorAll('.product-variants__option').forEach((optionElement) => {
    //         const optionPosition = Number(optionElement.dataset.optionPosition);
    //         const availableOptions = this.getAvailableOptions(selectedOptions, optionPosition);
    //         optionElement.querySelectorAll('.product-variants__input').forEach((input) => {
    //             input.disabled = !availableOptions.includes(input.value);
    //         });
    //         optionElement.querySelectorAll('.product-variants__select-option').forEach((option) => {
    //             const isAvailable = availableOptions.includes(option.dataset.optionValue);
    //             option.toggleAttribute('disabled', !isAvailable);
    //         });
    //     });
    // };

    // setInitialVariant = () => {
    //     const url = new URL(window.location.href);
    //     const variantId = url.searchParams.get('variant');
    //     if (!variantId) {
    //         return;
    //     }
    //     const variant = this.variants.find((variant) => String(variant.id) === variantId);
    //     if (!variant) {
    //         return;
    //     }
    // };


    // updateURL = (variant) => {
    //     const url = new URL(window.location.href);
    //     url.searchParams.set('variant', variant.id);
    //     window.history.replaceState({}, '', url.toString());
    // };

    // onClick = (event) => {
    //     const trigger = event.target.closest(".product-variants__select-trigger");
    //     if (trigger) {
    //         this.toggleSelect(trigger);
    //         console.log(trigger)
    //         return;
    //     }
    //     const option = event.target.closest('.product-variants__select-option');
    //     if (option) {
    //         this.selectOption(option);
    //     }
    // }

    // toggleSelect = (trigger) => {
    //     const select = trigger.closest('.product-variants__select');
    //     const options = select.querySelector('.product-variants__options');
    //     const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    //     trigger.setAttribute('aria-expanded', !isOpen);
    //     options.hidden = isOpen;
    // }

    // selectOption = (option) => {
    //     if (option.hasAttribute('disabled')) {
    //         return;
    //     }

    //     const select = option.closest('.product-variants__select');
    //     const trigger = select.querySelector('.product-variants__select-trigger');
    //     const value = select.querySelector('.product-variants__select-value');

    //     select.querySelectorAll(".product-variants__select-option").forEach((option) => {
    //         option.removeAttribute("checked");
    //     });

    //     option.setAttribute("checked", "");
    //     value.textContent = option.dataset.optionValue;
    //     trigger.setAttribute('aria-expanded', 'false');
    //     select.querySelector('.product-variants__options').hidden = true;
    //     const selectedOptions = this.getSelectedOptions();
    //     this.updateAvailableOptions(selectedOptions);
    //     const variant = this.findVariant();

    //     if (!variant) {
    //         return;
    //     }

    //     this.updateURL(variant);
    // };

    // getSelectedOptions = () => {

    //     if (this.variantStyle === 'select') {
    //         return [...this.querySelectorAll(".product-variants__select-option[checked]")].map(input => input.dataset.optionValue)
    //     }
    //     if (this.variantStyle === 'button') {
    //         return [...this.querySelectorAll(".product-variants__input:checked")].map(input => input.value);
    //     }
    //     return [];

    // }



    // findVariant = () => {
    //     const selectedOptions = this.getSelectedOptions();
    //     return this.variants.find((variant) => {

    //         return variant.options.every((option, index) => {
    //             return option === selectedOptions[index];
    //         })
    //     })
    // }


}







if (!customElements.get('product-variants')) {
    customElements.define(
        'product-variants',
        ProductVariants
    );
}