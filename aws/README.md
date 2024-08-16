# Lambda

Cele riesenie pouziva dve funkcie - `GenerateForwardURLForImageResize` a `ResizeImage`.

#### Lambda

Prva funkcia je velmi jednoducha a mala, tu staci nakopirovat priamo do AWS Editora, ulozit, deploynut a vytvorit verziu.

Druha funkcia vyuziva aj *dependencies* a je nutne ju nahrat ako `.zip` subor cez AWS S3 bucket (ma nad 10MB dovolenych cez web). Dependencies je nutne instalovat spolu s argumentami `--cpu=x64 --os=linux`:

```
npm install --cpu=x64 --os=linux sharp @aws-sdk/client-s3
```

Vytvorenie `.zip`:

```
cd ResizeImage

zip -r resize-image-1.zip .
```

Niektore vacsie obrazky trvali dlhsie ako 3 sekundy, co je defaultny timeout. Zmena na 6 sekund.

*P.S.: vytvorenie `Layer` nepomoze, pretoze funkcia s layerom sa nemoze pouzit*

#### CDN

**Behavior**

* Viewer request -> Lambda@Edge -> GenerateForwardURLForImageResize
* Origin response -> Lambda@Edge -> ResizeImage

**Origin request policy**

* Treba vytvorit novu *policy* a dovolit cachovat vybrane query parametre
  * Query strings - Include the following query strings
    * `d`

#### Permissions

Naozaj tazko povedat, ktore permissions su nevyhnutne, kedze rozbehat cele riesenie nebolo jednoduche a sprevadzalo ho velmi vela pokusov a omylov.

IAM Role `ResizeImage-role`:

**AWSLambdaBasicExecutionRole**

Kedze tato Lambda funkcia je pouzivana CloudFrontom a bezi v roznych regionoch, tak treba povolit logovanie pre rozne regiony.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:*:<Account ID>:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:*:<Account ID>:log-group:/aws/lambda/ResizeImage:*",
                "arn:aws:logs:*:<Account ID>:log-group:/aws/lambda/us-east-1.ResizeImage:*"
            ]
        }
    ]
}
```

Plus jedna custom policy `aws-s3-lambda`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:PutObjectTagging"
            ],
            "Resource": "arn:aws:s3:::<Bucket name>/*"
        }
    ]
}
```

Upravit *Trust relationships*, kde myslim chybalo `edgelambda.amazonaws.com`:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "lambda.amazonaws.com",
                    "edgelambda.amazonaws.com"
                ]
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

**Bucket Permissions**

CDN-ke treba dovolit `ListBucket` inak v pripade, ze ma nacitat nieco, co este neexistuje v S3 buckete tak namiesto `404 - Not Found` vrati `403 Forbidden`.

```json
...
"Statement": [
  {
    "Sid": "AllowCloudFrontServicePrincipal",
    "Effect": "Allow",
    "Principal": {
      "Service": "cloudfront.amazonaws.com"
    },
    "Action": [
      "s3:GetObject",
      "s3:ListBucket",
      "s3:PutObjectTagging"
    ],
    "Resource": [
      "arn:aws:s3:::<Bucket name>/*",
      "arn:aws:s3:::<Bucket name>"
    ],
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::<Account ID>:distribution/<Distribution ID>"
      }
    }
  }
]
...
```

Zaroven treba povolit Lambda funkcii, aby mohla citat a zapisovat objekty:

```json
...
"Statement": [
  {
    "Sid": "AllowCloudFrontReadFunctionPrincipal",
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::<Account ID>:role/service-role/ResizeImage-role"
    },
    "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectTagging"
      ],
    "Resource": "arn:aws:s3:::<Bucket name>/*"
  }
]
...
```

## Logy

Lambda funkcia ma defaultne zapnute logovanie do CloudWatch, kde sa potom daju najst zakladne informacie (ako dlho trval request) ale aj vystupy z `console.log()`.

## Odkazy

Odkazy, ktore pomohli pri vytvarani tohoto riesenia:

* [Resizing Images with Amazon CloudFront & Lambda@Edge | AWS CDN Blog](https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/)
* [Authorizing requests with Lambda@Edge](https://dev.to/aws-builders/authorizing-requests-with-lambdaedge-mjm)
* [Deploy Node.js Lambda functions with .zip file archives](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html#nodejs-package-create-dependencies)
* [Error: Could not load the "sharp" module using the linux-x64 runtime on AWS Lambda](https://github.com/lovell/sharp/issues/4001)
