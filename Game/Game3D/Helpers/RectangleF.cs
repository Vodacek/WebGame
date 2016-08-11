using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game3D.Helpers
{
    public struct RectangleF
    {
        public RectangleF(Vector2 topLeft, Vector2 bottomRight)
        {
            this.TopLeft = topLeft;
            this.BottomRight = bottomRight;
        }

        public RectangleF(float top, float left, float bottom, float right)
        {
            this.TopLeft = new Vector2(left, top);
            this.BottomRight = new Vector2(right, bottom);
        }

        Vector2 TopLeft { get; set; }
        Vector2 BottomRight { get; set; }
    }
}
