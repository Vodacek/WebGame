using Game3D.Helpers;

namespace Game3D.Rendering
{
    public interface IDrawable
    {
        void Draw(string context, Vector3 position, Camera cam);
    }
}
