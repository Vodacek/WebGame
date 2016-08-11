using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game3D.Game
{
    /// <summary>
    /// Actors like NPCs and monsters
    /// </summary>
    public class ActorGameObject : GameObject
    {
        /// <summary>
        /// Determines, whether this actor is friendly to player
        /// </summary>
        public bool Friendly { get; set; }
    }
}
