# dataskeptic.com

This repository is being deprecated due to major issues with the codebase.  The new repository is here: https://github.com/data-skeptic/dataskeptic.com_v3

## Simulate environment configuration locally

! Be sure that you have own `.env` file


```
export $(cat .env | grep -v ^# | xargs)
```

## Building

```
docker build -t dataskeptic ./
```

## Running Locally

```
docker run -t -i -p 3000:3000 -p 4430:4430 -p 9001:9001 --env-file .env IMcAGE_ID
```

## Running Production

```
docker run -t -i -p 80:3000 -p 443:4430 -p 9001:9001 --env-file .env IMAGE_ID
```

## Release Image

```
heroku container:release web -a dataskeptic
```

## Configure bucket
Create buckets:
 1. `proposals-recordings`.
 1. `proposals-files`.

### Edit bucket permissions.

Set bucket permissions to:
```
{
  "Id": "Policy1490432559268",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1490432557754",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::%name%/*",
      "Principal": "*"
    }
  ]
}
```
