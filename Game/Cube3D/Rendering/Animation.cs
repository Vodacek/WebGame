using Bridge.WebGL;
using Game3D.Helpers;
using System.Collections.Generic;

namespace Game3D.Rendering
{
    public class Animation
    {
        public AnimationType AnimType { get; set; }
        private float elapsedTime;

        public WebGLTexture Texture
        {
            get
            {
                return AnimType.Texture;
            }
        }

        public List<string> AvailableAnimations
        {
            get
            {
                return AnimType.AvailableAnimations;
            }
        }

        public float Speed { get; set; }

        public Animation(AnimationType type)
        {
            this.AnimType = type;
        }

        public void Update(float delta)
        {
            elapsedTime += delta;
        }

        public RectangleF GetTextureCoords()
        {
            return AnimType.GetTextureCoords();
        }

        public void ChangeAnimation(string name)
        {
            elapsedTime = 0;
        }
    }
}
