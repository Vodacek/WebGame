using Bridge.WebGL;
using Game3D.Helpers;
using System.Collections.Generic;

namespace Game3D.Rendering
{
    public class AnimationType
    {
        public WebGLTexture Texture { get; set; }
        public float Speed { get; set; }
        public Vector2 TexSize { get; set; }
        public Dictionary<string, anim >

        public Animation(WebGLTexture texture, Vector2 texSize)
        {
            this.Texture = texture;
            this.TexSize = texSize;
        }

        public void AddAnimation(string name, int count, )
        {

        }

        public RectangleF GetTextureCoords()
        {
            return 
        }

        public void ChangeAnimation(string name)
        {

        }
    }
}
