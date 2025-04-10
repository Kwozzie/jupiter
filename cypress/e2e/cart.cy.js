import Header from '../pageObjects/header.js'
import ShopPage from '../pageObjects/shopPage.js'
import Cart from '../pageObjects/cart.js'
import CartPage from '../pageObjects/cartPage.js'

const header = new Header()
const cart = new Cart()
const shopPage = new ShopPage(cart)
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
            shopPage.buyItem(cart.products.stuffedFrog)
        }

        for (let i = 0; i < fluffyBunnyCount; i++) {
            shopPage.buyItem(cart.products.fluffyBunny)
        }

        for (let i = 0; i < valentineBearCount; i++) {
            shopPage.buyItem(cart.products.valentineBear)
        }

        header.shouldHaveCartCount(totalItemCount)

        cart.getItems().then((items) => {
            cy.log('Make sure our test data is correct')
            expect(items[cart.products.stuffedFrog].quantity).to.equal(stuffedFrogCount)        
            expect(items[cart.products.fluffyBunny].quantity).to.equal(fluffyBunnyCount)
            expect(items[cart.products.valentineBear].quantity).to.equal(valentineBearCount)

            const actualTotalQuantity = Object.values(items).reduce((acc, item) => {
                return acc + item.quantity
            }, 0)

            expect(actualTotalQuantity).to.equal(totalItemCount)

            cy.log('Check that our cart is displaying correctly')
            
            header.clickCart()

            const stuffedFrog = items[cart.products.stuffedFrog]
            const fluffyBunny = items[cart.products.fluffyBunny]
            const valentineBear = items[cart.products.valentineBear]

            cartPage.shouldHaveItem(cart.products.stuffedFrog, stuffedFrog.itemPrice, stuffedFrog.quantity, stuffedFrog.price)
            cartPage.shouldHaveItem(cart.products.fluffyBunny, fluffyBunny.itemPrice, fluffyBunny.quantity, fluffyBunny.price)
            cartPage.shouldHaveItem(cart.products.valentineBear, valentineBear.itemPrice, valentineBear.quantity, valentineBear.price)           
        })

        cart.getTotalPrice().then((totalPrice) => {
            cartPage.shouldHaveTotalPrice(totalPrice) 
        })
    })
})