import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    id: '1',
    slug: 'catamaran-calas-san-pedro',
    title: 'Catamarán calas San Pedro',
    shortDescription: 'Recorre las calas de San Pedro a bordo de nuestro catamarán con vistas espectaculares.',
    description: '',
    duration: '3h',
    capacity: 20,
    priceAdult: 55,
    priceChild: 30,
    image: '/imagen/catamaran-calas-san-pedro.avif',
    highlights: [],
    includes: [],
    meetingPoint: 'Puerto de Aguadulce, Muelle 3',
    featured: true,
  },
  {
    id: '2',
    slug: 'panoramica-catamaran-calas-cabo-gata',
    title: 'Panorámica catamarán calas Cabo de Gata',
    shortDescription: 'Navega por las calas del Parque Natural de Cabo de Gata en una ruta panorámica inolvidable.',
    description: '',
    duration: '2h 30min',
    capacity: 18,
    priceAdult: 45,
    priceChild: 25,
    image: '/imagen/panoramica-catamaran-calas-cabo-gata.avif',
    highlights: [],
    includes: [],
    meetingPoint: 'Puerto de Aguadulce, Muelle 3',
    featured: true,
  },
]

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug)
}

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id)
}
