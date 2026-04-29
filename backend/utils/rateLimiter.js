const requests = new Map();

const getClientKey = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown"
  );
};

export const rateLimiter = (req, res, next) => {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
  const maxRequests = Number(process.env.RATE_LIMIT_MAX) || 60;

  const key = getClientKey(req);
  const now = Date.now();

  const record = requests.get(key);
  if (!record || record.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    res.setHeader("Retry-After", String(retryAfter));
    return res.status(429).json({ message: "Too many requests. Try again later." });
  }

  record.count += 1;
  return next();
};
