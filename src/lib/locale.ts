import { AppLocale, isAppLocale } from 'src/components/models';
import { applyRuntimeLocale } from 'src/i18n';
import { useConfig } from 'src/store/config';

export function setLocale(locale: AppLocale): void {
  const nextLocale: AppLocale = isAppLocale(locale) ? locale : 'en-US';
  const config = useConfig();
  if (config.data.locale !== nextLocale) {
    config.data.locale = nextLocale;
  }
  applyRuntimeLocale(nextLocale);
}
