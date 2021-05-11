using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public string Adress { get; set; }
        public virtual ICollection<OrderItem> Items { get; set; }
        public int DeliveryId { get; set; }
        public virtual Delivery Delivery { get; set; }
        public string CustomerId { get; set; }
        public virtual ApplicationUser Customer { get; set; }

    }
}
