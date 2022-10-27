import image from './image';
import video from './video';

const container = {
  get Image(): Jobs.Image {
    return image.SharpImage;
  },

  get Video(): Jobs.Video {
    return video.AWSVideo;
  }
};

export default container;
