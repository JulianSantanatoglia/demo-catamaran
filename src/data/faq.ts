export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: '¿Cómo funciona la reserva online?',
    answer:
      'Elige la excursión, selecciona fecha y horario disponible, indica el número de adultos y niños, completa tus datos y realiza el pago seguro con tarjeta. Recibirás confirmación inmediata por email.',
  },
  {
    question: '¿Qué pasa si hace mal tiempo?',
    answer:
      'La seguridad es nuestra prioridad. Si las condiciones meteorológicas no son adecuadas, te contactaremos para reprogramar la salida sin coste adicional o gestionar el reembolso según nuestra política.',
  },
  {
    question: '¿Hay edad mínima para los niños?',
    answer:
      'Los menores de 3 años pueden embarcar gratis (máximo 1 por adulto). A partir de 3 años se aplica tarifa infantil. Todos los menores deben ir acompañados de un adulto responsable.',
  },
  {
    question: '¿Puedo cancelar mi reserva?',
    answer:
      'Puedes cancelar con reembolso completo hasta 48 horas antes de la salida. Entre 48h y 24h, reembolso del 50%. Menos de 24h no hay reembolso, salvo cancelación por nuestra parte.',
  },
  {
    question: '¿Dónde es el punto de embarque?',
    answer:
      'Embarcamos en el Puerto Deportivo de Aguadulce, Muelle 3. Te enviaremos la ubicación exacta y recomendaciones de aparcamiento con tu confirmación de reserva.',
  },
  {
    question: '¿Qué debo llevar?',
    answer:
      'Traje de baño, toalla, protector solar, gafas de sol y calzado cómodo. En excursiones de snorkel proporcionamos el material necesario. Recomendamos llegar 15 minutos antes.',
  },
]
