import { createI18n } from 'vue-i18n';
import { Quasar, QuasarLanguage } from 'quasar';
import langEnUS from 'quasar/lang/en-US';
import langPtBR from 'quasar/lang/pt-BR';
import { AppLocale } from 'src/components/models';
import { getActiveLocale, setDataforgedLocale } from 'src/lib/dataforged';
import enUS, { MessageSchema } from './en-US';
import ptBR from './pt-BR';

const quasarLangs: Record<AppLocale, QuasarLanguage> = {
  'en-US': langEnUS,
  'pt-BR': langPtBR,
};

export const i18n = createI18n<[MessageSchema], AppLocale, false>({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages: {
    'en-US': enUS,
    'pt-BR': ptBR,
  },
});

export function applyRuntimeLocale(locale: AppLocale): void {
  if (i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale;
  }
  if (Quasar.lang.isoName !== locale) {
    Quasar.lang.set(quasarLangs[locale]);
  }
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('lang', locale);
  }
  if (getActiveLocale() !== locale) {
    setDataforgedLocale(locale);
  }
}

export function translateKey(key: string, params?: Record<string, string | number>): string {
  const fn = i18n.global.t as unknown as (k: string, p?: Record<string, string | number>) => string;
  return params ? fn(key, params) : fn(key);
}

export function enumOptions(values: readonly string[], prefix: string): Array<{ label: string; value: string }> {
  return values.map((value) => ({
    label: translateKey(`${prefix}.${value}`),
    value,
  }));
}
