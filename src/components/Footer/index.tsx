import React from 'react'
import BasicLink from '../BasicLink'

const Footer = () => {
  return (
    <footer>
      <div className="links">
        <div className="stack_block">
          <h4 className="semiheader">Company</h4>
          <BasicLink text='About Last.fm' />
          <BasicLink text='Contact Us' />
          <BasicLink text='Jobs' />
        </div>
        <div className="stack_block">
          <h4 className="semiheader">Help</h4>
          <BasicLink text='Track my music' />
          <BasicLink text='Community Support' />
          <BasicLink text='Community Guidelines' />
          <BasicLink text='Help' />
        </div>
        <div className="stack_block">
          <h4 className="semiheader">Goodies</h4>
          <BasicLink text='Download Scrobbler' />
          <BasicLink text='Developer API' />
          <BasicLink text='Free Music' />
          <BasicLink text='Merchandise' />
        </div>
        <div className="stack_block">
          <h4 className="semiheader">Account</h4>
          <BasicLink text='Inbox' />
          <BasicLink text='Settings' />
          <BasicLink text='Last.fm Pro' />
          <BasicLink text='Logout' />
        </div>
        <div className="stack_block">
          <h4 className="semiheader">Follow us</h4>
          <BasicLink text='Facebook' />
          <BasicLink text='Twitter' />
          <BasicLink text='Instagram' />
          <BasicLink text='Youtube' />
        </div>
      </div>
      <hr />
      <div className="basement">
        <div className="service">
          <div className="languages">
            <BasicLink selected text='English' />
            <BasicLink text='Deutsch' />
            <BasicLink text='Espanol' />
            <BasicLink text='Francais' />
            <BasicLink text='Polski' />
            <BasicLink text='Italiano' />
          </div>
          <div className="zone">
            <p className="planetext">Time zone: <span className="colored">Europe/Moscow</span></p>
          </div>
          <div className="copyright">
            <p className="planetext">CBS Interactive © 2022 Last.fm Ltd. All rights reserved Terms of Use Privacy Policy Legal
              Policies Cookies
              Policy Cookie Information Jobs at ViacomCBS Last.fm Music</p>
          </div>
        </div>
        <div className="company_name">
          <h2>as</h2>
        </div>
      </div>
    </footer>
  )
}

export default Footer