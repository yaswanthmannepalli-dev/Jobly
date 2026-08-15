"use server";

export async function getAboutFromUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    });
    
    if (!res.ok) return null;
    
    const text = await res.text();
    
    // Attempt to extract og:description or name="description"
    const ogMatch = text.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) || 
                    text.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i);
    if (ogMatch && ogMatch[1]) return ogMatch[1];

    const descMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                      text.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    if (descMatch && descMatch[1]) return descMatch[1];
    
    return null;
  } catch (error) {
    console.error("Failed to fetch about from URL:", error);
    return null;
  }
}
