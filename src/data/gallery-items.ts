export type GalleryItem = {
  id: string
  title: string
  category?: string
  year?: string
  image: string
  slug?: string
  // Additional layout properties for 3D positioning
  initialX: number // percentage
  initialY: number // percentage
  zIndex: number
  rotation: number // degrees
  scale: number
  depth: number // for parallax depth (0-1)
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Kinetic Sculpture Study',
    category: 'Research',
    year: '2024',
    image: '/images/gallery/work-01.png',
    initialX: 20,
    initialY: 30,
    zIndex: 10,
    rotation: -5,
    scale: 1,
    depth: 0.2,
  },
  {
    id: '2',
    title: 'Minimalist Architecture',
    category: 'Studio',
    year: '2024',
    image: '/images/gallery/work-02.png',
    initialX: 60,
    initialY: 15,
    zIndex: 5,
    rotation: 3,
    scale: 0.8,
    depth: 0.5,
  },
  {
    id: '3',
    title: 'Light & Shadow Interaction',
    category: 'Experimental',
    year: '2023',
    image: '/images/gallery/work-03.png',
    initialX: 45,
    initialY: 55,
    zIndex: 15,
    rotation: -2,
    scale: 1.1,
    depth: 0.1,
  },
  {
    id: '4',
    title: 'Organic Texture Mapping',
    category: 'Research',
    year: '2024',
    image: '/images/gallery/work-04.png',
    initialX: 75,
    initialY: 65,
    zIndex: 8,
    rotation: 6,
    scale: 0.9,
    depth: 0.4,
  },
  {
    id: '5',
    title: 'Abstract Form 05',
    category: 'Creative',
    year: '2024',
    image: '/images/gallery/work-05.png',
    initialX: 10,
    initialY: 70,
    zIndex: 12,
    rotation: -4,
    scale: 1,
    depth: 0.3,
  },
  {
    id: '6',
    title: 'Glass Reflection Study',
    category: 'Experimental',
    year: '2024',
    image: '/images/gallery/work-06.png',
    initialX: 40,
    initialY: 10,
    zIndex: 6,
    rotation: 2,
    scale: 0.7,
    depth: 0.6,
  },
]
