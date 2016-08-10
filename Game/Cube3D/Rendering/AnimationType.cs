using Bridge.WebGL;
using Game3D.Helpers;
using System.Collections.Generic;

namespace Game3D.Rendering
{
    public class AnimationType
    {
        /// <summary>
        /// Gets or sets the Texture
        /// </summary>
        public WebGLTexture Texture { get; set; }

        /// <summary>
        /// gets or 
        /// </summary>
        public Dictionary<string, AnimationEntry> Animations { get; private set; } = new Dictionary<string, AnimationEntry>();

        public AnimationType(WebGLTexture texture)
        {
            this.Texture = texture;
        }

        /// <summary>
        /// Adds animation entry
        /// </summary>
        /// <param name="name">Entry name</param>
        /// <param name="firstFrame">Where first frame start (topleft corner)</param>
        /// <param name="frameSize">Frame size</param>
        /// <param name="frameCount">Frame count in animation entry</param>
        public void AddAnimation(string name, Vector2 firstFrame, Vector2 frameSize, int frameCount)
        {
            Animations.Add(name, new AnimationEntry(firstFrame, frameSize, frameCount));
        }

        /// <summary>
        /// Gets the animation frame by name and index
        /// </summary>
        /// <param name="animName">Animation frame</param>
        /// <param name="index">Frame index</param>
        /// <returns>Returns AnimationFrame</returns>
        public AnimationFrame GetFrame(string animName, int index)
        {
            return new AnimationFrame(Animations[animName].GetFrameRect(index), Texture);
        }
    }
}
