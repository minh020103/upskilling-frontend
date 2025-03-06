export interface Challenge {
    id: number,
    image: string,
    title: string,
    description: string,
    duration: number,
    requirements: string[],
    guidelines: string[],
    starterCode: string[],
    bonusPoints: string[],
    evaluationCriteria: string[],
}
export interface AvatarModel {
    avatar: string,
}