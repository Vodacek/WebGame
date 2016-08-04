using System.Collections.Generic;

namespace Cube3D.Helpers
{

    /// <summary>
    /// Basic Dijkstra pathfinding algorithm
    /// </summary>
    public class PathFinder
    {
        private Point size;
        private int totalSize;
        private int[] walkable;
        private int[] gotThereFrom;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="size">Map size</param>
        public PathFinder(Point size)
        {
            this.size = size;
            this.totalSize = size.X * size.Y;
            walkable = new int[totalSize];
            gotThereFrom = new int[totalSize];

            // we can walk anywhere
            for (int i = 0; i < totalSize; i++)
                walkable[i] = 0;

            // block borders
            for (int i = 0; i < size.X; i++)
            {
                BlockField(new Point(i, 0));
                BlockField(new Point(i, size.Y - 1));
            }

            for (int i = 0; i < size.Y; i++)
            {
                BlockField(new Point(0, i));
                BlockField(new Point(size.X - 1, i));
            }
        }

        /// <summary>
        /// Finds nearest free field arround given point
        /// </summary>
        /// <param name="p">Point where to start search</param>
        /// <returns>Point, which is on free place and is nearest to given point</returns>
        public Point FindNearestAvailableField(Point p)
        {
            gotThereFrom = new int[totalSize];
            int index = p.X + p.Y * size.X;
            int origIndex = index;
            Queue<int> openSet = new Queue<int>();
            openSet.Enqueue(index);

            while (openSet.Count > 0)
            {
                origIndex = openSet.Dequeue();
                index = origIndex;

                if (walkable[index] == 0)
                {
                    return new Point(origIndex % size.X, origIndex / size.X);
                }

                // left
                index = origIndex - 1;
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }

                // right
                index = origIndex + 1;
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }

                // bottom
                index = origIndex + size.X;
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }

                // top
                index = origIndex - size.X;
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }
            }

            return null;
        }

        /// <summary>
        /// Frees given field
        /// </summary>
        public void FreeField(Point p)
        {
            walkable[p.X + p.Y * size.X] = 0;
        }

        /// <summary>
        /// Blocks given field
        /// </summary>
        /// <param name="p"></param>
        public void BlockField(Point p)
        {
            walkable[p.X + p.Y * size.X] = 255;
        }

        /// <summary>
        /// Adds obstacle with specified 
        /// </summary>
        /// <param name="p"></param>
        /// <param name="amount"></param>
        public void AddUnitObstacle(Point p, byte amount)
        {
            walkable[p.X + p.Y * size.X] += amount;
        }

        public void RemoveUnitObstacle(Point p, byte amount)
        {
            walkable[p.X + p.Y * size.X] -= amount;
        }

        /// <summary>
        /// Returns state of field at given position
        /// </summary>
        /// <param name="p"></param>
        /// <returns>Returns true if field is walkable</returns>
        public bool GetField(Point p)
        {
            return walkable[p.X + p.Y * size.X] < 255;
        }

        /// <summary>
        /// Finds path from one place to another
        /// </summary>
        /// <param name="fromV">Where to start</param>
        /// <param name="toV">Where to end</param>
        /// <returns>Full path or null if path not found</returns>
        public List<Vector2> FindPath(Vector2 fromV, Vector2 toV)
        {
            gotThereFrom = new int[totalSize];

            Point to = new Point((int)toV.X, (int)toV.Y);
            Point from = new Point((int)fromV.X, (int)fromV.Y);
            int toIndex = to.X + to.Y * size.X;
            int fromIndex = from.X + from.Y * size.X;

            // cant go to map border (optimalization)
            if (to.X < 1 || to.Y < 1 || to.X > size.X - 1 || to.Y > size.Y - 1)
                return null;

            int index = to.X + to.Y * size.X;
            // openset - right now tested fields
            Queue<int> openSet = new Queue<int>();

            // add ending point - we look from the end
            openSet.Enqueue(index);
            gotThereFrom[index] = index;

            // search path
            while (openSet.Count > 0)
            {
                int origIndex = openSet.Dequeue();
                index = origIndex;

                if (index == fromIndex)
                {
                    // build the path
                    List<Vector2> path = new List<Vector2>();
                    int pointer = index;
                    pointer = gotThereFrom[pointer];

                    while (pointer != toIndex)
                    {
                        path.Add(new Vector2(pointer % size.X + 0.5f, pointer / size.X + 0.5f));
                        //path.Add(new Float2(pointer % size.X, pointer / size.X));
                        pointer = gotThereFrom[pointer];
                    }

                    if (path.Count == 1 && (walkable[(int)toV.X + (int)toV.Y * size.X] >= 255))
                    {
                        return null;
                    }

                    if (walkable[(int)toV.X + (int)toV.Y * size.X] < 255)
                        path.Add(toV);

                    if (path.Count == 0)
                        return null;
                    else
                        return path;
                }

                // left
                index = origIndex - 1;// index--;
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }

                // right
                index = origIndex + 1;// index += 2;
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }

                // bottom
                index = origIndex + size.X;// //index = index - 1 + size.X;
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }

                // top
                index = origIndex - size.X;// index = index - 1 - (size.X << 1);
                if (gotThereFrom[index] == 0) // not yet tested
                {
                    if (walkable[index] < 255)
                    {
                        gotThereFrom[index] = origIndex;
                        openSet.Enqueue(index);
                    }
                }

            }

            return null; // path not found
        }
    }
}
