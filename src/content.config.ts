// Colecciones de contenido HGS — contrato en specs/tech_spec.md §2.
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Marcador de dato aún no entregado; `npm run build` (scripts/validar-contenido.mjs --produccion) lo rechaza. */
export const PENDIENTE = 'PENDIENTE' as const;
const pendiente = <T extends z.ZodType>(esquema: T) => z.union([esquema, z.literal(PENDIENTE)]);

const DOMINIOS_MERCADO_PAGO = ['mpago.la', 'mercadopago.cl', 'mercadopago.com', 'link.mercadopago.cl'];

const enlaceMercadoPago = z.string().refine(
  (valor) => {
    try {
      const url = new URL(valor);
      return url.protocol === 'https:' &&
        DOMINIOS_MERCADO_PAGO.some((d) => url.hostname === d || url.hostname.endsWith(`.${d}`));
    } catch {
      return false;
    }
  },
  { message: 'mpLink debe ser una URL https de Mercado Pago (mpago.la o mercadopago.cl)' },
);

const fechaISO = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato AAAA-MM-DD');

const cohorte = z.object({
  id: z.string().min(1),
  inicio: fechaISO,
  termino: pendiente(fechaISO),
  horario: pendiente(z.string().min(1)),
  cupos: pendiente(z.number().int().positive()),
  estado: z.enum(['abierta', 'agotada', 'cerrada']),
});

const cursos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cursos' }),
  schema: z.object({
    titulo: z.string().min(1),
    resumen: z.string().min(1).max(200, 'El resumen no debe superar 200 caracteres'),
    area: z.enum(['hidrogeologia', 'geociencias']),
    orden: z.number().int(),
    prerrequisitos: z.array(reference('cursos')).default([]),
    docentes: z.array(reference('docentes')).min(1),
    plataforma: z.literal('google-meet'),
    horas: pendiente(z.number().positive()),
    semanas: pendiente(z.number().int().positive()),
    software: z.array(z.object({
      nombre: z.string().min(1),
      licencia: z.enum(['libre', 'prueba', 'comercial']),
    })).default([]),
    modulos: z.array(z.object({
      titulo: z.string().min(1),
      contenido: z.string().min(1),
      entregable: z.string().min(1),
      horas: z.number().positive().optional(),
    })).min(1),
    contenidoValidado: z.boolean(),  // resumen, descripción y temario revisados por el docente
    figura: z.object({ src: z.string().min(1), alt: z.string().min(1) }).optional(),
    diagrama: z.enum(['theis', 'talud']).optional(),  // figura calculada (src/components/Figura*.astro)
    precioCLP: z.number().int().positive('precioCLP debe ser un entero positivo'),
    mpLink: pendiente(enlaceMercadoPago),
    cohortes: z.array(cohorte).min(1),
    faq: z.array(z.object({ pregunta: z.string(), respuesta: z.string() })).default([]),
    resenas: z.array(z.object({
      nombre: z.string(),
      cargo: z.string(),
      fecha: fechaISO,
      texto: z.string(),
      nota: z.number().int().min(1).max(5),
    })).default([]),
  }),
});

const docentes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/docentes' }),
  schema: z.object({
    nombre: z.string().min(1),
    titulo: pendiente(z.string().min(1)),
    bio: pendiente(z.string().min(1)),
    foto: z.string().optional(),
    linkedin: z.url().optional(),
  }),
});

export const collections = { cursos, docentes };
