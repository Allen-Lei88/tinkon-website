type GalleryCaption = { caption: string; alt: string };

// Add descriptions only where the corresponding asset has been reviewed.
export const galleryCaptions: Readonly<Partial<Record<string, GalleryCaption>>> = {
  "/catalog/gallery-model-yl-under-seat-storage-view-02.jpg": {
    caption: "Installed tray beneath the front seat",
    alt: "Black storage tray fitted under the Tesla Model YL front seat beside the seat rail",
  },
  "/catalog/gallery-model-yl-under-seat-storage-view-03.jpg": {
    caption: "Tray placement and storage examples",
    alt: "Four under-seat tray views showing bottles, water droplets, a divided compartment and placement by hand",
  },
  "/catalog/gallery-model-yl-under-seat-storage-view-04.jpg": {
    caption: "Open and divided trays shown in place",
    alt: "Installed open tray and divided tray beneath the front seats, shown in two photos",
  },
  "/catalog/gallery-model-yl-under-seat-storage-view-05.jpg": {
    caption: "Top view of the two-piece tray set",
    alt: "Black open tray and divided tray viewed from above against a white background",
  },
};
