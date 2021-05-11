using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Models
{
    public class Delivery
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ApplicationUser Courier { get; set; }
    }
}
