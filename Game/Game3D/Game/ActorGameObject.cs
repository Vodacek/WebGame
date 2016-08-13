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
        public Inventory Inventory { get; } = new Inventory();

        public float HitPoints { get; set; }
        public float MaxHitPoints { get; set; }

        public float Mana { get; set; }
        public float MaxMana { get; set; }

        /// <summary>
        /// Reward per kill
        /// </summary>
        public int Experience { get; set; }

        public int Armor { get; set; }
        public float Resistance { get; set; }

        /// <summary>
        /// Determines, whether this actor is friendly to player
        /// </summary>
        public bool Friendly { get; set; }

        public ActorGameObject(bool friendly, string name, int hp)
        {
            this.Name = name;
            this.Friendly = friendly;
            this.HitPoints = hp;
        }
    }
}
