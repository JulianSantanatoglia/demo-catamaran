import { useLanguage } from '../context/LanguageContext'
import type { Experience } from '../types'

export function useLocalizedExperience(experience: Experience): Experience {
  const { t } = useLanguage()
  const content = t.experienceContent[experience.slug as keyof typeof t.experienceContent]

  if (!content) return experience

  return {
    ...experience,
    title: content.title,
    shortDescription: content.shortDescription,
    description: content.description,
    highlights: [...content.highlights],
    includes: [...content.includes],
    meetingPoint: content.meetingPoint,
  }
}

export function useLocalizedExperiences(experiences: Experience[]): Experience[] {
  const { t } = useLanguage()
  return experiences.map((exp) => {
    const content = t.experienceContent[exp.slug as keyof typeof t.experienceContent]
    if (!content) return exp
    return {
      ...exp,
      title: content.title,
      shortDescription: content.shortDescription,
      description: content.description,
      highlights: [...content.highlights],
      includes: [...content.includes],
      meetingPoint: content.meetingPoint,
    }
  })
}
