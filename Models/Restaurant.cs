using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeliveryApp.Models
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Website { get; set; }
        public virtual ICollection<Branch> Branches { get; set; }
        public string ManagerId { get; set; }
        public virtual ApplicationUser Manager { get; set; }
    }
}
