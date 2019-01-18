// TODO: this is now a global shape
import { MenuLabels } from '../main-process/menu'

import { ExternalEditor } from './editors'
import { Shell } from './shells'
import { PullRequest } from '../models/pull-request'
import { Branch } from '../models/branch'

type PreferredLabelsParameters = {
  readonly currentPullRequest: PullRequest | null
  readonly defaultBranch: Branch | null
  readonly selectedExternalEditor?: ExternalEditor
  readonly selectedShell?: Shell
}

export function getPreferredLabels({
  currentPullRequest,
  defaultBranch,
  selectedExternalEditor,
  selectedShell,
}: PreferredLabelsParameters): MenuLabels {
  const editorLabel = selectedExternalEditor
    ? `Open in ${selectedExternalEditor}`
    : undefined

  const shellLabel = selectedShell ? `Open in ${selectedShell}` : undefined

  return {
    editorLabel,
    pullRequestLabel: getPullRequestLabel(currentPullRequest),
    shellLabel,
    defaultBranchName: getDefaultBranchName(defaultBranch),
  }
}

function getPullRequestLabel(currentPullRequest: PullRequest | null) {
  if (currentPullRequest === null) {
    return undefined
  }

  return __DARWIN__ ? 'Show Pull Request' : 'Show &pull request'
}

function getDefaultBranchName(defaultBranch: Branch | null) {
  if (defaultBranch == null || defaultBranch.upstreamWithoutRemote == null) {
    return undefined
  }
  return defaultBranch.upstreamWithoutRemote
}
