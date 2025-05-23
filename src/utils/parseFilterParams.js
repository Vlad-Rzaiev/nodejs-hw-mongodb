import { CONTACT_TYPES } from '../constants/contacts.js';

const parseIsFavorite = (value) => {
  if (typeof value === 'undefined') return undefined;

  const normalized = String(value).toLowerCase();

  if (normalized === 'true') return true;
  if (normalized === 'false') return false;

  return undefined;
};

const parseType = (value) => {
  if (typeof value === 'undefined') return undefined;

  const normalized = String(value).toLowerCase();
  return CONTACT_TYPES.includes(normalized) ? normalized : undefined;
};

export const parseFilterParams = (query) => {
  const { isFavorite, type } = query;

  const parsedFavorite = parseIsFavorite(isFavorite);
  const parsedContactType = parseType(type);

  return {
    isFavorite: parsedFavorite,
    contactType: parsedContactType,
  };
};
