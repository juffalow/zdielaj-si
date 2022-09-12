# Upload

Asynchronous upload service to store media - images and videos. It returns `id` of new media immediately and resizing and generating video previews are done in an async way.

## Requirements

There are three main options what can be used as a storage:
* AWS S3
* DigitalOcean Spaces
* Disk

After a file is uploaded, there is a post-processing generating *thumbnails* or converting video to *mp4*. This process is async and it requires a queue and optionally other services as well. Find more information in [docs](./docs) and read how to setup ([AWS](./docs/AWS.md) or [DigitalOcean](./docs/DO.md)).

## Process overview

### Main

```mermaid
flowchart TD
    U((User)) --> UC
    UC["UploadController"] -->|store file| S[Storage]
    subgraph S["Storage"]
        Disk[(Disk)]
        S3[(AWS S3)]
        Spaces[(DigitalOcean Spaces)]
    end
    subgraph DB["Database"]
        MySQL[(MySQL)]
        PostgreSQL[(PostgreSQL)]
    end
    S -->|save reference and metadata| DB
    subgraph Q["Queue"]
        SQS{{AWS SQS}}
    end
    DB -->|"inform worker(s)"| Q
    Q --> R((Response))
```

### Post-processing

```mermaid
flowchart TD
    Q((Queue)) --> W
    subgraph W["Worker"]
        N1["
            Processing video or image can take more time
            and user doesn't need to wait for it, therefore
            such processes are done in an async way.
        "]
        style N1 fill:#fff,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
        N1 -.- I
        N1 -.- V
        subgraph I["Image"]
            N2["
                Create thumbnail from original image.
            "]
            Sharp{{Sharp}}
            style N2 fill:#fff,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
        end
        subgraph V["Video"]
            N3["
                Convert video to mp4 file and generate
                preview image(s) and thumbnail(s).
            "]
            MC{{AWS MediaConvert}}
            FF{{FFmpeg}}
            style N3 fill:#fff,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5
        end
    end
    subgraph S["Storage"]
        Disk[(Disk)]
        S3[(AWS S3)]
        Spaces[(DigitalOcean Spacces)]
    end
    W -->|"store output(s)"| S
    subgraph DB["Database"]
        MySQL[(MySQL)]
        PostgreSQL[(PostgreSQL)]
    end
    S --> DB
```

## License

[MIT license](../LICENSE)
