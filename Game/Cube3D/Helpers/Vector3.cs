namespace Game3D.Helpers
{
    /// <summary>
    /// Basic 2D vector
    /// </summary>
    public struct Vector3
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
        /// Z value
        /// </summary>
        public float Z;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="x">X value</param>
        /// <param name="y">Y value</param>
        /// <param name="z">Z value</param>
        public Vector3(float x, float y, float z)
        {
            this.X = x;
            this.Y = y;
            this.Z = z;
        }

        /// <summary>
        /// Vector Length
        /// </summary>
        public float Length
        {
            get { return (float)System.Math.Sqrt(X * X + Y * Y + Z * Z); }
        }

        /// <summary>
        /// Returns normalized vector
        /// </summary>
        /// <returns>Normalized vector</returns>
        public Vector3 Normalize()
        {
            Vector3 tmp = new Vector3(X, Y, Z);
            float len = tmp.Length;
            if (len != 0)
            {
                tmp.X = tmp.X / Length;
                tmp.Y = tmp.Y / Length;
                tmp.Z = tmp.Z / Length;
            }
            return tmp;
        }

        /// <summary>
        /// ToString method
        /// </summary>
        /// <returns>Vector in string format</returns>
        public override string ToString()
        {
            return System.String.Format("Float2: {0}, {1}, {2}", X, Y, Z);
        }

        /// <summary>
        /// operator +
        /// </summary>
        public static Vector3 operator +(Vector3 a, Vector3 b)
        {
            return new Vector3(a.X + b.X, a.Y + b.Y, a.Z+b.Z);
        }

        /// <summary>
        /// operator -
        /// </summary>
        public static Vector3 operator -(Vector3 a, Vector3 b)
        {
            return new Vector3(a.X - b.X, a.Y - b.Y, a.Z-b.Z);
        }

        public static bool operator ==(Vector3 a, Vector3 b)
        {
            return a.X == b.X && a.Y == b.Y && a.Z == b.Z;
        }

        public static bool operator !=(Vector3 a, Vector3 b)
        {
            return !(a == b);
        }

        /// <summary>
        /// Counts distance between two vectors
        /// </summary>
        /// <param name="a"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        public static float DistanceFrom(Vector3 a, Vector3 b)
        {
            return (float)System.Math.Sqrt((a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y) + (a.Z - b.Z) * (a.Z - b.Z));
        }

        /// <summary>
        /// Zero vector
        /// </summary>
        public static Vector3 ZERO
        {
            get
            {
                return new Vector3(0, 0, 0);
            }
        }
    }
}
