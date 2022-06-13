let common = [
    'features/**/*.feature',
    '--require-module ts-node/register',
    '--require src/tests/steps/*.ts',
    '--publish-quiet'
].join(' ')

module.exports = {
    default: common
}
