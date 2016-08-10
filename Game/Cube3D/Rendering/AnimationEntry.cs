using Game3D.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game3D.Rendering
{
    public class AnimationEntry
    {
        public AnimationEntry(Vector2 firstFrame, Vector2 frameSize, int animationCount, float AnimationSpeed=1.0f)
        {
            this.FirstFrame = firstFrame;
            this.FrameSize = frameSize;
            this.AnimationCount = animationCount;
            this.AnimationSpeed = AnimationSpeed;
        }

        public int AnimationCount { get; set; }

        public Vector2 FirstFrame { get; set; }

        public Vector2 FrameSize { get; set; }

        public float AnimationSpeed { get; set; }
    }
}
