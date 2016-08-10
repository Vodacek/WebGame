using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game3D.Game
{
    /// <summary>
    /// Game object that can be in inventory
    /// </summary>
    public class ItemGameObject : GameObject
    {
        /// <summary>
        /// Item's price
        /// </summary>
        public int Price { get; set; }
    }
}
