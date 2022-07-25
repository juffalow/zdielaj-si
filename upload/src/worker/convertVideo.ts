import MediaRepository from '../repositories/MediaRepository';
import KnexMediaRepository from '../repositories/KnexMediaRepository';
import MediaConvertJobRepository from '../repositories/MediaConvertJobRepository';
import KnexMediaConvertJobRepository from '../repositories/KnexMediaConvertJobRepository';
import aws from '../services/aws';

class ResizeImage {

  private mediaRepository: MediaRepository;

  private mediaConvertJobRepository: MediaConvertJobRepository;

  public constructor(mediaRepository: MediaRepository, mediaConvertJobRepository: KnexMediaConvertJobRepository) {
    this.mediaRepository = mediaRepository;
    this.mediaConvertJobRepository = mediaConvertJobRepository;
  }

  public async convert(mediaId: number): Promise<any> {
    const media = await this.getMedia(mediaId);

    const job = await aws.mc.createJob({
      Queue: "arn:aws:mediaconvert:eu-central-1:309832898636:queues/Default",
      Role: "arn:aws:iam::309832898636:role/aws-mc-zdielaj-si-role",
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
                  }
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
                  }
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
                  "Width": 400,
                  "Height": 400
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
                Destination: `s3://zdielajsi/${media.path.split('.')[0]}`
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
            FileInput: `s3://zdielajsi/${media.path}`
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
