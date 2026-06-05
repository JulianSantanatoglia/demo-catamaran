import { experiences } from '../data/experiences'
import { ExperienceCard } from '../components/home/ExperienceCard'
import { Reveal } from '../components/ui/Reveal'
import { useLanguage } from '../context/LanguageContext'
import { useLocalizedExperiences } from '../hooks/useLocalizedExperience'

export function Experiences() {
  const { t } = useLanguage()
  const localized = useLocalizedExperiences(experiences)

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <Reveal className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.experiences.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-500 leading-relaxed">
          {t.experiences.subtitle}
        </p>
      </Reveal>
      <div className="mt-14 flex flex-wrap justify-center gap-6">
        {localized.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 120} variant="up" className="w-full max-w-sm">
            <ExperienceCard experience={exp} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
