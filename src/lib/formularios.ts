// Envío AJAX de formularios Netlify con validación en línea y reintento.
// Netlify Forms recibe un POST x-www-form-urlencoded con el campo `form-name`.

const MENSAJES: Record<string, string> = {
  valueMissing: 'Este campo es obligatorio.',
  typeMismatch: 'Revisa el formato (ejemplo: nombre@empresa.cl).',
  rangeUnderflow: 'El valor es menor que el mínimo permitido.',
  tooShort: 'El texto es demasiado corto.',
};

/** Mensajes propios por campo: data-mensaje-faltante y data-mensaje-min. */
function mensajeDe(campo: HTMLInputElement | HTMLTextAreaElement): string {
  const { mensajeFaltante, mensajeMin } = campo.dataset;
  if (campo.validity.valueMissing && mensajeFaltante) return mensajeFaltante;
  if (campo.validity.rangeUnderflow && mensajeMin) return mensajeMin;
  for (const clave of Object.keys(MENSAJES) as (keyof ValidityState)[]) {
    if (campo.validity[clave]) return MENSAJES[clave];
  }
  return campo.validationMessage;
}

function mostrarError(campo: HTMLInputElement | HTMLTextAreaElement, texto: string) {
  const error = document.querySelector<HTMLElement>(`[data-error-de="${campo.id}"]`);
  campo.setAttribute('aria-invalid', texto ? 'true' : 'false');
  if (!error) return;
  error.textContent = texto;
  error.hidden = !texto;
}

function validar(form: HTMLFormElement): boolean {
  let primero: HTMLElement | null = null;
  for (const campo of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:not([type=hidden]), textarea')) {
    if (campo.name === 'campo-trampa') continue;
    const valido = campo.checkValidity();
    mostrarError(campo, valido ? '' : mensajeDe(campo));
    if (!valido && !primero) primero = campo;
  }
  primero?.focus();
  return !primero;
}

/** Identificador corto y legible para cruzar la inscripción con el pago: HGS-7K2Q9M. */
export function idEnvio(aleatorio: () => number = Math.random): string {
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'HGS-' + Array.from({ length: 6 }, () => alfabeto[Math.floor(aleatorio() * alfabeto.length)]).join('');
}

export function activarFormularios() {
  for (const form of document.querySelectorAll<HTMLFormElement>('[data-formulario]')) {
    if (form.dataset.activo) continue;
    form.dataset.activo = '1';

    const boton = form.querySelector<HTMLButtonElement>('[data-enviar]')!;
    const estado = form.querySelector<HTMLElement>('[data-estado]')!;
    const errorEnvio = form.querySelector<HTMLElement>('[data-error-envio]')!;
    const exito = form.nextElementSibling as HTMLElement | null;
    const campoId = form.querySelector<HTMLInputElement>('input[name="id-inscripcion"]');
    if (campoId && !campoId.value) campoId.value = idEnvio();

    // Limpia el error de un campo mientras se corrige. Se hace en `input` y no en `focusout`:
    // al quitar el mensaje cambia la altura del formulario, y si ocurre al salir del campo
    // el contenido se desplaza bajo el dedo justo cuando se toca el siguiente control.
    form.addEventListener('input', (e) => {
      const campo = e.target as HTMLInputElement;
      if (campo.getAttribute?.('aria-invalid') === 'true' && campo.checkValidity()) {
        mostrarError(campo, '');
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (boton.getAttribute('aria-busy') === 'true') return;
      if (!validar(form)) return;

      errorEnvio.hidden = true;
      boton.setAttribute('aria-busy', 'true');
      boton.disabled = true;
      estado.textContent = 'Enviando…';

      try {
        const cuerpo = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
        // Netlify Forms recibe el POST AJAX en "/"; `action` queda como respaldo sin JavaScript.
        const respuesta = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: cuerpo.toString(),
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);

        estado.textContent = '';
        const destino = form.dataset.redirigir;
        if (destino) {
          const url = new URL(destino, location.href);
          if (campoId) url.searchParams.set('id', campoId.value);
          location.assign(url.href);
          return;
        }
        form.hidden = true;
        if (exito) {
          exito.hidden = false;
          exito.focus();
        }
      } catch {
        estado.textContent = '';
        errorEnvio.hidden = false;
      } finally {
        boton.removeAttribute('aria-busy');
        boton.disabled = false;
      }
    });
  }
}
