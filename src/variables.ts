import stylelint from 'stylelint';
import ThemeizerWorker from 'themeizer/dist/Themeizer/Worker';
import ThemeizerPlugin from 'themeizer/dist/webpack/plugin';
import getSortedThemeColors from 'themeizer-cli/dist/lib/getSortedThemeColors';
import getReplacerData from 'themeizer-cli/dist/lib/getReplacerData';

const { report, ruleMessages } = stylelint.utils;

const ruleName = 'themeizer/variables';
const messages = ruleMessages(ruleName, {
    expected: (unfixed, fixed) => `The color from property "${unfixed}" exists as a variable, you can change it to "${fixed}"`,
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;

let Worker: Promise<ThemeizerWorker>;

module.exports = stylelint.createPlugin(ruleName, function ruleFunction(primaryOption, _secondaryOptionObject, context) {
    if (typeof primaryOption.url !== 'string' || typeof primaryOption.revalidate !== 'number' || typeof primaryOption.lookedTheme !== 'string') {
        throw new Error('Error: Invalid options  themeizer/variables')
    };
    const {lookedTheme, ...options} = primaryOption;
    new ThemeizerPlugin(options);
    if (!Worker) {
        Worker = ThemeizerWorker.init(options)
    }
    const isAutoFixing = Boolean(context.fix);
    return async function lint(postcssRoot, postcssResult: any) {
        if (postcssRoot.type !== 'root' || !postcssRoot.source) return;
        const { data } = await Worker;

        const colorsSorted = getSortedThemeColors(data, lookedTheme);

        postcssRoot.walkDecls((deckl) => {
            const { value } = deckl;
            colorsSorted.forEach((color) => {
                const {replaceTo, regex} = getReplacerData(color);
                if (!value.match(regex)) return;

                const newValue = value.replace(regex, replaceTo);
                if (isAutoFixing) {
                    deckl.value = newValue;
                } else {
                    report({
                        ruleName,
                        result: postcssResult,
                        message: messages.expected(value, newValue),
                        node: deckl,
                        word: value,
                    });
                }
            });
        });
    }
});
