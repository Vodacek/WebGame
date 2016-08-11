using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game3D.Game
{
    public class Game
    {
        public List<GameObject> GameObjects { get; set; } = new List<GameObject>();
        Player Player { get; set; } = null;

        public Game(string playerName)
        {
            Player = new Player(playerName);
        }
    }
}
