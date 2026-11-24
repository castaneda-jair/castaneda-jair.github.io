import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslations, localizePath, type Locale } from '../i18n/ui';
export function useLocale() {
  const route = useRoute();
  const locale = computed<Locale>(() => route.path === '/en' || route.path.startsWith('/en/') ? 'en' : 'es');
  const t = (key: Parameters<ReturnType<typeof useTranslations>>[0], vars = {}) => useTranslations(locale.value)(key, vars);
  const localize = (path: string) => localizePath(path, locale.value);
  return { locale, t, localize };
}
