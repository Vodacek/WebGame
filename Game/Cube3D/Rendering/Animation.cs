using Bridge.WebGL;
using Game3D.Helpers;
using System.Collections.Generic;

namespace Game3D.Rendering
{
    public class Animation
    {
        /// <summary>
        /// Gets or sets the animation type
        /// </summary>
        public AnimationType AnimType { get; set; }

        /// <summary>
        /// Determines, whether the animation should be looped
        /// </summary>
        public bool Loop { get; set; }

        /// <summary>
        /// Determines, how many seconds the frame lasts
        /// </summary>
        public float FrameLength { get; set; }

        /// <summary>
        /// Gets name of currently selected animation
        /// </summary>
        public string SelectedAnimation { get; private set; }

        private float elapsedTime;

        /// <summary>
        /// Gets the list of available animations
        /// </summary>
        public IEnumerable<string> AvailableAnimations
        {
            get
            {
                return AnimType.Animations.Keys;
            }
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="type">Animation type this animation can use</param>
        /// <param name="frameLength">Frame length in seconds</param>
        public Animation(AnimationType type, float frameLength = 0.1f)
        {
            this.AnimType = type;
            this.elapsedTime = 0;
            this.FrameLength = FrameLength;
        }

        /// <summary>
        /// Updates the animation
        /// </summary>
        /// <param name="delta">Time since last update in seconds</param>
        public void Update(float delta)
        {
            elapsedTime += delta;

            float totalAnimTime = FrameLength * AnimType.Animations[SelectedAnimation].FrameCount;

            if (!Loop && elapsedTime > totalAnimTime)
            {
                elapsedTime -= totalAnimTime;
            }
        }

        /// <summary>
        /// Gets the current frame
        /// </summary>
        /// <returns>Returns animation frame containing texture and UV coords</returns>
        public AnimationFrame GetAnimationFrame()
        {
            int index = (int)(elapsedTime/FrameLength);
            return AnimType.GetFrame(SelectedAnimation, index);
        }

        /// <summary>
        /// Changes the current active animation
        /// </summary>
        /// <param name="animation"></param>
        public void ChangeAnimation(string animation)
        {
            SelectedAnimation = animation;
            elapsedTime = 0;
        }
    }
}
