export interface Source {
    getWords(): Promise<string[]>
}