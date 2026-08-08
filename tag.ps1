Set-Location $PSScriptRoot

$versionJson = npm pkg get version
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

try {
  $version = $versionJson | ConvertFrom-Json
}
catch {
  Write-Error 'Unable to read the package version.'
  exit 1
}

if ([string]::IsNullOrWhiteSpace($version)) {
  Write-Error 'Package version is empty.'
  exit 1
}

git rev-parse --is-inside-work-tree *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Error 'The script must run from a Git repository.'
  exit $LASTEXITCODE
}

$tag = "v$version"
git show-ref --verify --quiet "refs/tags/$tag"
if ($LASTEXITCODE -eq 0) {
  Write-Error "Tag already exists: $tag"
  exit 1
}
if ($LASTEXITCODE -ne 1) { exit $LASTEXITCODE }

Write-Host "Create and push tag: $tag"
$confirmation = Read-Host 'Continue? [y/N]'
if ($confirmation -notmatch '^[yY]$') {
  Write-Host 'Tag creation cancelled.'
  exit 0
}

git tag $tag
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

git push origin $tag
exit $LASTEXITCODE
