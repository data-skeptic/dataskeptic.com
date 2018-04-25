# dataskeptic.com

Source for the web app powering dataskeptic.com

## Building

```
docker build -t dataskeptic ./
```

## Running Locally

```
docker run -t -i -p 3000:3000 -p 443:4430 -p 9001:9001 dataskeptic:latest
```

## Running Production

```
docker run -t -i -p 80:80 -p 443:443 -p 9001:9001 dataskeptic:latest
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
