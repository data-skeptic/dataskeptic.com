# dataskeptic.com

## Migrate production configs to dev configs

heroku config -s -a dataskeptic-com > config.txt
cat config.txt | tr '\n' ' ' | xargs heroku config:set -a dataskeptic-com-dev


