import { CatalogType } from "../../../resources/models";

const catalogTypeMap: Record<CatalogType, string> = {
  [CatalogType.OP]: "Op.",
  [CatalogType.BWV]: "BWV",
  [CatalogType.K]: "K",
  [CatalogType.WOO]: "WoO",
  [CatalogType.HWV]: "HWV",
  [CatalogType.S]: "S",
  [CatalogType.B_BURGHAUSER]: "B",
  [CatalogType.B_BROWN]: "B",
  [CatalogType.D]: "D",
  [CatalogType.HOB]: "Hob",
  [CatalogType.RV]: "RV",
  [CatalogType.TWV]: "TWV",
  [CatalogType.BUXWV]: "BUXWV",
  [CatalogType.SZ]: "Sz",
  [CatalogType.A]: "A",
  [CatalogType.KK]: "KK",
  [CatalogType.FP]: "FP",
  [CatalogType.GWV]: "GWV",
  [CatalogType.MWV]: "MWV",
};

export const getCatalogTypeLabel = (type: CatalogType) => {
  return catalogTypeMap[type];
};
