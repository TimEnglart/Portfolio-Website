type IGithubLanguageSchema = {
    _id: string;

} & GithubLanguageData;

interface GithubLanguageData {
    bytes: number;
    percent: number;
    projects: {
        public: number;
        private: number;
    };
}

export type { IGithubLanguageSchema, GithubLanguageData }

export default IGithubLanguageSchema;
