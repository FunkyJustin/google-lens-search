// Function to create Google Lens URL with the image URL
function searchWithGoogleLens(imageUrl) {
  const googleLensBaseUrl = "https://lens.google.com/uploadbyurl";
  const params = new URLSearchParams({
    url: imageUrl,
    hl: "en-PH",
    re: "df",
    st: Date.now().toString(),
    vpw: window.innerWidth.toString(),
    vph: window.innerHeight.toString(),
    ep: "gsbubu"
  });

  return `${googleLensBaseUrl}?${params.toString()}`;
}

// Create context menu for images
chrome.contextMenus.create({
  id: "searchGoogleLens",
  title: "Search image with Google Lens",
  contexts: ["image"]
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchGoogleLens") {
    const googleLensUrl = searchWithGoogleLens(info.srcUrl);
    chrome.tabs.create({ url: googleLensUrl });
  }
});
