import Header from '../pageObjects/header.js'
import ContactPage from '../pageObjects/contactPage.js'
import { faker } from '@faker-js/faker'

const header = new Header()
const contactPage = new ContactPage()

describe('Contact Form', () => {
    beforeEach('Navigate to Contact Page', () => {
        cy.visit('/')
        header.clickContact()
    })

    it('Should validate required fields', () => {
        const foreName = faker.person.firstName()

        contactPage.shouldDisplayHeaderInfoMessage()
        contactPage.clickSubmit()
        contactPage.shouldDisplayErrorsForAllRequiredFields()
        contactPage.foreNameInput().type(foreName)
        contactPage.shouldValidateEmail(faker.internet.email())
        contactPage.messageTextArea().type(faker.lorem.paragraph())
        contactPage.shouldNotDisplayAnyErrors()
        contactPage.shouldDisplayHeaderInfoMessage()
    })

    it('Should successfully submit', () => {
        const foreName = faker.person.firstName()

        contactPage.shouldDisplayHeaderInfoMessage()
        contactPage.foreNameInput().type(foreName)
        contactPage.emailInput().type(faker.internet.email())
        contactPage.messageTextArea().type(faker.lorem.paragraph())
        contactPage.shouldNotDisplayAnyErrors()

        contactPage.clickSubmit()
        contactPage.shouldDisplaySuccessMessage(foreName)
    })
})