import { company } from '../data/company'

interface LegalPageProps {
  title: string
  children: React.ReactNode
}

function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <div className="mt-8 prose prose-slate max-w-none text-slate-600">{children}</div>
    </div>
  )
}

export function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
        de la Información y de Comercio Electrónico, se informa que el titular de este sitio web es{' '}
        <strong>{company.name}</strong>, con domicilio en {company.address}.
      </p>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Objeto</h2>
      <p>
        El presente aviso legal regula el uso del sitio web destinado a la comercialización y reserva
        de excursiones en catamarán por la costa de Almería.
      </p>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Condiciones de uso</h2>
      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación
        plena de las presentes condiciones. El usuario se compromete a hacer un uso adecuado de los
        contenidos y servicios ofrecidos.
      </p>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos e imágenes,
        son propiedad de {company.name} o de terceros que han autorizado su uso.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        Documento orientativo para demo. Se recomienda revisión por asesor legal antes de publicación.
      </p>
    </LegalPage>
  )
}

export function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        {company.name} se compromete a proteger la privacidad de los usuarios que utilizan nuestro
        sistema de reservas online.
      </p>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Datos que recopilamos</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Nombre, email y teléfono al realizar una reserva</li>
        <li>Datos de pago procesados de forma segura por Stripe (no almacenamos datos de tarjeta)</li>
        <li>Datos de navegación mediante cookies (ver política de cookies)</li>
      </ul>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Finalidad del tratamiento</h2>
      <p>
        Gestionar reservas, enviar confirmaciones, atender consultas y cumplir obligaciones legales.
      </p>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Derechos del usuario</h2>
      <p>
        Puede ejercer sus derechos de acceso, rectificación, supresión y portabilidad contactando
        con {company.email}.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        Documento orientativo para demo. Se recomienda revisión por asesor legal antes de publicación.
      </p>
    </LegalPage>
  )
}

export function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación
        y analizar el tráfico.
      </p>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Tipos de cookies</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Técnicas:</strong> necesarias para el funcionamiento del sitio y el proceso de reserva</li>
        <li><strong>Analíticas:</strong> nos ayudan a entender cómo los usuarios interactúan con la web</li>
        <li><strong>De terceros:</strong> Stripe para procesamiento de pagos</li>
      </ul>
      <h2 className="text-xl font-semibold text-slate-900 mt-6">Gestión de cookies</h2>
      <p>
        Puede configurar su navegador para rechazar cookies, aunque esto puede afectar al funcionamiento
        de algunas funcionalidades como el proceso de reserva y pago.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        Documento orientativo para demo. Se recomienda revisión por asesor legal antes de publicación.
      </p>
    </LegalPage>
  )
}
