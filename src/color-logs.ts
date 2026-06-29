type ColorFunction = (input: string) => string;
type LogFunction = (...args: unknown[]) => void;

function setupColorLogFunction(name: string): LogFunction {
    const fn: ColorFunction = require(`ansi-${name}`);
    return (...args: unknown[]): void => {
        console.log(...args.map((arg) => fn(String(arg))));
    };
}

export const red = setupColorLogFunction("red");
export const yellow = setupColorLogFunction("yellow");
export const gray = setupColorLogFunction("gray");
export const error = setupColorLogFunction("red");
