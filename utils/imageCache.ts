// Initialize an empty object to store images
const imageCache: { [url: string]: HTMLImageElement } = {};

// A function to load an image and cache it
export async function loadImageAndCache(
	url: string
): Promise<HTMLImageElement> {
	// If the image is already in the cache, return the cached image
	if (imageCache[url]) {
		return imageCache[url];
	}

	// Otherwise, load the image
	const img = new Image();
	img.src = url;

	// Wait for the image to load
	await new Promise((resolve, reject) => {
		img.onload = resolve;
		img.onerror = reject;
	});

	// Store the loaded image in the cache and return it
	imageCache[url] = img;
	return img;
}
