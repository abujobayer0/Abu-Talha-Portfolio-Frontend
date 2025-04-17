import { TProject } from '@/types';

/**
 * Finds related projects based on matching technologies
 * @param {Array} allProjects - Array of all project objects
 * @param {string} currentProjectId - ID of the current project to exclude
 * @param {number} minTechMatch - Minimum number of matching technologies required (default: 4)
 * @return {Array} - Array of related projects sorted by number of matching technologies
 */
export function findRelatedProjects(
  allProjects: TProject[],
  currentProjectId: string,
  minTechMatch = 3
) {
  const currentProject = allProjects.find(
    (project) => project._id === currentProjectId
  );

  if (!currentProject) {
    console.error('Current project not found!');
    return [];
  }
  const currentTechIds = currentProject.technologies.map((tech) => tech._id);
  const relatedProjects = allProjects
    .filter((project) => {
      if (project._id === currentProjectId) return false;
      const projectTechIds = project.technologies.map((tech) => tech._id);
      const matchingTechs = projectTechIds.filter((techId) =>
        currentTechIds.includes(techId)
      );

      project.matchCount = matchingTechs.length;

      return matchingTechs.length >= minTechMatch;
    })
    .sort((a: any, b: any) => b.matchCount - a.matchCount);

  return relatedProjects;
}
