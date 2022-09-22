import dasherize from "./dasherize";

export const extractSlug = (properties) => `${dasherize(properties.neighborhood || '')}-${properties.map_id}`;
