class ShopPage {
    elements = {
        itemContainer: 'li',
        productPrice: '.product-price',
    }
 
    text = {
        buyButton: 'Buy',
    }

    cart = {}

    constructor(cart) {
        this.cart = cart
    }
    
    addToCart(itemName) {
        cy.contains(this.elements.itemContainer, itemName).within(() => {
            cy.get(this.elements.productPrice).invoke('text').then((price) => {
                this.cart.add(itemName, price)
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

        this.addToCart(itemName)
    }
}

export default ShopPage