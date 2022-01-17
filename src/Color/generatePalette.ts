import chroma from 'chroma-js';
import type { InterpolationMode, Scale } from 'chroma-js';

interface GeneratePaletteOptions {
    interpolation: {
        type: 'linear' | 'bezier';
        mode: InterpolationMode;
    };
}

const DEFAULT_OPTIONS: GeneratePaletteOptions = {
    interpolation: {
        type: 'linear',
        mode: 'lrgb',
    },
};

export const generatePalette = (
    colors: string[],
    size: number,
    _options: Partial<GeneratePaletteOptions> = {},
) => {
    const {
        interpolation: { type, mode },
    } = {
        ...DEFAULT_OPTIONS,
        ..._options,
    };
    let scale: Scale | undefined = undefined;

    switch (type) {
        case 'linear':
            scale = chroma.scale(colors);
            break;
        case 'bezier':
            scale = chroma.bezier(colors).scale();
            break;
        default:
            throw new Error(`Unknown interpolation method ${type}`);
    }

    return scale.correctLightness(true).mode(mode).colors(size);
};
