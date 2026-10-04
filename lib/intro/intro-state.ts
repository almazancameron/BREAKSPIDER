export const INTRO_SEEN_STORAGE_KEY = "breakspider_intro_seen_v1"

export type IntroStorage = Pick<Storage, "getItem" | "setItem">
export type IntroSeenStatus = "seen" | "unseen" | "unavailable" 

const getBrowserStorage = (): IntroStorage | null => {
    try {
        return typeof window === 'undefined' ? null : window.localStorage
    } catch {
        return null
    }
}

export const readIntroSeen = (storage: IntroStorage | null = getBrowserStorage()): IntroSeenStatus => {
    if (!storage) return "unavailable"

    try {
        return storage.getItem(INTRO_SEEN_STORAGE_KEY) === "true" ?
            "seen" :
            "unseen"
    } catch {
        return "unavailable"
    }
}

export const markIntroSeen = (storage: IntroStorage | null = getBrowserStorage()): boolean => {
    if (!storage) return false

    try {
        storage.setItem(INTRO_SEEN_STORAGE_KEY, "true")
        return true
    } catch {
        return false
    }
}

export const shouldShowInitialIntro = (initialPathname: string, status: IntroSeenStatus) => {
    return initialPathname === '/' && status === 'unseen'
}
