using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game3D.Game
{
    public class Player
    {
        public string Name { get; private set; }
        public Inventory Inventory { get; }

        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Inteligence { get; set; }
        public int Vitality { get; set; }

        public float HitPoints { get; set; }
        public float MaxHitPoints { get; set; }

        public float Mana { get; set; }
        public float MaxMana { get; set; }

        public int Level { get; set; }
        public int Experience { get; set; }

        public int Armor { get; set; }
        public float Resistance { get; set; }

        public Player(string playerName)
        {
            this.Name = playerName;
            this.Level = 0;
            this.Experience = 0;
            this.Armor = 0;
            this.Resistance = 0;
            this.Dexterity = 10;
            this.Strength = 10;
            this.Inteligence = 10;
            this.Vitality = 10;
            this.MaxHitPoints = 10;
            this.HitPoints = this.MaxHitPoints;
            this.MaxMana = 10;
            this.Mana = this.MaxMana;
            this.Inventory = new Inventory();
        }

        /// <summary>
        /// This is called when player is attacked by anything
        /// </summary>
        /// <param name="normalDamage">Normal damage type value</param>
        /// <param name="magicDamage">Magic damage type value</param>
        public void OnAttacked(float normalDamage, float magicDamage)
        {
            this.HitPoints -= normalDamage - Armor;
            this.HitPoints -= magicDamage * (1 - Resistance);
        }

        /// <summary>
        /// This is called when player kills anything
        /// </summary>
        public void OnKillActor(ActorGameObject actor)
        {
            this.Experience += actor.Experience;
            this.Inventory.PickupWholeInventory(actor.Inventory);
        }
    }
}
