namespace Game3D.Helpers
{
    /// <summary>
    /// Basic 2D vector
    /// </summary>
    public struct Vector2
    {
        /// <summary>
        /// X value
        /// </summary>
        public float X;

        /// <summary>
        /// Y value
        /// </summary>
        public float Y;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="x">X value</param>
        /// <param name="y">Y value</param>
        public Vector2(float x, float y)
        {
            this.X = x;
            this.Y = y;
        }

        /// <summary>
        /// Vector Length
        /// </summary>
        public float Length
        {
            get { return (float)System.Math.Sqrt(X * X + Y * Y); }
        }

        /// <summary>
        /// Returns normalized vector
        /// </summary>
        /// <returns>Normalized vector</returns>
        public Vector2 Normalize()
        {
            Vector2 tmp = new Vector2(X, Y);
            float len = tmp.Length;
            if (len != 0)
            {
                tmp.X = tmp.X / Length;
                tmp.Y = tmp.Y / Length;
            }
            return tmp;
        }

        /// <summary>
        /// ToString method
        /// </summary>
        /// <returns>Vector in string format</returns>
        public override string ToString()
        {
            return System.String.Format("Float2: {0}, {1}", X, Y);
        }

        /// <summary>
        /// operator +
        /// </summary>
        public static Vector2 operator +(Vector2 a, Vector2 b)
        {
            return new Vector2(a.X + b.X, a.Y + b.Y);
        }

        /// <summary>
        /// operator -
        /// </summary>
        public static Vector2 operator -(Vector2 a, Vector2 b)
        {
            return new Vector2(a.X - b.X, a.Y - b.Y);
        }

        public static bool operator ==(Vector2 a, Vector2 b)
        {
            return a.X == b.X && a.Y == b.Y;
        }

        public static bool operator !=(Vector2 a, Vector2 b)
        {
            return ! (a == b);
        }

        /// <summary>
        /// Counts distance between two vectors
        /// </summary>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        public static float DistanceFrom(Vector2 a, Vector2 b)
        {
            return (float)System.Math.Sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y));
        }

        /// <summary>
        /// Zero vector
        /// </summary>
        public static Vector2 ZERO
        {
            get
            {
                return new Vector2(0, 0);
            }
        }
    }
}
