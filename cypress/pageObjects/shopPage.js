class ShopPage {
    elements = {
        itemContainer: 'li',
        productPrice: '.product-price',
    }
 
    text = {
        buyButton: 'Buy',
    }

    cartItems = {}

    getCartItems() {
        return cy.wrap(this.cartItems);
    }

    getCartTotal() {
        if (Object.keys(this.cartItems).length === 0) {
            return 0;
        }

        return Object.values(this.cartItems).reduce((acc, item) => {
            return acc + item.price;
        }, 0);
    }
    
    addToCartTotals(itemName) {
        console.log('add to cart totals', itemName);


        cy.contains(this.elements.itemContainer, itemName).within(() => {
            cy.get(this.elements.productPrice).invoke('text').then((price) => {
                const itemPrice = Number(price.replace(/[^0-9.-]+/g, ''));
                console.log('item details', { itemName, itemPrice });

                if (!this.cartItems[itemName]) {
                    console.log('initialise cart item', itemName);
                    this.cartItems[itemName] = {
                        quantity: 1,
                        itemPrice,
                        price: itemPrice,        
                    };
                } else {
                    console.log('add to cart item', itemName);
                    this.cartItems[itemName].quantity += 1;
                    this.cartItems[itemName].price += itemPrice;
                }

                console.log('add to cart totals', this.cartItems);
            })
        })
    }

    buyButton() {
        return cy.contains('a', this.text.buyButton)
    }

    buyItem(itemName) {
        cy.contains(this.elements.itemContainer, itemName).within(() => {
            this.buyButton().click();
        });

        this.addToCartTotals(itemName)
    }
}

export default ShopPage