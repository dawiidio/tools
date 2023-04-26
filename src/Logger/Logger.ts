type LevelsSeparator = '|';
type MaximumAllowedLevelsInConfigString = 4;

export declare enum ILogLevel {
    debug = 8,
    info = 4,
    warn = 2,
    error = 1,
}

export const LogLevel: typeof ILogLevel = {
    debug: 8,
    info: 4,
    warn: 2,
    error: 1,
} as const;

type LogLevelCombinedKeys = `${keyof typeof ILogLevel}`;

type Last<T extends string[]> = T extends [...infer _, infer Last] ? Last : never;

type ConcatPrevious<T extends any[]> = Last<T> extends string ? `${Last<T>}${LevelsSeparator}${LogLevelCombinedKeys}` : never

type Mapped<N extends number,
    Result extends Array<unknown> = [LogLevelCombinedKeys],
> =
    (Result['length'] extends N
        ? Result
        : Mapped<N, [...Result, ConcatPrevious<Result>]>
    );

export type ILoggerConfigString = Mapped<MaximumAllowedLevelsInConfigString>[number];

export interface ILogAttributes {
    logLevel: ILogLevel;
}

const DEFAULT_LOG_ATTRS: ILogAttributes = {
    logLevel: LogLevel.debug,
};

export type ILogMessageParser = (message: string, attrs: Partial<ILogAttributes>) => string;

const LEVELS_SEPARATOR: LevelsSeparator = '|';

export class Logger<LL extends ILogLevel = ILogLevel> {
    static parseLogLevel(levels: ILoggerConfigString): number  {
        const levelsArray = levels.split(LEVELS_SEPARATOR) as (keyof typeof LogLevel)[];
        let acc = 0;

        for (const level of levelsArray) {
            if (!LogLevel[level])
                throw new Error(`Invalid log level: ${level}`);

            acc += LogLevel[level];
        }

        return acc;
    }

    logLevel: number = LogLevel.error;

    messageParser: ILogMessageParser = (message: string, attrs: Partial<ILogAttributes>) => {
        return `[${this.getLogLevelName(this.logLevel)}] ${message}`;
    };

    setLogLevel(level: number | ILogLevel) {
        this.logLevel = level;
    }

    log(message: string, attrs: Partial<ILogAttributes> = {}) {
        const attributes = {
            ...DEFAULT_LOG_ATTRS,
            ...attrs,
        };

        if (attributes.logLevel & this.logLevel) {
            // eslint-disable-next-line no-console
            console[this.getLogLevelName(attributes.logLevel)](this.messageParser(message, attributes));
        }
    }

    private getLogLevelName(level: number): keyof typeof LogLevel {
        const levelName =  Object.entries(LogLevel).find(([, value]) => value === level)?.[0];

        if (!levelName)
            throw new Error(`Invalid log level: ${level}`);

        return levelName as keyof typeof LogLevel;
    }
}
