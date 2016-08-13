using System;
using Game3D.Helpers;

namespace Game3D.Rendering
{
    public class Sprite : IDrawable
    {
        public Animation animation;

        public Animation Animation
        {
            get
            {
                return animation;
            }
            set
            {
                animation = value;
            }
        }

        public Camera Camera
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public void Draw(string context, Vector3 position, Camera cam)
        {
            throw new NotImplementedException();
        }
    }
}
