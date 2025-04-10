class Header {
    elements = {
        navHome: '#nav-home',
        navShop: '#nav-shop',
        navContact: '#nav-contact',
        navCart: '#nav-cart',
        navLogIn: '#nav-login',
        navLogOut: '#nav-logout',
        cartCount: '.cart-count',
    }

    clickHome() {
        cy.get(this.elements.navHome).click()
    }

    clickShop() {
        cy.get(this.elements.navShop).click()
    }

    clickContact() {
        cy.get(this.elements.navContact).click()
    }

    clickLogIn() {
        cy.get(this.elements.navLogIn).click()
    }
    clickLogOut() {
        cy.get(this.elements.navLogOut).click()
    }
    clickCart() {
        cy.get(this.elements.navCart).click()
    }
    shouldHaveCartCount(count) {
        cy.get(this.elements.cartCount).should('have.text', count)
    }
}

export default Header