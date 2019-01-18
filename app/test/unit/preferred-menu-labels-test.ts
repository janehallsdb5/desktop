import { getPreferredLabels } from '../../src/lib/preferred-menu-labels'
import { Shell } from '../../src/lib/shells/win32'
import { ExternalEditor } from '../../src/lib/editors/win32'

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

  describe('shellLabel', () => {
    const baseParameters = {
      currentPullRequest: null,
      defaultBranch: null,
      showRepositoryRemoveDialog: false,
    }

    it('returns undefined by default', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
      })

      expect(actual.shellLabel).toBeUndefined()
    })

    it('can render shell label with spaces', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
        selectedShell: Shell.GitBash,
      })

      expect(actual.shellLabel).toBe('Open in Git Bash')
    })
  })

  describe('editorLabel', () => {
    const baseParameters = {
      currentPullRequest: null,
      defaultBranch: null,
      showRepositoryRemoveDialog: false,
    }

    it('returns undefined by default', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
      })

      expect(actual.editorLabel).toBeUndefined()
    })

    it('can render a editor option', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
        selectedExternalEditor: ExternalEditor.SublimeText,
      })

      expect(actual.editorLabel).toBe('Open in Sublime Text')
    })
  })
})
