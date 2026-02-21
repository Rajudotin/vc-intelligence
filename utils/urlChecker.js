// utils/urlChecker.js
export async function checkUrlHealth(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      url: res.url,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
      url,
    };
  }
}

export const HEALTHY_TEST_URLS = [
  { name: "Example.com", url: "https://example.com", reliable: true },
  { name: "Google", url: "https://www.google.com", reliable: true },
  { name: "GitHub", url: "https://github.com/about", reliable: true },
  { name: "Microsoft", url: "https://www.microsoft.com", reliable: true },
];