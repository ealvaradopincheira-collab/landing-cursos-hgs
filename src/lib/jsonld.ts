// Datos estructurados Schema.org para la ficha de curso (RF-06).
// Los campos PENDIENTE se omiten: nunca se publica un dato inventado.
import type { CollectionEntry } from 'astro:content';
import { SITIO } from '../config/sitio';
import { cohorteAbierta } from './cohortes';

type Curso = CollectionEntry<'cursos'>;
type Docente = CollectionEntry<'docentes'>;

const real = <T>(v: T | 'PENDIENTE'): T | undefined => (v === 'PENDIENTE' ? undefined : v);

export function jsonLdCurso(curso: Curso, docentes: Docente[], url: string) {
  const d = curso.data;
  const cohorte = cohorteAbierta(d.cohortes);
  const resenas = d.resenas;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: d.titulo,
    description: d.resumen,
    url,
    inLanguage: 'es-CL',
    provider: { '@type': 'Organization', name: SITIO.nombre },
    instructor: docentes.map((p) => ({ '@type': 'Person', name: p.data.nombre })),
    offers: {
      '@type': 'Offer',
      price: d.precioCLP,
      priceCurrency: 'CLP',
      category: 'Paid',
      availability: cohorte ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
    ...(cohorte && {
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        location: { '@type': 'VirtualLocation', name: 'Google Meet' },
        startDate: cohorte.inicio,
        ...(real(cohorte.termino) && { endDate: real(cohorte.termino) }),
        ...(real(d.horas) && { courseWorkload: `PT${real(d.horas)}H` }),
      },
    }),
    ...(resenas.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (resenas.reduce((s, r) => s + r.nota, 0) / resenas.length).toFixed(1),
        reviewCount: resenas.length,
      },
    }),
  };
}
