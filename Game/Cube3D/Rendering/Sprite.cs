using System;
using Game3D.Helpers;

namespace Game3D.Rendering
{
    public class Sprite : IDrawable
    {
        private Camera camera;
        public Camera Camera
        {
            get
            {
                return camera;
            }

            set
            {
                camera = value;
            }
        }

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

        public void Draw(string context, Vector3 position)
        {
            throw new NotImplementedException();
        }
    }
}
