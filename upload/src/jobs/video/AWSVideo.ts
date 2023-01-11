import { MediaConvertClient, CreateJobCommand } from '@aws-sdk/client-mediaconvert';
import logger from '../../logger';

/**
 * 
 * @see https://aws.amazon.com/mediaconvert/
 * @see https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/emc-examples.html
 */
class AWSVideo implements Jobs.Video {
  constructor(
    protected queue: string,
    protected role: string,
    protected bucket: string,
    protected mediaConvert: MediaConvertClient,
    protected mediaConvertJobRepository: MediaConvertJobRepository,
    protected thumbnailRepository: ThumbnailRepository
  ) {}

  public async convert(file: File, height: number, width: number, thumbnailHeight: number, thumbnailWidth: number): Promise<void> {
    logger.debug(`${this.constructor.name}.convert`, { file });

    const params = {
      Queue: this.queue,
      Role: this.role,
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
                Destination: `s3://${this.bucket}/${file.path.split('.')[0]}`
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
            FileInput: `s3://${this.bucket}/${file.path}`
          }
        ]
      },
      "AccelerationSettings": {
        "Mode": "DISABLED"
      },
      "StatusUpdateInterval": "SECONDS_60",
      "Priority": 0
    };

    const data = await this.mediaConvert.send(new CreateJobCommand(params));

    await this.mediaConvertJobRepository.create({
      id: data.Job.Id,
      fileId: String(file.id),
    });
  }

  public async complete(payload: any): Promise<void> {
    logger.debug(`${this.constructor.name}.complete`, { payload });

    const job = await this.mediaConvertJobRepository.get(payload.detail.jobId);

    if (typeof job === 'undefined') {
      logger.warn('Job not found!', { payload });
      return;
    }

    await Promise.all(payload.detail.outputGroupDetails[0].outputDetails[1].outputFilePaths.map(async (fullPath: string) => {
      await this.thumbnailRepository.create({
        fileId: job.fileId,
        mimetype: 'image/jpeg',
        path: fullPath.replace(`s3://${this.bucket}/`, ''),
        size: 0,
        metadata: {
          height: payload.detail.outputGroupDetails[0].outputDetails[1].videoDetails.heightInPx,
          width: payload.detail.outputGroupDetails[0].outputDetails[1].videoDetails.widthInPx,
        },
      });
    }));

    await Promise.all(payload.detail.outputGroupDetails[0].outputDetails[2].outputFilePaths.map(async (fullPath: string) => {
      await this.thumbnailRepository.create({
        fileId: job.fileId,
        mimetype: 'image/jpeg',
        path: fullPath.replace(`s3://${this.bucket}/`, ''),
        size: 0,
        metadata: {
          height: payload.detail.outputGroupDetails[0].outputDetails[2].videoDetails.heightInPx,
          width: payload.detail.outputGroupDetails[0].outputDetails[2].videoDetails.widthInPx,
        },
      });
    }));
  }
}

export default AWSVideo;
