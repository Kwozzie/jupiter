class ContactPage {
    elements = {
        error: '.error',
        inputWrapper: '.control-group',
        contactButton: '.btn-contact',
        foreNameInput: '#forename',
        surnameInput: '#surname',
        emailInput: '#email',
        telephoneInput: '#telephone',
        messageTextArea: '#message',
        headerMessage: '#header-message',
        alert: '.alert',
        alertInfo: '.alert-info',
        alertError: '.alert-error',
        alertSuccess: '.alert-success',
        errorHint: '.help-inline'
    }

    text = {
        infoAlert: 'We welcome your feedback - tell it how it is.',
        errorAlert: 'We welcome your feedback - but we won\'t get it unless you complete the form correctly.',
        invalidEmail: 'Please enter a valid email',
    }

    clickHome() {
        return cy.get(this.elements.navHome).click()
    }

    foreNameInput() {
        return cy.get(this.elements.foreNameInput)
    }

    surnameInput() {
        return cy.get(this.elements.surnameInput)
    }

    emailInput() {
        return cy.get(this.elements.emailInput)
    }

    telephoneInput() {
        return cy.get(this.elements.telephoneInput)
    }

    messageTextArea() {
        return cy.get(this.elements.messageTextArea)
    }

    foreNameControlGroup() {
        return cy.get(this.elements.foreNameInput).parents(this.elements.inputWrapper)
    }

    surnameControlGroup() {
        return cy.get(this.elements.surnameInput).parents(this.elements.inputWrapper)
    }

    emailControlGroup() {
        return cy.get(this.elements.emailInput).parents(this.elements.inputWrapper)
    }

    telephoneControlGroup() {
        return cy.get(this.elements.telephoneInput).parents(this.elements.inputWrapper)
    }

    messageControlGroup() {
        return cy.get(this.elements.messageTextArea).parents(this.elements.inputWrapper)
    }

    submitButton() {
        return cy.get(this.elements.contactButton)
    }
    
    clickSubmit() {
        this.submitButton().click()
    }

    headerMessage() {
        return cy.get(this.elements.headerMessage)
    }

    headerMessageAlert() {
        return this.headerMessage().find(this.elements.alert)
    }

    className(selector) {
        return selector.replace(/[.]/g, '')
    }

    shouldDisplayErrorsForAllRequiredFields() {
        const errorClass = this.className(this.elements.error)

        this.headerMessageAlert().should('contain', this.text.errorAlert)
        this.headerMessageAlert().should('have.class', this.className(this.elements.alertError))
        
        this.foreNameControlGroup().should('have.class', errorClass)
        this.emailControlGroup().should('have.class', errorClass)
        this.messageControlGroup().should('have.class', errorClass)

        this.surnameControlGroup().should('not.have.class', errorClass)
        this.telephoneControlGroup().should('not.have.class', errorClass)

        this.foreNameControlGroup().should('contain', 'Forename is required')
        this.emailControlGroup().should('contain', 'Email is required')
        this.messageControlGroup().should('contain', 'Message is required')
    }

    shouldDisplayHeaderInfoMessage() {
        this.headerMessageAlert().should('contain', this.text.infoAlert)
        this.headerMessageAlert().should('have.class', this.className(this.elements.alertInfo))
    }

    shouldNotDisplayAnyErrors() {
        cy.get(this.elements.error).should('not.exist')
        cy.get(this.elements.inputWrapper).should('not.have.class', this.className(this.elements.error))
        cy.get(this.elements.errorHint).should('not.exist')

        // submit button is an <a> and not a <button>
        // unable to check if submit button is disabled
    }

    shouldDisplayInvalidEmailError() {
        this.emailControlGroup().should('have.class', this.className(this.elements.error))
        this.emailControlGroup().should('contain', this.text.invalidEmail)
    }

    shouldNotDisplayInvalidEmailError() {
        this.emailControlGroup().should('not.have.class', this.className(this.elements.error))
        this.emailControlGroup().should('not.contain', this.text.invalidEmail)
    }    

    shouldValidateEmail(emailAddress) {
        const [emailUser, emailDomain] = emailAddress.split('@')
        const emailDomainParts = emailDomain.split('.')

        this.emailInput().clear().type(emailUser)
        this.clickSubmit()
        this.shouldDisplayInvalidEmailError()

        this.emailInput().type('@')
        this.clickSubmit()
        this.shouldDisplayInvalidEmailError()

        this.emailInput().type(emailDomainParts[0])
        this.clickSubmit()
        this.shouldDisplayInvalidEmailError()

        this.emailInput().clear().type(emailAddress)
        this.clickSubmit()
        this.shouldNotDisplayInvalidEmailError()
    }
    
    shouldDisplaySuccessMessage(foreName) {
        // there is a random delay in the success message appearing
        // the max length of time is 19 seconds
        cy.contains(
            this.elements.alert,
            `Thanks ${foreName}, we appreciate your feedback`,
            { timeout: 20000 },
        ).should('have.class', this.className(this.elements.alertSuccess))

        this.foreNameInput().should('not.exist')
        this.surnameInput().should('not.exist')
        this.emailInput().should('not.exist')
        this.telephoneInput().should('not.exist')
        this.messageTextArea().should('not.exist')
        this.submitButton().should('not.exist')
    }
}

export default ContactPage