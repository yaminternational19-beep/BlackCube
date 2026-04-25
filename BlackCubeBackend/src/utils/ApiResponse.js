export function ok(data, meta) {
  return { success: true, data, meta };
}

export function paginated(data, page, limit, total) {
  const pages = Math.ceil(total / limit) || 1;
  return ok(data, { page, limit, total, pages });
}


