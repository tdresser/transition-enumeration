export function fail(msg?: string): never {
    throw new Error(msg ? msg : "Failure");
}

declare global {
    interface CSSStyleDeclaration {
        viewTransitionName: string;
    }
}

// Scoped query generator, intended to make assigning things view-transition-names as easy as possible.
export function generateScopedQuery(container: HTMLElement) {
    return (query: string): HTMLElement => {
        const results = [...container.querySelectorAll(query)].filter(x => x.checkVisibility());
        if (results.length != 1) {
            console.log(container);
            throw new Error(`Container contains ${results.length} matches to "${query}, required 1."`)
        }
        return results[0] as HTMLElement;
    }
}