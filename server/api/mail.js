const Email = require('email-templates')
const path = require('path')
const moment = require('moment')
const config = require('config')

moment.locale('it')
const mail = {
  send(addresses, template, locals) {
    console.error('invio email via ', config.smtp)
    const email = new Email({
      views: { root: path.join(__dirname, '..', 'emails') },
      htmlToText: false,
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, '..', 'emails')
        }
      },
      message: {
        from: `${config.title} <${config.smtp.auth.user}>`
      },
      send: true,
      i18n: {
        directory: path.join(__dirname, '..', '..', 'locales', 'email'),
        defaultLocale: 'it'
      },
      transport: config.smtp
    })
    const msg = {
      template,
      message: {
        to: addresses,
        bcc: config.admin_email
      },
      locals: {
        ...locals,
        locale: 'it',
        config: { title: config.title, baseurl: config.baseurl, description: config.description },
        datetime: datetime => moment(datetime).format('ddd, D MMMM HH:mm')
      }
    }
    return email.send(msg)
      .catch(e => {
        console.error(e)
      })
  }
}

module.exports = mail
