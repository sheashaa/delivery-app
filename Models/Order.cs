using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Models
{
    public enum OrderStatus
    {
        Queued,
        Preparing,
        Prepared,
        Delivering,
        Delivered,
        Cancelled
    }

    public class Order
    {
        public int Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? DateTime { get; set; }
        public string City { get; set; }
        public string StreetName { get; set; }
        public string Building { get; set; }
        public int? Floor { get; set; }
        public int? Apartment { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public virtual ICollection<OrderItem> Items { get; set; }
        public string CustomerId { get; set; }
        public virtual ApplicationUser Customer { get; set; }
        public OrderStatus Status { get; set; }
    }
}
