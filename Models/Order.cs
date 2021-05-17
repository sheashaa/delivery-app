using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? DateTime { get; set; }
        public int? AddressId { get; set; }
        public virtual Address Address { get; set; }
        public virtual ICollection<OrderItem> Items { get; set; }
        public int? DeliveryId { get; set; }
        public virtual Delivery Delivery { get; set; }
        public string CustomerId { get; set; }
        public virtual ApplicationUser Customer { get; set; }

    }
}
