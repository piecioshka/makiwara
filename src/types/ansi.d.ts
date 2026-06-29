// The `ansi-*` color packages ship no type definitions and have no
// matching `@types/*` package, so declare their minimal shape here.
// Each module exports a single function that wraps a string with ANSI codes.

declare module "ansi-bold" {
    const f: (input: string) => string;
    export = f;
}

declare module "ansi-gray" {
    const f: (input: string) => string;
    export = f;
}

declare module "ansi-red" {
    const f: (input: string) => string;
    export = f;
}

declare module "ansi-yellow" {
    const f: (input: string) => string;
    export = f;
}
