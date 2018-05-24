import React, { Component } from 'react'
import page from '../Layout/hoc/page'

class DontHackMe extends Component {
  render() {
    return (
      <div className="center">
        <h2>This is not a wordpress site</h2>
        <p>
          It appears you're trying to access the administration section of a
          wordpress site. DataSkeptic.com is not based on wordpress. If you want
          to understand more about our site, please check out our corresponding
          github repository.
        </p>
        <p>
          Since you were looking for the admin page, I'm guessing you're
          interested in helping us test our security. Please use our contact us
          form to find out about more productive ways you can help. Thanks!
        </p>
      </div>
    )
  }
}

export default page(DontHackMe, {
  title: `Don't Hack Me!`
})
