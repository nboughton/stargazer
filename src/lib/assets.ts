import { ISGAsset, ISGAssetItem } from 'src/components/models';
import { IAsset } from 'dataforged';
import { v4 as uuid } from 'uuid';
import { translateKey } from 'src/i18n';
import { mdToHtml } from './util';

export const NewAsset = (): ISGAsset => {
  return {
    id: uuid(),
    title: translateKey('assets.customTitle'),
    type: 'Custom',
    items: [
      {
        text: translateKey('assets.itemPlaceholder', { n: 1 }),
        marked: false,
      },
      {
        text: translateKey('assets.itemPlaceholder', { n: 2 }),
        marked: false,
      },
      {
        text: translateKey('assets.itemPlaceholder', { n: 3 }),
        marked: false,
      },
    ],
  };
};

// Too late to just use Dataforged assets as it would break everyone's data
export const convertDFAsset = (asset: IAsset): ISGAsset => {
  const newAsset = <ISGAsset>{};

  newAsset.dfId = asset.$id;
  newAsset.assetTypeId = asset['Asset Type'];
  newAsset.title = asset.Name;
  newAsset.icon = asset.Display.Icon;
  if (asset.Requirement) newAsset.subtitle = mdToHtml(asset.Requirement);
  newAsset.type = asset['Asset Type'].split('/').pop()?.replace(/_/g, ' ') as string;

  if (asset.Inputs) {
    const labels: string[] = [];
    for (const i of asset.Inputs) {
      labels.push(i.Name);
    }
    newAsset.input = {
      label: labels.join('/'),
      text: '',
    };
  }

  newAsset.items = [] as ISGAssetItem[];
  for (const abl of asset.Abilities) {
    newAsset.items.push({
      text: mdToHtml(abl.Text),
      marked: abl.Enabled,
    });
  }

  if (asset['Condition Meter']) {
    newAsset.track = {
      max: asset['Condition Meter'].Max,
      min: asset['Condition Meter'].Min,
      value: asset['Condition Meter'].Value,
    };

    if (asset['Condition Meter'].Conditions) {
      asset['Condition Meter'].Conditions.forEach((c) => {
        if (c.toLowerCase() == 'battered') newAsset.battered = false;
        if (c.toLowerCase() == 'cursed') newAsset.cursed = false;
      });
    }
  }

  return newAsset;
};
