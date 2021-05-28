export default interface IGithubRepoSchema {
    name: string;
    bytes: number;
    languages: {
        name: string;
        bytes: number;
    }[];
}