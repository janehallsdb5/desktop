import { getPreferredLabels } from '../../src/lib/preferred-menu-labels'

describe('getPreferredLabels', () => {
  const baseParameters = {
    currentPullRequest: null,
    defaultBranch: null,
  }

  const expectedLabelNoConfirm = __DARWIN__ ? 'Remove' : '&Remove'
  const expectedLabelRequireConfirm = __DARWIN__ ? 'Remove...' : '&Remove...'

  describe('remove repository label', () => {
    it('returns a string without ellipses when false is received', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
        showRepositoryRemoveDialog: false,
      })

      expect(actual.removeRepositoryLabel).toBe(expectedLabelNoConfirm)
    })

    it('returns a string with ellipses when true is received', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
        showRepositoryRemoveDialog: true,
      })

      expect(actual.removeRepositoryLabel).toBe(expectedLabelRequireConfirm)
    })
  })
})
