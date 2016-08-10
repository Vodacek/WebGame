using Bridge.WebGL;
using Game3D.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game3D.Rendering
{

    public class AnimationFrame
    {
        /// <summary>
        /// UV in texture
        /// </summary>
        public RectangleF Rectangle { get; set; }

        /// <summary>
        /// Texture
        /// </summary>
        public WebGLTexture Texture { get; set; }

        /// <summary>
        /// Animation frame
        /// </summary>
        /// <param name="rect">Frame UV rectangle</param>
        /// <param name="texture">Frame texture</param>
        public AnimationFrame(RectangleF rect, WebGLTexture texture)
        {
            this.Rectangle = rect;
            this.Texture = texture;
        }
    }
}
