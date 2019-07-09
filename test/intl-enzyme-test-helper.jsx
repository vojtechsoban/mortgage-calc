/**
 * Slightly modified file based on official documentation:
 * https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl
 *
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react'
import { IntlProvider } from 'src/frontend/modules/intl/components/IntlContext'
import { mount, shallow } from 'enzyme'
import { setLanguage } from 'src/frontend/modules/intl/i18n'


/**
 * Export these methods.
 */
export async function shallowWithIntl(node) {
  const wrapper = shallow(<IntlProvider>{node}</IntlProvider>)

  const language = await setLanguage('en')

  wrapper.setState({ ...language })
  return wrapper.update()
}

export async function mountWithIntl(node) {
  const wrapper = mount(<IntlProvider>{node}</IntlProvider>)

  const language = await setLanguage('en')

  wrapper.setState({ ...language })
  return wrapper.update()
}
