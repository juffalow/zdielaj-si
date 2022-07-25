# Upload

Asynchronous upload service to store media - images and videos. It returns `id` of new media immediately and resizing and generating video previews are done in an async way.

## Requirements

* AWS S3
* AWS MediaConvert
* AWS EventBridge
* AWS Queue

## Process overview

```mermaid
graph TD
    A[User] -->|upload media| B(Upload)
    B --> |store file| C{mimetype}
    C -->|image/*| D[getImageDimensions]
    C -->|video/*| E[getVideoDimensions]
    D --> Z["DB (media)"]
    E --> Z
    Z --> F[Queue]
    F --> G{Worker}
    G --> H[image/*]
    G --> I[conversion job end]
    G --> J[video/*]
    H --> K[resizeImage]
    J --> L[convertVideo]
    L --> G
    I --> M[mediaConvertJob]
    K --> |image url| N["DB (thumbnail)"]
    M --> |image url| N
```

## License

[MIT license](../LICENSE)
