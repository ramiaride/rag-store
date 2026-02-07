import accessories from "./accessories.json";
import books from "./books.json";
import coffee from "./coffee.json";
import family from "./family.json";
import friends from "./friends.json";
import games from "./games.json";
import homeDecor from "./home-decor.json";
import jewelry from "./jewelry.json";
import kids from "./kids.json";
import kitchen from "./kitchen.json";
import lights from "./lights.json";
import personalized from "./personalized.json";
import pet from "./pet.json";
import ramadan from "./ramadan.json";
import shops from "./shops.json";
import storage from "./storage.json";
import valentine from "./valentine.json";
import wallArt from "./wall-art.json";
import { resolveAssetUrl } from "./assetResolver";

const categoryToItems = {
  valentine,
  personalized,
  "home-decor": homeDecor,
  jewelry,
  accessories,
  ramadan,
  games,
  "wall-art": wallArt,
  kitchen,
  coffee,
  kids,
  lights,
  family,
  friends,
  pet,
  shops,
  storage,
  books,
};

function withUniqueIds(items, categoryId) {
  const seen = new Map();
  return items.map((item, index) => {
    const fallbackId = `${categoryId}-${item?.code || index + 1}`;
    const rawId = item?.id ? String(item.id) : fallbackId;
    const count = (seen.get(rawId) ?? 0) + 1;
    seen.set(rawId, count);
    const id = count === 1 ? rawId : `${rawId}-${count}`;
    return { ...item, id };
  });
}

function normalizeProduct(item, categoryId) {
  const details = item?.details && typeof item.details === "object"
    ? item.details
    : { description: "" };

  const imagePath =
    typeof item?.imagePath === "string" && item.imagePath.trim()
      ? item.imagePath.trim()
      : null;

  const resolved = imagePath ? resolveAssetUrl(imagePath) : null;
  const image = resolved ? `url(${resolved})` : undefined;

  return {
    ...item,
    categoryId,
    details,
    imagePath: imagePath ?? undefined,
    image,
  };
}

const allProducts = Object.entries(categoryToItems).flatMap(
  ([categoryId, items]) =>
    withUniqueIds(Array.isArray(items) ? items : [], categoryId).map((item) =>
      normalizeProduct(item, categoryId),
    ),
);

export default allProducts;

