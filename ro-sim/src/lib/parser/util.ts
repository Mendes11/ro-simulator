export function stringMatcher(...names: string[]) {
    const keys = names.join("|")
    return new RegExp(`\\b(?:${keys})\\b:[\\s\\S]*?\\d{6}([^\\^].*?)\\^`, "i")
}

export function intMatcher(...names: string[]) {
    const keys = names.join("|")
    return new RegExp(`(?:\\\\n|\\b)(?:${keys})\\b:[\\s\\S]*?\\d{6}([^\\^]\\d{0,})\\^`, "i")
}

export function matchString(text: string, ...names: string[]): string | undefined {
    const content = stringMatcher(...names).exec(text);
    if (content != null && content?.length > 1) {
        return content[1].trim();
    }
    return
}

export function matchInt(text: string, ...names: string[]): number | undefined {
    const content = intMatcher(...names).exec(text);
    if (content != null && content.length > 1) {
        const value = parseInt(content[1])
        return Number.isNaN(value) ? undefined : value;
    }
    return
}
