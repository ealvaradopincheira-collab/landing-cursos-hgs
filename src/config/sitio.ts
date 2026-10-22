// Datos institucionales de HGS. Los valores PENDIENTE bloquean `npm run build` (D-08 en specs/prd.md).
export const SITIO = {
  nombre: 'HGS',
  descriptor: 'Hidrogeología y geociencias',
  descripcion:
    'Cursos en vivo de hidrogeología y geociencias aplicadas: pruebas de bombeo y remociones en masa, dictados por especialistas por Google Meet.',
  correo: 'PENDIENTE',
  convenioMinimoAlumnos: 6,
  /** Términos y privacidad son borradores hasta su revisión por HGS (con asesoría legal). */
  legalesValidados: false,
} as const;
