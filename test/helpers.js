import { DEFAULT_LANGUAGE, getDefaultMessages, setLanguage } from 'src/frontend/modules/intl/i18n'

/**
 * Tests i18n initializing function. This can't be shared and set up in mocha-setup.js since
 * i18n module is application context and mocha-setup.js is nodejs context (missing babel setup).
 * Usage in mocha:
 * <pre>
 *   <code>
 *     describe('My tests', () => {
 *       before(mochaAsync(initLang))
 *       // ... etc
 *     })
 *   </code>
 * </pre>
 * @return {Promise<void>}
 */
export const initLang = async () => {
  const { messages } = getDefaultMessages()
  await setLanguage(DEFAULT_LANGUAGE, messages)
}
