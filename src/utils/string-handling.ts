export const fileName = (link: string): string => {
    return link.split('\\').pop()+"";
}