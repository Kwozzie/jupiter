class CartPage {
    elements = {
        cartItems: '.cart-items',
        cartItem: '.cart-item',
        total: '.total'
    }

    shouldHaveItem(itemName, itemPrice, itemQuantity, itemTotal) {
        cy.get(this.elements.cartItems).within(() => {
            cy.contains(`tr${this.elements.cartItem}`, itemName).within(() => {
                cy.get('td').eq(1).should('have.text', `$${itemPrice}`)
                cy.get('td').find('input[name=quantity]').should('have.value', itemQuantity)
                cy.get('td').eq(3).should('have.text', `$${itemTotal}`)
            })
        })
    }

    shouldHaveTotalPrice(totalPrice) {
        cy.get(this.elements.cartItems).within(() => {
            // total money display is inconsistent with item money display
            // cy.get(this.elements.total).should('have.text', `Total: $${totalPrice}`)
            cy.get(this.elements.total).should('have.text', `Total: ${totalPrice}`)
        })
    }
}

export default CartPage
