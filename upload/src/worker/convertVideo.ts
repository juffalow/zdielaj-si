import MediaRepository from '../repositories/MediaRepository';
import KnexMediaRepository from '../repositories/KnexMediaRepository';
import MediaConvertJobRepository from '../repositories/MediaConvertJobRepository';
import KnexMediaConvertJobRepository from '../repositories/KnexMediaConvertJobRepository';
import aws from '../services/aws';
import config from '../config';

class ResizeImage {

  private mediaRepository: MediaRepository;

  private mediaConvertJobRepository: MediaConvertJobRepository;

  public constructor(mediaRepository: MediaRepository, mediaConvertJobRepository: KnexMediaConvertJobRepository) {
    this.mediaRepository = mediaRepository;
    this.mediaConvertJobRepository = mediaConvertJobRepository;
  }

  public async convert(mediaId: number, height: number, width: number, thumbnailHeight: number, thumbnailWidth: number): Promise<any> {
    const media = await this.getMedia(mediaId);

    const job = await aws.mc.createJob({
      Queue: config.services.aws.mc.queue,
      Role: config.services.aws.mc.role,
      Settings: {
        "TimecodeConfig": {
          "Source": "ZEROBASED"
        },
        "OutputGroups": [
          {
            "Name": "File Group",
            "Outputs": [
              {
                "ContainerSettings": {
                  "Container": "MP4",
                  "Mp4Settings": {}
                },
                "VideoDescription": {
                  "CodecSettings": {
                    "Codec": "H_264",
                    "H264Settings": {
                      "MaxBitrate": 5000000,
                      "RateControlMode": "QVBR",
                      "SceneChangeDetect": "TRANSITION_DETECTION"
                    }
                  },
                  "Width": width,
                  "Height": height
                },
                "AudioDescriptions": [
                  {
                    "CodecSettings": {
                      "Codec": "AAC",
                      "AacSettings": {
                        "Bitrate": 96000,
                        "CodingMode": "CODING_MODE_2_0",
                        "SampleRate": 48000
                      }
                    }
                  }
                ]
              },
              {
                "VideoDescription": {
                  "CodecSettings": {
                    "Codec": "FRAME_CAPTURE",
                    "FrameCaptureSettings": {
                      "FramerateNumerator": 30,
                      "FramerateDenominator": 300,
                      "MaxCaptures": 10,
                      "Quality": 100
                    }
                  },
                  "Width": width,
                  "Height": height
                },
                "ContainerSettings": {
                  "Container": "RAW"
                },
              },
              {
                "VideoDescription": {
                  "CodecSettings": {
                    "Codec": "FRAME_CAPTURE",
                    "FrameCaptureSettings": {
                      "FramerateNumerator": 30,
                      "FramerateDenominator": 300,
                      "MaxCaptures": 10,
                      "Quality": 100
                    }
                  },
                  "Width": thumbnailWidth,
                  "Height": thumbnailHeight
                },
                "ContainerSettings": {
                  "Container": "RAW"
                },
                "NameModifier": "_thumbnail"
              }
            ],
            "OutputGroupSettings": {
              "Type": "FILE_GROUP_SETTINGS",
              "FileGroupSettings": {
                Destination: `s3://${config.services.aws.s3.bucket}/${media.path.split('.')[0]}`
              }
            }
          }
        ],
        "Inputs": [
          {
            "AudioSelectors": {
              "Audio Selector 1": {
                "DefaultSelection": "DEFAULT"
              }
            },
            "VideoSelector": {},
            "TimecodeSource": "ZEROBASED",
            FileInput: `s3://${config.services.aws.s3.bucket}/${media.path}`
          }
        ]
      },
      "AccelerationSettings": {
        "Mode": "DISABLED"
      },
      "StatusUpdateInterval": "SECONDS_60",
      "Priority": 0
    }).promise();

    await this.mediaConvertJobRepository.create({
      id: job.Job.Id,
      mediaId: String(mediaId),
    });
  }

  private async getMedia(id: number): Promise<Media> {
    const media = await this.mediaRepository.get(String(id));
  
    return media;
  }
}

export default new ResizeImage(new KnexMediaRepository(), new KnexMediaConvertJobRepository());
