function parse_git_dirty() {
  git diff --quiet --ignore-submodules HEAD 2>/dev/null; [ $? -eq 1 ]
}

# gets the current git branch
function parse_git_branch() {
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1$(parse_git_dirty)/"
}

# get last commit hash prepended with @ (i.e. @8a323d0)
function parse_git_hash() {
  git rev-parse --short HEAD 2> /dev/null
}

GIT_BRANCH=$(parse_git_branch)_$(parse_git_hash)

VERSION=$(date +"%Y%m%d").git.$GIT_BRANCH
IMAGE=dataskeptic_dataskeptic.com
docker build -t $IMAGE:$VERSION .
echo $IMAGE:$VERSION > latest.txt
echo $IMAGE:$VERSION
