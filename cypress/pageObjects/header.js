class Header {
    elements = {
        navHome: '#nav-home',
        navShop: '#nav-shop',
        navContact: '#nav-contact',
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
}

export default Header