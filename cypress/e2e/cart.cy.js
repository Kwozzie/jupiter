import Header from '../pageObjects/header.js'
import ShopPage from '../pageObjects/shopPage.js'
import Products from '../pageObjects/products.js'
import CartPage from '../pageObjects/cartPage.js'

const header = new Header()
const products = new Products()
const shopPage = new ShopPage()
const cartPage = new CartPage()

const stuffedFrogCount = 2
const fluffyBunnyCount = 5
const valentineBearCount = 3
const totalItemCount = stuffedFrogCount + fluffyBunnyCount + valentineBearCount

describe('Shopping Cart', () => {
    before('Navigate To Shop', () => {
        cy.visit('/')
        header.clickShop()
    })

    it('Should be able to add to cart and correctly add up prices', () => {
        header.shouldHaveCartCount(0)

        cy.log('Add items to cart')
        for (let i = 0; i < stuffedFrogCount; i++) {
            shopPage.buyItem(products.items.stuffedFrog)
        }

        for (let i = 0; i < fluffyBunnyCount; i++) {
            shopPage.buyItem(products.items.fluffyBunny)
        }

        for (let i = 0; i < valentineBearCount; i++) {
            shopPage.buyItem(products.items.valentineBear)
        }

        header.shouldHaveCartCount(totalItemCount)

        shopPage.getCartItems().then((cart) => {
            cy.log('Make sure our test data is correct')
            
            expect(cart[products.items.stuffedFrog]).to.have.property('quantity', stuffedFrogCount)
            expect(cart[products.items.fluffyBunny]).to.have.property('quantity', fluffyBunnyCount)
            expect(cart[products.items.valentineBear]).to.have.property('quantity', valentineBearCount)
            
            const cartItemQuantity = Object.values(cart).reduce((acc, item) => {
                return acc + item.quantity
            }, 0)

            expect(cartItemQuantity).to.equal(totalItemCount)

            cy.log('Check that our cart is displaying correctly')
            
            header.clickCart()

            const stuffedFrog = cart[products.items.stuffedFrog]
            const fluffyBunny = cart[products.items.fluffyBunny]
            const valentineBear = cart[products.items.valentineBear]

            cartPage.shouldHaveItem(products.items.stuffedFrog, stuffedFrog.itemPrice, stuffedFrog.quantity, stuffedFrog.price)
            cartPage.shouldHaveItem(products.items.fluffyBunny, fluffyBunny.itemPrice, fluffyBunny.quantity, fluffyBunny.price)
            cartPage.shouldHaveItem(products.items.valentineBear, valentineBear.itemPrice, valentineBear.quantity, valentineBear.price)

            const totalPrice = shopPage.getCartTotal()
            cartPage.shouldHaveTotalPrice(totalPrice)
        })
    })
})