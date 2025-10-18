# Zdielaj.si

The application helps users quickly and easily share photos and videos without reducing quality.

## Required AWS services

* S3
* CloudFront
* Cognito
* Lambda
* DynamoDB
* API Gateway
* Media Convert

## Run frontend app

```shell
cd application/

npm install

npm run dev
```

## User flows

### Basic communication

```mermaid
flowchart TD
    User(["User"]) --> APIGW{{"API Gateway"}}
    APIGW --> Lambda{{"Lambda"}}
    APIGW --> C{{Cognito}}
    Lambda --> C
    Lambda --> DDB{{"DynamoDB"}}
    Lambda --> CF{{CloudFront}}
    Lambda --> S3{{S3}}
```

### Upload fllow

```mermaid
flowchart TD
    User(["User"]) --> |presigned post request| S3{{S3}}
    S3{{S3}} --> |.mov .avi| Lambda{{Lambda}}
    Lambda --> |video to mp4 and preview images| MC{{MediaConvert}}
```

### View flow

```mermaid
flowchart TD
    User(["User"]) --> CF{{CloudFront}}
    CF --> S3{{S3}}
    S3 --> |image preview does not exist| Lambda{{Lambda}}
    Lambda --> |generate image preview| S3
```

## License

[MIT license](./LICENSE)
