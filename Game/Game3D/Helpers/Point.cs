namespace Game3D.Helpers
{
    /// <summary>
    /// Simple integer point class
    /// </summary>
    public class Point
    {
        /// <summary>
        /// X position
        /// </summary>
        public int X { get; set; }

        /// <summary>
        /// Y position
        /// </summary>
        public int Y { get; set; }

        /// <summary>
        /// Default constructor
        /// </summary>
        public Point()
        {
            X = 0;
            Y = 0;
        }

        /// <summary>
        /// Constructor with values
        /// </summary>
        /// <param name="x">X position</param>
        /// <param name="y">Y position</param>
        public Point(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }
    }
}
