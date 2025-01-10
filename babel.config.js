module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'nativewind/babel', // Ensure this is correctly installed and specified
        ],
    };
};
