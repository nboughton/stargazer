import { computed, ComputedRef, ref } from 'vue';
import { starforged as canonicalStarforged, Starforged } from 'dataforged';
import starforgedPtBrRaw from 'src/data/dataforged.pt-br.json';
import { AppLocale } from 'src/components/models';

export type StarforgedLocale = 'en-US' | 'pt-BR';

const activeLocale = ref<AppLocale>('en-US');

/** Canonical English Starforged dataset for internal $id / key mapping. */
export const starforgedEN: Starforged = canonicalStarforged;

/** PT-BR localized Starforged dataset bundled for offline multi-language support. */
export const starforgedPtBr: Starforged = starforgedPtBrRaw as unknown as Starforged;

function getDataforgedDataset(locale: AppLocale): Starforged {
  return locale === 'pt-BR' ? starforgedPtBr : starforgedEN;
}

/** Reactive read-only active locale for dataforged lookups. */
export const activeDataLocale: ComputedRef<AppLocale> = computed((): AppLocale => activeLocale.value);

export function getActiveLocale(): AppLocale {
  return activeLocale.value;
}

export function setDataforgedLocale(locale: AppLocale): void {
  activeLocale.value = locale;
}

export function getStarforgedForLocale(locale: StarforgedLocale): Starforged {
  return getDataforgedDataset(locale);
}

/** Synchronous accessor for src/lib/*.ts helpers; also tracks activeLocale inside computed(). */
export function getCurrentStarforged(): Starforged {
  return getDataforgedDataset(activeLocale.value);
}

/** Reactive ComputedRef<Starforged> for Vue templates and computed properties. */
export const currentStarforged: ComputedRef<Starforged> = computed(
  (): Starforged => getDataforgedDataset(activeLocale.value)
);
