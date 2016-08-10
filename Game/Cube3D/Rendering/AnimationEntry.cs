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
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="firstFrame">Where the first frame starts (topleft corner)</param>
        /// <param name="frameSize">How big the frame is</param>
        /// <param name="frameCount">Animation entry frame count</param>
        public AnimationEntry(Vector2 firstFrame, Vector2 frameSize, int frameCount)
        {
            this.FirstFrame = firstFrame;
            this.FrameSize = frameSize;
            this.FrameCount = frameCount;
        }

        /// <summary>
        /// Animation entry frame count
        /// </summary>
        public int FrameCount { get; set; }

        /// <summary>
        /// Where the first frame starts (topleft corner)
        /// </summary>
        public Vector2 FirstFrame { get; set; }

        /// <summary>
        /// How big the frame is
        /// </summary>
        public Vector2 FrameSize { get; set; }

        /// <summary>
        /// Gets the frame rectanhle
        /// </summary>
        /// <param name="index">Animation frame index</param>
        /// <returns>Returns the UV coords in texture</returns>
        public RectangleF GetFrameRect(int index)
        {
            Vector2 topLeft = new Vector2(FirstFrame.X + FrameSize.X * FrameCount, FirstFrame.Y);
            Vector2 bottomRight = new Vector2(topLeft.X + FrameSize.X, topLeft.Y + FrameSize.Y);
            return new RectangleF(topLeft, bottomRight);
        }
    }
}
