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
        return cy.wrap(this.cartItems)
    }

    getCartTotal() {
        if (Object.keys(this.cartItems).length === 0) {
            return 0
        }

        return Object.values(this.cartItems).reduce((acc, item) => {
            return acc + item.price
        }, 0)
    }
    
    addToCartTotals(itemName) {
        cy.contains(this.elements.itemContainer, itemName).within(() => {
            cy.get(this.elements.productPrice).invoke('text').then((price) => {
                const itemPrice = Number(price.replace(/[^0-9.-]+/g, ''))

                if (!this.cartItems[itemName]) {
                    this.cartItems[itemName] = {
                        quantity: 1,
                        itemPrice,
                        price: itemPrice,        
                    }
                } else {
                    this.cartItems[itemName].quantity += 1
                    this.cartItems[itemName].price += itemPrice
                }
            })
        })
    }

    buyButton() {
        return cy.contains('a', this.text.buyButton)
    }

    buyItem(itemName) {
        cy.contains(this.elements.itemContainer, itemName).within(() => {
            this.buyButton().click()
        })

        this.addToCartTotals(itemName)
    }
}

export default ShopPage