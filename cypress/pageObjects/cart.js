class Cart {
    products = {
        teddyBear: 'Teddy Bear',
        stuffedFrog: 'Stuffed Frog',
        handMadeDoll: 'Hadmade Doll',
        fluffyBunny: 'Fluffy Bunny',
        smileyBear: 'Smiley Bear',
        funnyCow: 'Funny Cow',
        valentineBear: 'Valentine Bear',
        smileyFace: 'Smiley Face',   
    }

    data = {}

    getItems() {
        return cy.wrap(this.data)
    }

    add(itemName, price) {
        const itemPrice = Number(price.replace(/[^0-9.-]+/g, ''))

        if (!this.data[itemName]) {
            this.data[itemName] = {
                quantity: 1,
                itemPrice,
                price: itemPrice,        
            }
        } else {
            this.data[itemName].quantity += 1
            this.data[itemName].price += itemPrice
        }
    }

    getTotalPrice() {
        return this.getItems().then((items) => {
            let total = 0

            if (Object.keys(this.data).length > 0) {
                total = Object.values(items).reduce((acc, item) => {
                    return acc + item.price
                }, 0)
            }
    
            return cy.wrap(total)
        })
    }
}

export default Cart