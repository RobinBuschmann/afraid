export const isValidatorName = (name: string) =>
    name.substr(0, 2).toLowerCase() === 'is' ||
    ['contains', 'matches', 'equals'].indexOf(name) >= 0;
