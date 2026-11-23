import { boot } from 'quasar/wrappers';
import { AppLocale, isAppLocale } from 'src/components/models';
import { applyRuntimeLocale, i18n } from 'src/i18n';
import { useConfig } from 'src/store/config';

export default boot(async ({ app }) => {
  app.use(i18n);

  let initialLocale: AppLocale = 'en-US';
  try {
    const config = useConfig();
    await config.populateStore();
    if (isAppLocale(config.data.locale)) {
      initialLocale = config.data.locale;
    }
  } catch (err) {
    console.log(err);
  }

  applyRuntimeLocale(initialLocale);
});
