import { getPreferredLabels } from '../../src/lib/preferred-menu-labels'
import { Shell as MacOSShell } from '../../src/lib/shells/darwin'
import { Shell as WindowShell } from '../../src/lib/shells/win32'
import { Shell as LinuxShell } from '../../src/lib/shells/linux'

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

      expect(actual.shellLabel).toBeUndefined()
    })

    it('can render a macOS entry', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
        selectedShell: MacOSShell.iTerm2,
      })

      expect(actual.shellLabel).toBe('Open in iTerm2')
    })

    it('can render a Windows shell', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
        selectedShell: WindowShell.GitBash,
      })

      expect(actual.shellLabel).toBe('Open in Git Bash')
    })

    it('can render a Windows shell', () => {
      const actual = getPreferredLabels({
        ...baseParameters,
        selectedShell: LinuxShell.Konsole,
      })

      expect(actual.shellLabel).toBe('Open in Konsole')
    })
  })
})
