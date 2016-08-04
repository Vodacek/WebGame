using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cube3D.Game
{
    public class Player
    {
        public string Name { get; private set; }
        public Inventory Inventory { get; }

        public Player(string playerName)
        {
            this.Name = playerName;
        }
    }
}
