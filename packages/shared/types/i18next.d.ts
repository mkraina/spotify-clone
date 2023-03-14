import 'i18next';

import { I18nDictionary } from '../i18n/config';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: I18nDictionary[string];
    returnNull: false;
  }
}
