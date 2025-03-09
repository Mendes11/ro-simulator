export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DP_APIKEY?: string
        }
    }
}
