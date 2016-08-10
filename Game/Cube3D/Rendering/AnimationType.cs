using Bridge.WebGL;
using Game3D.Helpers;
using System.Collections.Generic;

namespace Game3D.Rendering
{
    public class AnimationType
    {
        public WebGLTexture Texture { get; set; }
        public Vector2 TexSize { get; set; }
        public Dictionary<string, AnimationEntry> Animations { get; set; }

        public AnimationType(WebGLTexture texture, Vector2 texSize)
        {
            this.Texture = texture;
            this.TexSize = texSize;
        }

        public void AddAnimation(string name, Vector2 firstFrame, Vector2 frameSize, int frameCount, float speed = 1.0f)
        {
            Animations.Add(name, new AnimationEntry(firstFrame, frameSize, frameCount, speed));
        }

        public RectangleF GetFrameCoords(string animName)
        {
            return Animations[animName].GetFrameCoords();
        }
    }
}
