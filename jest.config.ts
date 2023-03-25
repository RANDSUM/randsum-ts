export default {
  coverageDirectory: '../coverage/',
  collectCoverage: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js']
}
