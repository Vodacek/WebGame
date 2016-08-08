using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;

namespace Game3D.Game
{
    /// <summary>
    /// Inventory class
    /// </summary>
    public class Inventory
    {
        /// <summary>
        /// List of all items in inventory
        /// </summary>
        public List<GameObject> Items { get; } = new List<GameObject>();

        /// <summary>
        /// Gold amount
        /// </summary>
        public int Gold { get; private set; } = 0;

        /// <summary>
        /// Default constructor
        /// </summary>
        public Inventory()
        {

        }

        /// <summary>
        /// Clears whole inventory.
        /// </summary>
        public void Clear()
        {
            Items.Clear();
            Gold = 0;
        }

        /// <summary>
        /// Picks up gold.
        /// </summary>
        /// <param name="amount">Amount of gold picked up</param>
        public void PickupGold(int amount)
        {
            Gold += amount;
        }

        /// <summary>
        /// Picks up all gold from given inventory.
        /// </summary>
        /// <param name="inventory">Inventory to pickup gold from</param>
        public void PickupGoldFromInventory(Inventory inventory)
        {
            PickupGold(inventory.Gold);
            inventory.DropGold(inventory.Gold);
        }

        /// <summary>
        /// Drops given amount of gold from inventory, and checks, if there is enough gold.
        /// </summary>
        /// <param name="amount">Amount of gold to drop</param>
        /// <returns>Returns true if there is enough gold in inventory</returns>
        public bool DropGold(int amount)
        {
            if (amount>=this.Gold)
            {
                Gold -= amount;
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Drops item from inventory.
        /// </summary>
        /// <param name="obj">Item to drop</param>
        public void DropItem(GameObject obj)
        {
            this.Items.Remove(obj);
        }

        /// <summary>
        /// Picks up content of given inventory.
        /// </summary>
        /// <param name="inventory">Inventory to take from</param>
        public void PickupWholeInventory(Inventory inventory)
        {
            foreach (var i in inventory.Items)
            {
                this.Items.Add(i);
            }

            this.Gold += inventory.Gold;
            inventory.Clear();
        }
    }
}
